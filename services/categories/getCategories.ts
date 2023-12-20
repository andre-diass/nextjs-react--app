import api from "..";

export async function getCategories(userId: string) {
  try {
    const response = await api.get("/getCategories/" + userId);

    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
