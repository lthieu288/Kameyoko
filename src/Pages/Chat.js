import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { getMessage } from "../services/ChatService";
const SOCKET_URL = "http://localhost:8080/ws-message";

let stompClient = null;
function Chat() {
  const [message, setMessage] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [render, setRender] = useState(true);
  const [offset, setOffset] = useState(0);
  const presentId = 20;

  useEffect(() => {
    connect();
    getMessage(presentId, 0).then((res) => {
      setMessage(res);
      setOffset(0);
    });
  }, [render]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/chat/20", onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    setMessage(JSON.parse(payload.body));

    setRender(!render);
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleClick = () => {
    stompClient.send("/app/sendMessage", {}, render);
  };

  const handleScroll = (event) => {
    let element = event.target;
    if (element.scrollTop === 0) {
      getMessage(presentId, offset + 1).then((res) => {
        console.log(res);
        const arr = message.concat(res);
        setMessage(arr);
        setOffset(offset + 1);
      });
    }
  };

  const reversed = message.slice().reverse();
  return (
    <>
      <section>
        <div
          class="container py-5"
          style={{ backgroundColor: "#eee", width: "800px" }}
        >
          <div class="row d-flex justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-6">
              <div class="card" id="chat2">
                <div class="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 class="mb-0">Chat</h5>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-mdb-ripple-color="dark"
                  >
                    Let's Chat App
                  </button>
                </div>
                <div
                  class="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ height: "70vh", overflowY: "auto" }}
                  onScroll={handleScroll}
                >
                  {reversed?.map((row, index) =>
                    user.user.id !== row.userId ? (
                      <div class="d-flex flex-row justify-content-start mb-4">
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
                      <div class="d-flex flex-row justify-content-end mb-4">
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
                <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Type message"
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
