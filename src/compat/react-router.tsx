"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  replace?: boolean;
};

export function Link({ to, replace, children, ...rest }: LinkProps) {
  return (
    <NextLink href={to} replace={replace} {...rest}>
      {children}
    </NextLink>
  );
}

export function Navigate({ to, replace = false }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!to) return;
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);
  return null;
}

export function useParams<T extends Record<string, string | undefined>>() {
  const router = useRouter();
  const out: Record<string, string | undefined> = {};
  Object.entries(router.query).forEach(([key, value]) => {
    out[key] = Array.isArray(value) ? value[0] : value;
  });
  return out as T;
}

export function useLocation() {
  const router = useRouter();
  const [pathname, hashPart = ""] = (router.asPath || "").split("#");
  const [cleanPathname = "/", search = ""] = pathname.split("?");
  return {
    pathname: cleanPathname || "/",
    search: search ? `?${search}` : "",
    hash: hashPart ? `#${hashPart}` : "",
  };
}

export function Outlet() {
  return null;
}

// Legacy exports to satisfy old files that are no longer used after Next migration
export function createBrowserRouter(..._args: any[]) {
  return {};
}

export function RouterProvider(_props: any) {
  return null;
}
