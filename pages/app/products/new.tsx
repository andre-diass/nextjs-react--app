import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";
import { useRouter } from "next/router";

export default function NewProduct() {
  const router = useRouter();
  let imageLinks: Array<string>;
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
      })
      .finally(() => router.push("/app/products"));
  }

  const onSubmit = async (data: any) => {
    try {
      const userID = await getUserId();
      const bodyWithAccountID = {
        ...data,
        userId: userID,
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

export const getServerSideProps = protectedRouteMiddleware;
