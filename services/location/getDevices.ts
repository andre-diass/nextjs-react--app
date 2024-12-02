import api, { api_monolith } from "../index";

export async function getDevices(userID: string) {
  try {
    const response = await api_monolith.get("/devices", {
      params: { user_id: userID },
    });

    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
