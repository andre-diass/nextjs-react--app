import api from "../index";

export async function getProducts(userID: string) {
  try {
    const response = await api.get("/getProducts", {
      params: { userId: userID },
    });
    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
