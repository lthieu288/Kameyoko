import axios from "axios";

const request = axios.create({
  baseURL: "https://kameyoko.up.railway.app/api/v1",
});

export default request;
