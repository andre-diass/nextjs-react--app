import { ReactNode } from "react";

const styles = {
  thead: "bg-third",
  thCol:
    "py-3.5 px-4 text-sm w-max font-bold text-left rtl:text-right text-neutral-700",
};

export default function THead({ children }: { children: ReactNode[] }) {
  return (
    <thead className={styles.thead}>
      <tr>
        {children.map((x, i) => (
          <th className={styles.thCol} key={i}>
            {" "}
            {x}{" "}
          </th>
        ))}
      </tr>
    </thead>
  );
}
