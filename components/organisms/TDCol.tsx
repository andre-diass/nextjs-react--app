import { PropsWithChildren } from "react";

export const TDCol = ({ children }: PropsWithChildren) => (
  <td className="text-sm font-medium text-neutral-800 py-4 px-4 whitespace-nowrap ">
    {children}
  </td>
);
