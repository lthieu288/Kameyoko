import request from "../utils/request";
const optionAxios = {
  headers: "Access-Control-Allow-Origin: *",
};
export async function getListPresentation(token) {
  const response = await request.get(
    "presentation/get-all",
    {
      headers: {
        Authorization: token,
      },
    },
    optionAxios
  );
  return response;
}

export async function createPresentation(body) {
  const response = await request.post(
    "presentation/create",
    {
      name: body.name,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: body.token,
      },
    }
  );
  return response;
}

export async function getDetailPresentation(token, id) {
  const response = await request.get("presentation?id=" + id, {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function deletePresentation(body) {
  const response = await request.delete("presentation/delete/" + body.id, {
    headers: {
      Authorization: body.token,
    },
  });
  return response;
}
