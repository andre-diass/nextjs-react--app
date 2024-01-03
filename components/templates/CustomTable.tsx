import { PropsWithChildren, ReactNode } from "react";
import THead from "../organisms/THead";
import IProduct from "@/types/products";
import { Table } from "../organisms/Table";
import { TBody } from "../organisms/TBody";
import { TDCol } from "../organisms/TDCol";
import NODataFallback from "./NoDataFallBack";
import Link from "next/link";

type Props = {
  cols: Array<{
    key: string;
    label: ReactNode;
  }>;
  actionCols: Array<{ label: string; render: (item: any) => ReactNode }>;
  data: Record<string, any>[];
  customDataRender?: Record<string, (item: any) => ReactNode>;
};

export default function CustomTable({
  cols,
  actionCols,
  data,
  customDataRender,
}: PropsWithChildren<Props>) {
  console.log(data);

  if (data.length === 0)
    return (
      <>
        {" "}
        <Link
          className="bg-blue-900 rounded-lg p-2 text-white"
          href={"/app/products/new"}
        >
          New product
        </Link>
        <NODataFallback
          title="No product found"
          subtitle="You have to create a new product on the button above"
        />
      </>
    );

  return (
    <>
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
                        <TDCol key={col.key}>
                          {customDataRender
                            ? customDataRender[col.key]
                              ? customDataRender[col.key](item)
                              : item[col.key]
                            : item[col.key] || "ERROR"}
                        </TDCol>
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
    </>
  );
}
