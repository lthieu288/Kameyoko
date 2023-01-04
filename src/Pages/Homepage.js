import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Card } from "react-bootstrap";
import { Groups, Person, Add, HighlightOff } from "@mui/icons-material";
import { TextField, Tooltip } from "@mui/material";
import { getGroups, getGroupsManage } from "../services/auth";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import { createGroup } from "../services/auth";
import { deleteGroup } from "../services/GroupService";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import Swal from "sweetalert2";

let stompClient = null;
function Homepage() {
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  const [groupOwner, setGroupOwner] = useState([]);
  const [groupJoin, setGroupJoin] = useState([]);
  const [groupRender, setGroupRender] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [inputCreate, setInputCreate] = useState("");
  const [render, setRender] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=");
    }
    connect();
    getGroups(user?.token).then((data) => {
      setGroupJoin([]);
      let obj = null;
      let owner = [];
      let join = [];
      for (var i = 0; i < data.groups_data?.length; i++) {
        obj = data.groups_data[i].group;
        if (data.groups_data[i].role === "owner") {
          owner.push(obj);
        } else {
          join.push(obj);
        }
      }
      setGroupJoin(join);
    });
    getGroupsManage(user?.token).then((data) => {
      setGroupOwner(data.groups_data);
      setGroupRender(data.groups_data);
    });
  }, [render]);

  const connect = () => {
    let Sock = new SockJS("https://kameyoko-api-production.up.railway.app/ws");
    stompClient = Stomp.over(Sock);
    stompClient.connect({}, onConnected, onError);
    stompClient.debug = null;
  };

  const onConnected = () => {
    stompClient.subscribe("/topic/chat/" + user.user.id, onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    Swal.fire({
      icon: "info",
      title: "New message: " + payload.body,
    });
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleCloseCreate = () => {
    createGroup(inputCreate, user.token).then((response) => {
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Create group successfully",
          showConfirmButton: false,
        });
        setRender(!render);
        setShowCreate(false);
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
        });
      }
    });
  };
  const handleDelete = (e) => {
    Swal.fire({
      title: "Do you want to delete this group?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(e);
        if (e.role === "owner") {
          deleteGroup(user.token, e.group.id).then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Delete successfully",
                showConfirmButton: false,
                timer: 1000,
              });
              setRender(!render);
            } else {
              Swal.fire({
                icon: "error",
                title: "Fail to delete group",
              });
            }
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "You don't have permission",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
  };
  return (
    <>
      <Navbar />
      <div className="gradient-custom-3">
        <div className="container py-5">
          <div style={{ minHeight: "100vh" }}>
            <div
              className="row d-flex justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-3 bg-white py-3">
                <div class="list-group" id="list-tab" role="tablist">
                  <div
                    class={`list-group-item list-group-item-action ${
                      state === 1 ? "active" : ""
                    }`}
                    id="list-home-list"
                    data-toggle="list"
                    href="#"
                    role="tab"
                    aria-controls="home"
                    onClick={() => {
                      setState(1);
                      setGroupRender(groupOwner);
                    }}
                  >
                    <Groups style={{ marginRight: "10px" }}></Groups> Group I
                    manage
                  </div>
                  <div
                    class={`list-group-item list-group-item-action ${
                      state === 2 ? "active" : ""
                    }`}
                    id="list-profile-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="profile"
                    onClick={() => {
                      setState(2);
                      setGroupRender(groupJoin);
                    }}
                  >
                    <Person style={{ marginRight: "10px" }}></Person>Group I've
                    joined
                  </div>
                </div>
                <hr />
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => setShowCreate(true)}
                  >
                    <Add style={{ marginRight: "10px" }}></Add>
                    New group
                  </button>
                </div>
              </div>
              <div className="col-9 bg-white py-3">
                <div
                  class="container"
                  style={{ overflowY: "scroll", height: "100vh  " }}
                >
                  <div class="row row-cols-3">
                    {groupRender?.map((row, index) => (
                      <div class="col mt-3">
                        <Card
                          className="item-group"
                          style={{
                            padding: "0",
                            borderRadius: "15px",
                            margin: 0,
                          }}
                        >
                          <Card.Header>
                            <div className="d-flex justify-content-between">
                              Group
                              <Tooltip title="Delete">
                                <HighlightOff
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleDelete(row);
                                  }}
                                ></HighlightOff>
                              </Tooltip>
                            </div>
                          </Card.Header>
                          <Link to={`/group/${row.id}`}>
                            <Card.Img
                              variant="top"
                              src="https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg"
                              style={{
                                height: "10rem",
                                cursor: "pointer",
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                              }}
                            />
                          </Link>
                          <Card.Footer>
                            <div class="d-grid gap-2">
                              <button
                                class="btn btn-light fw-bold"
                                type="button"
                              >
                                {row?.name}
                              </button>
                            </div>
                          </Card.Footer>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showCreate}
        onHide={() => {
          setShowCreate(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            onChange={(e) => {
              setInputCreate(e.target.value);
            }}
            label="Group name"
            variant="outlined"
            className="form-control"
            size="small"
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleCloseCreate}
          >
            Create new group
          </button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default Homepage;
