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
  return await request.post(
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
}

export async function deletePresentation(body) {
  return await request.delete("presentation/delete/" + body.id, {
    headers: {
      Authorization: body.token,
    },
  });
}

export async function editPresentation(token, id, name) {
  return await request.put(
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
}
export async function getSlidesPresentation(token, id) {
  return await request.get("presentation/" + id + "/slides/get-all", {
    headers: {
      Authorization: token,
    },
  });
}
export async function getPresentation(token, id) {
  return await request.get("presentation/" + id + "/general", {
    headers: {
      Authorization: token,
    },
  });
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
export async function createShowPresentToGroup(body, token, id) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/presentation/" +
      id +
      "/group-presentation",
    // "http://localhost:7777/api/v1/presentation/" + id + "/group-presentation",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );
  console.log(JSON.stringify(body));
  if (response.status === 200) return response;
  else return response.json();
}
