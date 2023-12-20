/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import axios from "axios";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { GetServerSidePropsContext } from "next";
import { getProduct } from "@/services/products/getProduct";
import IProduct from "@/types/products";

interface Props {
  productId: string;
  product: IProduct;
}

export default function DeleteProduct({ productId, product }: Props) {
  const router = useRouter();

  const deleteProduct = async () => {
    try {
      axios.delete("/api/products/deleteProduct", {
        params: { productId: productId },
      });
      router.push("/app/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center mb-3">
        Do you really want to delete {product.name} ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button
          className="btn-default"
          onClick={() => router.push("/app/products")}
        >
          No
        </button>
      </div>
    </>
  );
}
export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };
  const { id } = context.query;
  const productId = Array.isArray(id) ? id[0] : (id as string);
  const product = await getProduct(productId);

  return {
    props: { ...props, productId, product },
  };
};
