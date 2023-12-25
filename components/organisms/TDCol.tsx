import { PropsWithChildren } from "react";

export const TDCol = ({ children }: PropsWithChildren) => (
  <td className="text-sm font-medium text-neutral-800  ">{children}</td>
);
