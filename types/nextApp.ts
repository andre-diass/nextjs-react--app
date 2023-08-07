import { AppProps } from "next/app";
import { NextComponentType } from "next";
import { Session } from "next-auth";

export type NextAuthProps = {
  session?: Session;
};

export type ComponentCustomProperties = {
  protected?: boolean;
  customLayout?: boolean;
  hideSubmenu?: boolean;
};

export type CustomAppProps = AppProps<NextAuthProps> & {
  Component: NextComponentType & ComponentCustomProperties;
};
