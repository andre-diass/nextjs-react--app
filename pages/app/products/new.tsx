import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { GetServerSidePropsContext } from "next";
import { getCategories } from "@/services/categories/getCategories";

export default function NewProduct({ userId, savedCategories }: any) {
  async function createProduct(body: any) {
    axios
      .post("/api/products/createProduct", body)
      .catch((x) => console.error(x));
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
        heading="Novo Produto"
        isInputRequired={true}
        isNewProduct={true}
        categories={savedCategories}
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
      savedCategories: categories,
      //data: data as any,
    },
  };
};
