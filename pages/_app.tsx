import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CustomAppProps } from "../types/nextApp";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {(function () {
        return (
          <ProtectedLayout>
            <Component {...pageProps} />
          </ProtectedLayout>
        );
      })()}
    </SessionProvider>
  );
}
