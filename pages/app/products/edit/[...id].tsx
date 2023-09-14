/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

export default function Edit() {
  const router = useRouter();
  const productID = router.query.id ? router.query.id[0] : null; // fix this line later

  async function makeGetRequest() {
    const response = await axios.get("/api/products/getProduct", {
      params: { productId: productID },
    });
    console.log(response.data);
  }

  useEffect(() => {
    makeGetRequest();
  }, []);

  return (
    <>
      <div> teste </div>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
