import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { GetServerSidePropsContext } from "next";
import { getUser } from "@/services/getUserId";

export default function NewProduct({ userId }: any) {
  let imageLinks: Array<string>;
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
        imageLinks: imageLinks,
      };

      createProduct(bodyWithAccountID);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageData = (data: Array<string>) => {
    imageLinks = data;
  };

  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        heading="Novo Produto"
        isInputRequired={true}
        isNewProduct={true}
        sentImageData={handleImageData}
      ></ProductForm>
    </>
  );
}

export const getServerSideProps = async function (
  context: GetServerSidePropsContext
) {
  const { notFound, props } = await protectedRouteMiddleware(context);
  if (notFound) return { notFound };

  const userEmail = props?.session.user?.email as string;

  const user = await getUser(userEmail);

  return {
    props: {
      ...props,
      userId: user?._id,
      //data: data as any,
    },
  };
};
