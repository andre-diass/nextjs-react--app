import axios from "axios";

const api = axios.create({
  baseURL:
    "https://ske84d6xyj.execute-api.us-west-1.amazonaws.com/dev/serverlessSetup/",
});

export default api;
