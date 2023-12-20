/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import IProduct from "@/types/products";
import { GetServerSidePropsContext } from "next";
import { getCategories } from "@/services/categories/getCategories";
import { getProduct } from "@/services/products/getProduct";

export default function Edit({ savedCategories, product, productId }: any) {
  const router = useRouter();

  const onSubmit = async (data: IProduct) => {
    try {
      await axios.post("/api/products/updateProduct", data, {
        params: { productId: productId },
      });

      router.push("/app/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        heading="Editar Produto"
        isInputRequired={false}
        isNewProduct={false}
        categories={savedCategories}
        {...product}
      />
    </>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const userId = props?.userId;
  const categories = await getCategories(userId);

  const { id } = context.query;
  const productId = Array.isArray(id) ? id[0] : (id as string);
  const product = await getProduct(productId);

  return {
    props: {
      ...props,
      userId,
      productId,
      product,
      savedCategories: categories,
      //data: data as any,
    },
  };
};
