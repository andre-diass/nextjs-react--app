import api from "..";

export async function getProduct(productID: string) {
  try {
    const response = await api.get("/getProduct", {
      params: { productId: productID },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
