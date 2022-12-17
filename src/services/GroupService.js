import request from "../utils/request";

export async function getDetailGroup(token, id) {
  const response = await request
    .get("group/" + id + "/general", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function getListMember(token, id) {
  const response = await request
    .get("group/" + id + "/details", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return response;
}
export async function assignRole(token, groupId, id, role) {
  const response = await request
    .post(
      "/group/" + groupId + "/edit?userId=" + id + "&role=" + role,
      {},
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function joinGroup(token, userId, groupId) {
  const response = await request
    .post(
      "/group/" + groupId + "/add-member",
      {
        user_id: userId,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
  return response;
}
