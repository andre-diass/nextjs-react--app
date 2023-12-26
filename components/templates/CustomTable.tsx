import { PropsWithChildren, ReactNode } from "react";
import THead from "../organisms/THead";
import IProduct from "@/types/products";
import { Table } from "../organisms/Table";
import { TBody } from "../organisms/TBody";
import { TDCol } from "../organisms/TDCol";

type Props = {
  cols: Array<{
    key: string;
    label: ReactNode;
  }>;
  actionCols: Array<{ label: string; render: (item: any) => ReactNode }>;
  data: Record<string, any>[];
};

export default function CustomTable({
  cols,
  actionCols,
  data,
}: PropsWithChildren<Props>) {
  console.log(data);

  return (
    <Table>
      {
        <table className="divide-y divide-neutral-200">
          <THead>
            {[
              ...cols.map((col) => <div key={col.key}>{col.label}</div>),
              ...actionCols?.map((actionCol) => (
                <div key={actionCol.label}>{actionCol.label}</div>
              )),
            ]}
          </THead>
          <TBody>
            {data.map((item, index) => {
              console.log(item);

              return (
                <tr key={index}>
                  {[
                    ...cols.map((col) => (
                      <TDCol key={col.key}>{item[col.key]}</TDCol>
                    )),
                    ...actionCols?.map((acol) => (
                      <TDCol key={acol.label}> {acol.render(item)}</TDCol>
                    )),
                  ]}
                </tr>
              );
            })}
          </TBody>
        </table>
      }
    </Table>
  );
}
