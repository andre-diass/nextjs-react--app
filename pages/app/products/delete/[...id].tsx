/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import axios from "axios";
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const [productName, setProductName] = useState("");
  const router = useRouter();
  const productID = router.query.id ? router.query.id[0] : null; // fix this line later

  async function getProductName() {
    const response = await axios.get("/api/products/getProduct", {
      params: { productId: productID },
    });
    setProductName(response?.data?.name);
  }

  useEffect(() => {
    if (!productID) {
      return;
    }

    getProductName();
  }, [productID]);

  async function deleteProduct() {
    axios
      .delete("/api/products/deleteProduct", {
        params: { productId: productID },
      })
      .catch((x) => console.error(x));
  }

  const onDelete = async () => {
    try {
      deleteProduct();
      router.push("/app/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center mb-3">
        Do you really want to delete {productName} ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={onDelete}>
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
export const getServerSideProps = protectedRouteMiddleware;
