import request from "../utils/request";

const optionAxios = {
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

export async function createGroup(body, token) {
  const response = await request.post(
    "accounts/create-group",
    { name: body },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    }
  );
  if (response.status === 201) return response;
  else return response.json();
}

export async function getProfile(token) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/accounts/profile",
// " http://localhost:7777/api/v1/accounts/profile",
{
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
}

export async function editProfile(token, userEdit) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/accounts/edit",
      {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(userEdit),
    }
  );
  console.log(JSON.stringify(userEdit))
  if (response.status === 204) return response;
  else return response.json();
}

export async function editPassword(token, body) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/accounts/change-password",
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

export async function getGroups(token) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/accounts/joined-groups",
    //   "http://localhost:7777/api/v1/accounts/joined-groups",

      {
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
}

export async function getGroupsManage(token) {
    const response = await fetch(
        "https://kameyoko.up.railway.app/api/v1/accounts/manage-groups",
        // "http://localhost:7777/api/v1/accounts/manage-groups",
        {
            headers: {
                Authorization: token,
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    );
    return response.json();
}
export async function getGroupsJoinedGroup(token) {
    const response = await fetch(
        // "http://localhost:7777/api/v1/accounts/joined-groups",
        "https://kameyoko.up.railway.app/api/v1/accounts/joined-groups",
        {
            headers: {
                Authorization: token,
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    );
    return response.json();
}

export async function ediUserRoleGroup(token, idGroup, idUser, idRole) {
  const response = await fetch(
    "https://kameyoko.up.railway.app/api/v1/group/" +
      idGroup +
      "/edit" +
      "?userId=" +
      idUser +
      "&role=" +
      idRole,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    }
  );
  if (response.status === 200) return response;
  else return response.json();
}
