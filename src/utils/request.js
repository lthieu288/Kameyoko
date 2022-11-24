import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:7777/api/",
});

export default request;
