import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";
import { loginUser, useAuthDispatch, useAuthState } from "../Context";

function Login() {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("");
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
  async function sendRequest() {
    const payload = {
      password: password,
      email: email,
    };
    try {
      let response = await loginUser(dispatch, payload);
      console.log(response);
      if (!response) {
        Swal.fire({
          icon: "error",
          title: "Incorrect email or password",
        });
      } else {
        const query = new URLSearchParams(window.location.search);
        const redirect = decodeURIComponent(query.get("redirect"));

        if (redirect) {
          console.log(redirect);
          navigate(`/${redirect === null ? "" : redirect}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-5 fw-bold"
                        onClick={handleClick}
                      >
                        Sign in
                      </button>
                    </div>
                    <hr className="my-4" />
                    <div className="form-outline mb-4 d-flex justify-content-center">
                      <Button variant="outlined" color="error">
                        <GoogleIcon className="mx-2" /> Continue with Google
                      </Button>
                    </div>
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
    </section>
  );
}

export default Login;
