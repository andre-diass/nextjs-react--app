import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CustomAppProps } from "../types/nextApp";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import PublicLayout from "@/components/layouts/PublicLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {(function () {
        const isLogged = session;

        if (isLogged) {
          return (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
          );
        } else if (!isLogged) {
          return (
            <PublicLayout>
              <Component {...pageProps} />
            </PublicLayout>
          );
        }
      })()}
    </SessionProvider>
  );
}
