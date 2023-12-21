import { PropsWithChildren, ReactNode } from "react";
import THead from "../organisms/THead";
import IProduct from "@/types/products";

type Props = {
  cols: Array<{
    key: string;
    label: ReactNode;
  }>;
  actionCols: Array<{ label: string; render: (item: any) => ReactNode }>;
  data: Array<IProduct>;
};

export default function CustomTable({
  cols,
  actionCols,
  data,
}: PropsWithChildren<Props>) {
  console.log(data);

  return (
    <table>
      <THead>
        {[
          ...actionCols?.map((actionCol) => (
            <div key={actionCol.label}>{actionCol.label}</div>
          )),
          ...cols.map((col) => <div key={col.key}>{col.label}</div>),
        ]}
      </THead>
      <tbody>
        {data.map((product, index) => {
          return (
            <tr key={index}>
              {[
                ...actionCols?.map((acol) => (
                  <td key={acol.label}> {acol.render(product)}</td>
                )),
                ...cols.map((col) => (
                  <td key={col.key}>{product[col.key as keyof IProduct]}</td>
                )),
              ]}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
