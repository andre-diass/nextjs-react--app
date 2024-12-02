/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import IProduct, { Device } from "@/types/products";
import { GetServerSidePropsContext } from "next";
import { getCategories } from "@/services/categories/getCategories";
import { getProduct } from "@/services/products/getProduct";
import ICategory from "@/types/categories";

interface Props {
  categories: Array<ICategory>;
  product: Device;
  productId: string;
}

export default function Edit({ categories, product, productId }: Props) {
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
        categories={categories}
        product={product}
        formType="EditProduct"
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
      categories: categories,
      //data: data as any,
    },
  };
};
