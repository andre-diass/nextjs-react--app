import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { CustomAppProps } from "../types/nextApp";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import PublicLayout from "@/components/layouts/PublicLayout";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ showSpinner: false, trickle: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
