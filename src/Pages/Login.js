import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { loginUser, useAuthDispatch } from "../Context";
import { gapi } from "gapi-script";
import { forgetPassword } from "../services/UserService";
import request from "../utils/request";

// const clientId =
//   "12369507363-douqeq9o9pqaf40i4ij4rk1fql17t9nt.apps.googleusercontent.com";
const clientId = '768128998994-6ltvdfgdgotov36pbbmqmv4apvjfsor5.apps.googleusercontent.com';
function Login() {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    sendRequest();
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendRequest();
    }
  }
  const onSuccess = (res) => {
    const userInfo = {
      username: res.profileObj.givenName,
      password:  Math.random().toString(36).slice(-8),
      email: res.profileObj.email,
      fullname: res.profileObj.name,
      is_social:true
    };
    async function getPost() {
      await request
          .post("auth/register", userInfo)
          .then((res) => {
            console.log(res);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            Swal.fire({
              icon: "success",
              title: "Register successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate("/")
          })
          .catch((error) => {
            console.log(error.response.data.message);
            Swal.fire({
              icon: "error",
              title: "Invalid your email",
              text: "Check your information again, please",
            });
          });
    }
    getPost();
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res: ", res);

  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  async function sendRequest() {
    const payload = {
      password: password,
      email: username,
    };
    try {
      let response = await loginUser(dispatch, payload);
      if (!response) {
        Swal.fire({
          icon: "error",
          title: "Incorrect email or password",
        });
      } else {
        const query = new URLSearchParams(window.location.search);
        const redirect = decodeURIComponent(query.get("redirect"));

        if (redirect) {
          navigate(`/${redirect === "null" ? "" : redirect}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleResetPassword = () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Email is invalid",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      forgetPassword(email).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 bg-color">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <form>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      KAMEYOKO
                    </h2>
                    <div className="form-outline mb-4">
                      <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        label="Email"
                        type="email"
                        className="form-control form-control-lg"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        label="Password"
                        type="password"
                        className="form-control form-control-lg"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-light btn-lg bg-color text-white px-5 fw-bold"
                        onClick={handleClick}
                      >
                        Sign in
                      </button>
                    </div>
                    <hr className="my-4" />
                    <div className="form-outline mb-4 d-flex justify-content-center">
                      <GoogleLogin
                          variant="outlined"
                          color="error"
                          clientId={clientId}
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          cookiePolicy={'single_host_origin'}
                      >
                      </GoogleLogin>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className="mb-0 text-black center text-muted">
                        You forgot password?
                        <Link
                          className="fw-bold text-body"
                          style={{ marginLeft: "10px" }}
                          onClick={() => setShowPopUp(true)}
                        >
                          Reset password
                        </Link>
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center">
                      <p className="mb-0 text-black center text-muted">
                        Don't have an account?{" "}
                        <Link to="/register" className="fw-bold text-body">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showPopUp}
        onHide={() => {
          setShowPopUp(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Enter your email"
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
              setShowPopUp(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleResetPassword}
          >
            Reset password
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Login;
