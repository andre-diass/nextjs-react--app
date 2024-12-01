import api, { api_monolith } from "../index";

export async function getLocation() {
  try {
    const response = await api_monolith.get("/location", {
      params: { imei: "2222", reference_date: "11/30/2024" },
    });

    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
