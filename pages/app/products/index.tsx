/* eslint-disable @next/next/no-img-element */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import edit from "@/public/edit.svg";
import trash from "@/public/trash.svg";
import { GetServerSidePropsContext } from "next";
import { getProducts } from "@/services/products/getProducts";
import CustomTable from "@/components/templates/CustomTable";
import IProduct from "@/types/products";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";

interface Props {
  products: Array<IProduct>;
}

export default function Products({ products }: Props) {
  const router = useRouter();
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
            <Button
              size="sm"
              variant="highlight"
              imgSrc={edit.src}
              onClick={() => router.push("products/edit/" + item._id)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="primary"
              imgSrc={trash.src}
              onClick={() => router.push("products/delete/" + item._id)}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const customDataRender = {
    createdAt: (item: IProduct) => new Date(item.createdAt).toLocaleString(),
    price: (item: IProduct) => <p> ${item.price}</p>,
  };

  return (
    <>
      <Button
        size="bs"
        variant="highlight"
        onClick={() => router.push("/app/products/new")}
      >
        New product
      </Button>
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
