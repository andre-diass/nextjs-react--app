import api, { api_monolith } from "../index";

export async function getLocation() {
  try {
    const response = await api_monolith.get("/location", {
      params: { imei: "869951036930547", reference_date: "12/03/2024" },
    });

    return response.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
