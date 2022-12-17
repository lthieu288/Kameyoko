import request from "../utils/request";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await request
      .post("auth/login", loginPayload)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
    let data = response;

    if (data.status === 200) {
      localStorage.setItem("currentUser", JSON.stringify(data.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      return data;
    }
    dispatch({ type: "LOGIN_ERROR", error: "Invalid email or password" });
    return null;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}
export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
