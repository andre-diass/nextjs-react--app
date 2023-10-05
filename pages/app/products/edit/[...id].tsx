/* eslint-disable react-hooks/exhaustive-deps */
import { protectedRouteMiddleware } from "@/middlewares/protectedRouteMiddleware";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/molecules/ProductForm";

export default function Edit() {
  const router = useRouter();
  const productID = router.query.id ? router.query.id[0] : null; // fix this line later
  let imageLinks: any;

  async function updateProduct(body: any) {
    axios
      .post("/api/products/updateProduct", body, {
        params: { productId: productID },
      })
      .catch((x) => console.error(x));
  }

  const onSubmit = async (data: any) => {
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

  const handleImageData = (data: Array<string>) => {
    imageLinks = data;
  };

  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        heading="Editar Produto"
        isInputRequired={false}
        isNewProduct={false}
        productId={productID}
        existingImages={[]}
        sentImageData={handleImageData}
      ></ProductForm>
    </>
  );
}

export const getServerSideProps = protectedRouteMiddleware;

/*
  async function getProduct() {
    const response = await axios.get("/api/products/getProduct", {
      params: { productId: productID },
    });
    console.log(response.data);
  }

  useEffect(() => {
    getProduct();
  }, []);
*/
