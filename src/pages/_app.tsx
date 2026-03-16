import type { AppProps } from "next/app";
import LegacyLayout from "../app/components/layout/Layout";
import NextSeoHead from "../next/NextSeoHead";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeoHead />
      <LegacyLayout>
        <Component {...pageProps} />
      </LegacyLayout>
    </>
  );
}
