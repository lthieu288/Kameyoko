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

export async function editPresentation(token, id, name) {
  const response = await request.put(
    "presentation/" + id + "/edit",
    {
      name: name,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}
export async function getSlidesPresentation(token, id) {
  const response = await request.get("presentation/" + id + "/slides/get-all", {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function createSlides(body, token, id) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/presentation/" +
      id +
      "/slide/create",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );
  if (response.status === 201) return response;
  else return response.json();
}
export async function updateSlide(body, token, idPre, idSlide, idContent) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/presentation/" +
      idPre +
      "/slide/" +
      idSlide +
      "/edit?content_id=" +
      idContent,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );
  if (response.status === 200) return response;
  else return response.json();
}
