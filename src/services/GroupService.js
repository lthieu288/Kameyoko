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
// export async function assignRole(token, groupId, id, role) {
//   const response = await fetch('http://localhost:7777/group/' + groupId + "/edit/?userId=" + id + "&role=" + role, {
//       method: 'POST',
//       headers: {'Content-type': 'application/json; charset=UTF-8', 'Authorization': token},
//       body: {},
//   });
//   console.log(response);
//   if (response.status === 201) return response;
//   else return response.json();
// }
// export async function assignRole(token, groupId, id, role) {
//   const response = await fetch(
//     "http://localhost:7777" +
//       "/group/" +
//       groupId +
//       "/edit?userId=" +
//       id +
//       "&role=" +
//       role,
//     {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: token,
//       },
//       body: {},
//     }
//   )
//     .then((res) => {
//       console.log(res);
//       return res.data;
//     })
//     .catch((error) => {
//       console.log(error);
//       return error;
//     });
//   return response;
// }
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
      console.log(res);

      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
}
// export async function assignRole(token, groupId, id, role) {
//   const response = await request
//     .post(
//       "/group/" + groupId + "/edit/?userId=" + id + "&role=" + role,
//       {},
//       {
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//           Authorization: token,
//         },
//       }
//     )
//     .then((res) => {
//       return res.data;
//     })
//     .catch((error) => {
//       return error;
//     });
//   return response;
// }
