import api from "./index";

export async function getUser(email: string) {
  try {
    const user = await api.get("/user/" + email);
    return user.data;
  } catch (error) {
    const output = error;
    return output;
  }
}
