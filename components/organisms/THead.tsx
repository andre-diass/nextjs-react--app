import { ReactNode } from "react";

export default function THead({ children }: { children: ReactNode[] }) {
  return (
    <thead>
      <tr>
        {children.map((x, i) => (
          <th key={i}> {x} </th>
        ))}
      </tr>
    </thead>
  );
}
