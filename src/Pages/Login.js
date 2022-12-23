import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";
import { GoogleLogin } from "react-google-login";
import { loginUser, useAuthDispatch, useAuthState } from "../Context";
import { gapi } from "gapi-script";
// const clientId = "768128998994-6ltvdfgdgotov36pbbmqmv4apvjfsor5.apps.googleusercontent.com";
const clientId = "12369507363-douqeq9o9pqaf40i4ij4rk1fql17t9nt.apps.googleusercontent.com";
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
  const onSuccess = (res) => {
    console.log("[Login Success] tokenUser: ", res.tokenId);
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
      email: email,
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
                        cookiePolicy={"single_host_origin"}
                      ></GoogleLogin>
                    </div>
                    <div className="form-outline mb-4 d-flex justify-content-center">
                      <a href="http://localhost:7777/api/v1/oauth/google/login" style={{textTransform: 'none'}}>
                        <div className="left">
                          <img width="30px" alt="Google &quot;G&quot; Logo"
                               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                        </div>
                        Login with Google
                      </a>
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
