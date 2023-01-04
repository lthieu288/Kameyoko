import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import { getProfile, editProfile, editPassword } from "../services/auth";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

let stompClient = null;
function EditProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [replacePass, setReplacePass] = useState("");

  const schema = yup.object().shape({
    username: yup.string().required("user name is required"),
    full_name: yup.string().required("full name is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const uploadAvatar = async (e) => {
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "darwin");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkzkr4aqz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
  };

  function ProfileUser() {
    getProfile(currentUser?.token).then((data) => {
      setUser(data.user);
      setImage(data.user.profile_img);
      setLoading(false);
    });
  }
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=profile");
    }
    setLoading(true);
    ProfileUser();
    connect();
  }, [currentUser?.token]);

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

  const handleSubmitEditProfile = async (data) => {
    let editUser = {
      "full_name": data.full_name,
      "username": data.username,
      "profile_img": image === undefined ? "": image,
    };
    editProfile(currentUser.token, editUser).then((response) => {
      console.log(response);
      if (response.status === 204) {
        Swal.fire({
          icon: "success",
          title: "Edit profile successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          text: "Check your information again, please",
        });
      }
    });
  };
  const changePassword = async () => {
    let changePass = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    if (replacePass !== newPassword) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Passwords Don't Match ( oldPassword and newPassword )",
      }).then((r) => {});
    } else {
      editPassword(currentUser.token, changePass).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Change password successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          setShowCreate(false);
          setOldPassword("");
          setNewPassword("");
          setReplacePass("");
        } else {
          Swal.fire({
            icon: "error",
            title: response.message,
            text: "Check Old Password, please",
          });
        }
      });
    }
  };
  if (loading) return <p> Loading </p>;
  if (!user) return <p>No User</p>;
  return (
    <>
      <Navbar />
      <div className="d-flex h-auto gradient-custom-3">
        <div className="mt-0 mb-4 container" style={{ paddingTop: "30px" }}>
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  {image === "" ? (
                    <img
                      style={{
                        borderRadius: "50% !important",
                        height: "12rem",
                        width: "12rem",
                      }}
                      className="img-account-profile rounded-circle mb-2"
                      src="http://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{
                        borderRadius: "50% !important",
                        height: "12rem",
                        width: "12rem",
                      }}
                      className="img-account-profile rounded-circle mb-2"
                      src={image}
                      alt=""
                    />
                  )}
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <div>
                    <input
                      type="file"
                      className="btn btn-primary"
                      accept="image/png, image/jpeg"
                      onChange={uploadAvatar}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(handleSubmitEditProfile)}>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Full name
                      </label>
                      <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Enter your username"
                        defaultValue={user.full_name}
                        {...register("full_name")}
                      />
                      <p className="error" style={{ color: "red" }}>
                        {errors.full_name?.message}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        User name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        defaultValue={user?.username}
                        {...register("username")}
                      />
                      <p className="error" style={{ color: "red" }}>
                        {errors.username?.message}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Enter your email address"
                        value={user.email}
                        disabled
                      />
                    </div>
                    <Button variant="outline-primary" type="submit" style={{}}>
                      Save
                    </Button>
                    {
                      currentUser.user.is_social === true ?
                          <></>
                          :
                          <Button
                              variant="outline-primary"
                              type="submit"
                              style={{ marginLeft:"30px", backgroundColor:"red" , color:"black"}}
                              onClick={() => {
                                setShowCreate(true);
                              }}
                          >
                            Change Password
                          </Button>

                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        show={showCreate}
        onHide={() => {
          setShowCreate(false);
          setOldPassword("");
          setNewPassword("");
          setReplacePass("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            className="form-control"
            size="small"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            className="form-control"
            size="small"
            value={newPassword}
            style={{ marginTop: "20px" }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Replace Password"
            type="password"
            variant="outlined"
            className="form-control"
            size="small"
            value={replacePass}
            style={{ marginTop: "20px" }}
            onChange={(e) => setReplacePass(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              setShowCreate(false);
              setOldPassword("");
              setNewPassword("");
              setReplacePass("");
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={changePassword}
          >
            save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
