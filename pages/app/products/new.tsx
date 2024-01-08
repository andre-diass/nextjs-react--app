import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { GetServerSidePropsContext } from "next";
import { getCategories } from "@/services/categories/getCategories";
import { useRouter } from "next/router";
import ICategory from "@/types/categories";

export default function NewProduct({
  userId,
  categories,
}: {
  userId: string;
  categories: Array<ICategory>;
}) {
  const router = useRouter();
  async function createProduct(body: any) {
    axios
      .post("/api/products/createProduct", body)
      .catch((x) => console.error(x))
      .finally(() => router.push("/app/products"));
  }

  const onSubmit = async (data: any) => {
    try {
      const bodyWithAccountID = {
        ...data,
        userId: userId,
      };

      createProduct(bodyWithAccountID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        categories={categories}
        formType="CreateProduct"
      ></ProductForm>
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

  return {
    props: {
      ...props,
      userId,
      categories: categories,
      //data: data as any,
    },
  };
};
