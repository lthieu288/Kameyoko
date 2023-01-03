import request from "../utils/request";

export async function getListSlide(token, id) {
  const response = await request.get("presentation/" + id + "/slides/get-all", {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function postVote(token, idPre, idCont, idOpt) {
  const response = await request.post(
    "/presentation/" + idPre + "/vote/" + idCont + "/submit?option_id=" + idOpt,
    {},
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    }
  );
  return response;
}

// export async function forgetPassword(email) {
//   const response = await request.get("/auth/forgot-password", {
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//     data: {
//       email: email,
//     },
//   });
//   return response;
// }

export async function forgetPassword(email) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/auth/forgot-password",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(email),
    }
  );
  return response;
}
