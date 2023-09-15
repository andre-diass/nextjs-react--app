import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";

export default function NewProduct() {
  async function createProduct(body: any) {
    axios
      .post("/api/products/createProduct", body)
      .catch((x) => console.error(x));
  }

  async function getUserId() {
    return axios
      .get("/api/accountID")
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  }

  const onSubmit = async (data: any) => {
    try {
      const userID = await getUserId();
      const bodyWithAccountID = { ...data, userId: userID };

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
      ></ProductForm>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;
