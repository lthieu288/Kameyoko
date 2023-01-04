import { InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState, useRef } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { getMessage, sendMessage } from "../services/ChatService";

let stompClient = null;

function Chat(props) {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [offset, setOffset] = useState(0);
  const messagesEndRef = useRef(null);
  const presentId = props.id;
  const idGroup = props.idGroup;

  useEffect(() => {
    connect();

    getMessage(presentId, 0).then((res) => {
      console.log(res);
      if (res.length) {
        setMessage(res);
        setOffset(0);
      }
    });
  }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [message]);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const connect = () => {
    let Sock = new SockJS("https://kameyoko-api-production.up.railway.app/ws");
    stompClient = Stomp.over(Sock);
    stompClient.connect({}, onConnected, onError);
    stompClient.debug = null;
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/chat/" + presentId, onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    setMessage(JSON.parse(payload.body));
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleScroll = (event) => {
    let element = event.target;
    if (element.scrollTop === 0) {
      getMessage(presentId, offset + 1).then((res) => {
        if (res.length === 0) {
          setOffset(0);
        } else {
          const arr = message.concat(res);
          setMessage(arr);
          setOffset(offset + 1);
        }
      });
    }
  };

  const handleClick = () => {
    sendMessage(presentId, user.user.id, text, user.user.username, idGroup);
    setText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(presentId, user.user.id, text, user.user.username);
      setText("");
    }
  };

  return (
    <>
      <section>
        <div style={{ backgroundColor: "#eee", width: "100%" }}>
          <div class="row d-flex justify-content-center">
            <div>
              <div class="card" id="chat2">
                <div class="card-header align-items-center p-2 bg-primary text-white">
                  <h5 class="mb-0 fw-bold text-center">Chat</h5>
                </div>
                <div
                  class="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ height: "50vh", overflowY: "auto" }}
                  onScroll={handleScroll}
                >
                  {message
                    ?.slice()
                    .reverse()
                    .map((row, index) =>
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
                            >
                              {row.message}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={index}
                          class="d-flex flex-row justify-content-end mb-4"
                        >
                          <div>
                            <p class="small p-2 me-3 mb-0 text-white rounded-3 bg-primary">
                              {row.message}
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
                  <TextField
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                    label="Type message"
                    value={text}
                    type="text"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ cursor: "pointer" }}
                        >
                          <SendIcon
                            style={{ color: "blue" }}
                            onClick={handleClick}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Chat;
