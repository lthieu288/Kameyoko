import request from "../utils/request";

var optionAxios = {
  headers: "Access-Control-Allow-Origin: *",
};
export const register = async (userInfo) => {
  const res = await request
    .post("register", userInfo, optionAxios)
    .then((res) => {
      console.log("res: ", res);
    });
  return res.data;
};
