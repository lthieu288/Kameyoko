import axios from "axios";

const request = axios.create({
  baseURL: "https://kameyoko-api-production.up.railway.app/api/v1",
});

export async function getQuestion(id) {
  const response = await request
    .get("/question?id=" + id, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return response;
}

export async function sendQuestion(question, presentId, username, userId) {
  const response = await request
    .post(
      "/question/send",
      {
        question,
        presentId,
        username,
        userId,
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

export async function voteQuestion(
  questionId,
  presentId,
  userId,
  role,
  isAnswered
) {
  const response = await request
    .post(
      "/question/vote",
      {
        questionId,
        presentId,
        role,
        userId,
        isAnswered,
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
