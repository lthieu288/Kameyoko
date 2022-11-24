import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section class="vh-100 bg-image">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <form>
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">KAMEYOKO</h2>
                    <div class="form-outline mb-4">
                      <TextField
                        label="Username"
                        type="text"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div class="form-outline mb-4">
                      <TextField
                        label="Password"
                        type="password"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-5 fw-bold"
                      >
                        Sign in
                      </button>
                    </div>
                    <hr class="my-4" />
                    <div class="form-outline mb-4 d-flex justify-content-center">
                      <Button variant="outlined" color="error">
                        <i class="fab fa-google"></i> Continue with Google
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p class="mb-0 text-black center">
                        Don't have an account?{" "}
                        <Link to="/register" class="text-black-50 fw-bold">
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
