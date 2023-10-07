/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { useEffect, useState } from "react";
import IProduct from "@/types/products";

export default function Edit() {
  const router = useRouter();
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
          {...productInfo}
        />
      )}
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
