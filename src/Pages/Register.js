import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import request from "../utils/request";

function Register() {
  const schema = yup.object().shape({
    fullname: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    Password: yup
      .string()
      .min(4)
      .max(20)
      .required("Password at least 4 characters"),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords Don't Match")
      .required("Repeat password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleSubmitRegister(data) {
    console.log(data);
    const userInfo = {
      username: data.username,
      password: data.Password,
      email: data.email,
      fullname: data.fullname,
    };
    async function getPost() {
      const response = await request.post("auth/register", userInfo);
      console.log(response.data);
    }
    getPost();
  }

  return (
    <section class="vh-100 bg-image">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit(handleSubmitRegister)}>
                    <div class="form-outline mb-4">
                      <TextField
                        {...register("fullname")}
                        label="Fullname"
                        variant="outlined"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.fullname?.message}</p>
                    </div>

                    <div class="form-outline mb-4">
                      <TextField
                        {...register("username")}
                        label="Username"
                        type="text"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.username?.message}</p>
                    </div>

                    <div class="form-outline mb-4">
                      <TextField
                        {...register("email")}
                        label="Your Email"
                        type="email"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.email?.message}</p>
                    </div>

                    <div class="form-outline mb-4">
                      <TextField
                        {...register("Password")}
                        label="Password"
                        type="password"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.Password?.message}</p>
                    </div>

                    <div class="form-outline mb-4">
                      <TextField
                        {...register("repeat_password")}
                        label="Repeat your password"
                        type="password"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">
                        {errors.repeat_password?.message}
                      </p>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="submit"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <Link to="/login" class="fw-bold text-body">
                        <u> Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
