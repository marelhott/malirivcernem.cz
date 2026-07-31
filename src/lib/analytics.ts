type EventProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackConversion(event: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...properties };
  window.dispatchEvent(new CustomEvent("mvc:conversion", { detail: payload }));
  window.dataLayer?.push(payload);
}
