import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:7777/api/v1/",
});

export default request;
