import { PropsWithChildren } from "react";

export function Table({ children }: PropsWithChildren) {
  return <div className="mt-6 flex flex-col overflow-auto">{children}</div>;
}
