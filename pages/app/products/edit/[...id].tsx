/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { useEffect, useState } from "react";
import IProduct from "@/types/products";
import { GetServerSidePropsContext } from "next";
import { getUser } from "@/services/getUserId";
import { getCategories } from "@/services/getCategories";

export default function Edit({ savedCategories }: any) {
  const router = useRouter();
  const [categories, setCategories] = useState<[]>(savedCategories);
  const [productInfo, setProductInfo] = useState<IProduct>();
  const productID = router.query.id ? router.query.id[0] : null; // refactor
  let imageLinks: any;

  //this should not be implemented here => REFACTOR
  async function getProduct() {
    const response = await axios.get("/api/products/getProduct", {
      params: { productId: productID },
    });
    setProductInfo(response.data);
  }

  useEffect(() => {
    getProduct();
  }, [productID]);

  const handleImageData = (data: Array<string>) => {
    imageLinks = data;
  };

  const onSubmit = async (data: IProduct) => {
    try {
      const body = {
        ...data,
        imageLinks: imageLinks,
      };

      updateProduct(body);
      router.push("/app/products");
    } catch (error) {
      console.error(error);
    }
  };

  async function updateProduct(body: IProduct) {
    axios
      .post("/api/products/updateProduct", body, {
        params: { productId: productID },
      })
      .catch((x) => console.error(x));
  }

  return (
    <>
      {productInfo && (
        <ProductForm
          onSubmit={onSubmit}
          heading="Editar Produto"
          isInputRequired={false}
          isNewProduct={false}
          sentImageData={handleImageData}
          categories={savedCategories}
          {...productInfo}
        />
      )}
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
  const categories = await getCategories(user?._id);

  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return {
    props: {
      ...props,
      userId: user?._id,
      savedCategories: serializedCategories,
      //data: data as any,
    },
  };
};
