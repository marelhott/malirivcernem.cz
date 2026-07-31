import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "node:crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (Array.isArray(forwardedFor)) return forwardedFor[0] ?? "unknown";
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.socket.remoteAddress || "unknown";
}

export function isAllowedOrigin(req: NextApiRequest) {
  const origin = req.headers.origin;
  const host = req.headers.host;

  if (!origin || !host) return true;

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

export function isHoneypotTriggered(value: unknown) {
  return typeof value === "string" && value.trim() !== "";
}

export function getIdempotencyKey(req: NextApiRequest, prefix: string) {
  const value = req.headers["x-idempotency-key"];
  const candidate = Array.isArray(value) ? value[0] : value;
  const safeCandidate =
    typeof candidate === "string" && /^[a-zA-Z0-9_-]{16,128}$/.test(candidate)
      ? candidate
      : randomUUID();
  return `${prefix}-${safeCandidate}`;
}

export function applyRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  options?: { maxRequests?: number; windowMs?: number; keyPrefix?: string },
) {
  const maxRequests = options?.maxRequests ?? 5;
  const windowMs = options?.windowMs ?? 10 * 60 * 1000;
  const keyPrefix = options?.keyPrefix ?? "api";
  const now = Date.now();
  const ip = getClientIp(req);
  const key = `${keyPrefix}:${ip}`;

  for (const [entryKey, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) rateLimitStore.delete(entryKey);
  }

  const existing = rateLimitStore.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    res.setHeader("Retry-After", String(retryAfterSeconds));
    return { ok: false, retryAfterSeconds };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { ok: true };
}
