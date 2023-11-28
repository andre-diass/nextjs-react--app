import axios from "axios";

export async function getCategories(userId: string) {
  try {
    const response = await axios.get(
      "https://vclqy6j2ed.execute-api.us-west-1.amazonaws.com/dev/serverless/getCategories/" +
        userId
    );
    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
