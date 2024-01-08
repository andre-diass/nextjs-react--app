import { PropsWithChildren } from "react";

const styles = {
  tbody: "bg-fourth divide-y divide-neutral-200",
};

export const TBody = ({ children }: PropsWithChildren) => (
  <tbody className={styles.tbody}>{children}</tbody>
);
