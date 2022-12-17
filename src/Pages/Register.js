import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import request from "../utils/request";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    fullname: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    Password: yup
      .string()
      .min(8)
      .max(20)
      .required("Password at least 8 characters"),
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

  function handleSubmitRegister(user) {
    const userInfo = {
      username: user.username,
      password: user.Password,
      email: user.email,
      fullname: user.fullname,
    };
    async function getPost() {
      await request
        .post("auth/register", userInfo)
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Register successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/login");
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
  }

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit(handleSubmitRegister)}>
                    <div className="form-outline mb-4">
                      <TextField
                        {...register("fullname")}
                        label="Fullname"
                        variant="outlined"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.fullname?.message}</p>
                    </div>

                    <div className="form-outline mb-4">
                      <TextField
                        {...register("username")}
                        label="Username"
                        type="text"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.username?.message}</p>
                    </div>

                    <div className="form-outline mb-4">
                      <TextField
                        {...register("email")}
                        label="Your Email"
                        type="email"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.email?.message}</p>
                    </div>

                    <div className="form-outline mb-4">
                      <TextField
                        {...register("Password")}
                        label="Password"
                        type="password"
                        className="form-control form-control-lg"
                      />
                      <p className="text-danger">{errors.Password?.message}</p>
                    </div>

                    <div className="form-outline mb-4">
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

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body px-5 fw-bold"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-3 mb-0">
                      Have already an account?
                      <Link to="/login" className="fw-bold text-body">
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
