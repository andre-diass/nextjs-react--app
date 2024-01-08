/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
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
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "_id", label: "ID" },
    // { key: "createdAt", label: "Created At" },
  ];

  const actionCols = [
    {
      label: "",
      render: (item: IProduct) => (
        <>
          <div className="flex gap-1">
            <Link
              className="flex bg-blue-800 p-2 text-white rounded-md"
              href={"products/edit/" + item._id}
            >
              <img
                className="hidden md:block"
                src={edit.src}
                alt="Icon"
                width={22}
                height={16}
              />
              <p> Edit </p>
            </Link>

            <Link
              className="flex bg-red-600 p-2 text-white rounded-md"
              href={"products/delete/" + item._id}
            >
              <img
                className="hidden md:block"
                src={trash.src}
                alt="Icon"
                width={22}
                height={16}
              />
              <p> Delete</p>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const customDataRender = {
    createdAt: (item: IProduct) => new Date(item.createdAt).toLocaleString(),
  };

  return (
    <>
      <Link
        className="bg-blue-800 rounded-lg p-2 text-white"
        href={"/app/products/new"}
      >
        New product
      </Link>
      <CustomTable
        cols={cols}
        actionCols={actionCols}
        data={products}
        customDataRender={customDataRender}
        type="product"
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
