import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

export async function getMessage(id, offset) {
  const response = await request
    .get("chat/message?id=" + id + "&offset=" + offset, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function sendMessage(presentId, userId, message, username) {
  const response = await request
    .post(
      "chat/send",
      {
        presentId,
        userId,
        message,
        username,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return response;
}
