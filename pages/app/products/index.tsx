/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useState } from "react";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { GetServerSidePropsContext } from "next";
import { getProducts } from "@/services/products/getProducts";
import CustomTable from "@/components/templates/CustomTable";
import IProduct from "@/types/products";

interface Props {
  products: Array<IProduct>;
}

export default function Products({ products }: Props) {
  const cols = [
    { key: "name", label: "name" },
    { key: "price", label: "price" },
    { key: "userId", label: "userId" },
  ];

  const actionCols = [
    {
      label: "teste",
      render: (item: IProduct) => (
        <>
          <Link href={"products/edit/" + item._id}>
            <img src={edit.src} alt="Icon" width={22} height={16} />
            Edit{" "}
          </Link>
          <Link href={"products/delete/" + item._id}>
            <img src={trash.src} alt="Icon" width={22} height={16} />
            Delete
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        cols={cols}
        actionCols={actionCols}
        data={products}
      ></CustomTable>
    </>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const userId = props?.userId;

  const products = await getProducts(userId);
  console.log(products);

  return {
    props: {
      ...props,
      userId: userId,
      products: products,
    },
  };
};

/*
<Link
        className="bg-slate-100 rounded-lg p-2 text-zinc-900"
        href={"/app/products/new"}
      >
        New product
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link href={"products/edit/" + product._id}>
                  <img src={edit.src} alt="Icon" width={22} height={16} />
                  Edit{" "}
                </Link>
                <Link href={"products/delete/" + product._id}>
                  <img src={trash.src} alt="Icon" width={22} height={16} />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


*/
