import { InputAdornment, TextField } from "@mui/material";
import { Send, CheckCircle, ThumbUp } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {
  getQuestion,
  sendQuestion,
  voteQuestion,
} from "../services/QuestionService";

let stompClient = null;

function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const presentId = props.id;
  const role = props.role;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    connect();

    getQuestion(presentId).then((res) => {
      console.log(res);
      if (res.length) {
        setQuestions(res);
      }
    });
  }, []);

  const connect = () => {
    let Sock = new SockJS("https://kameyoko-api-production.up.railway.app/ws");
    stompClient = Stomp.over(Sock);
    stompClient.connect({}, onConnected, onError);
    stompClient.debug = null;
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/question/" + presentId, onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    setQuestions(JSON.parse(payload.body));
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleClick = () => {
    sendQuestion(text, presentId, user.user.username, user.user.id);
    setText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendQuestion(text, presentId, user.user.username, user.user.id);
      setText("");
    }
  };

  const handleVote = (event, id, isAnswered) => {
    if (event.detail === 2) {
      voteQuestion(id, presentId, user.user.id, role, isAnswered).then(
        (res) => {
          console.log(res);
        }
      );
    }
  };

  //   const reversed = Array.isArray() ? message.slice().reverse() : message;
  return (
    <>
      <section>
        <div style={{ backgroundColor: "#eee", width: "100%" }}>
          <div class="row d-flex justify-content-center">
            <div>
              <div class="card" id="chat2">
                <div class="card-header align-items-center bg-success text-white">
                  <h5 class="mb-0 text-center fw-bold ">Question</h5>
                </div>
                <div
                  class="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ height: "50vh", overflowY: "auto" }}
                >
                  {questions?.map((row, index) =>
                    user?.user.id !== row.userId ? (
                      <div
                        key={index}
                        class="d-flex flex-row justify-content-start mb-4"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGwlAahaapmmJ7Riv_L_ZujOcfWSUJnm71g&usqp=CAU"
                          alt="avatar 1"
                          style={{
                            width: "45px",
                            height: "100%",
                            marginTop: "18px",
                          }}
                        />
                        <div>
                          <p class="small ms-3 mb-0 rounded-3 text-muted">
                            {row.username}
                          </p>
                          <p
                            class="small p-2 ms-3 mb-1 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                            onClick={(e) =>
                              handleVote(e, row.id, row.isAnswered)
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Double click to vote"
                          >
                            {row.question}
                          </p>
                        </div>
                        {row.isAnswered ? (
                          <div className="mt-4">
                            <CheckCircle
                              style={{ color: "green" }}
                            ></CheckCircle>
                          </div>
                        ) : row.totalVote > 0 ? (
                          <div className="d-flex mt-4">
                            <div className="fw-bold">{row.totalVote}</div>
                            <ThumbUp
                              style={{ color: "#F5C33B", width: "20px" }}
                            ></ThumbUp>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ) : (
                      <div
                        key={index}
                        class="d-flex flex-row justify-content-end mb-4"
                      >
                        {row.isAnswered ? (
                          <div className="mt-1">
                            <CheckCircle
                              style={{ color: "green" }}
                            ></CheckCircle>
                          </div>
                        ) : row.totalVote > 0 ? (
                          <div className="d-flex mt-1">
                            <div className="fw-bold">{row.totalVote}</div>
                            <ThumbUp
                              style={{ color: "#F5C33B", width: "20px" }}
                            ></ThumbUp>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <div>
                          <p
                            class="small p-2 me-3 mb-0 text-white rounded-3 bg-success"
                            onClick={(e) =>
                              handleVote(e, row.id, row.isAnswered)
                            }
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Double click to vote"
                            style={{ cursor: "pointer" }}
                          >
                            {row.question}
                          </p>
                        </div>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGwlAahaapmmJ7Riv_L_ZujOcfWSUJnm71g&usqp=CAU"
                          alt="avatar 1"
                          style={{
                            width: "45px",
                            height: "100%",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
                <div ref={messagesEndRef} />
                <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  {role === "member" ? (
                    <TextField
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      onKeyDown={handleKeyPress}
                      label="Type question"
                      value={text}
                      type="text"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{ cursor: "pointer" }}
                          >
                            <Send
                              style={{ color: "green" }}
                              onClick={handleClick}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Question;
