import React, { useEffect } from "react";
import "./group.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/Navbar";

function CreateGroup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=create-group");
    }
  }, [localStorage.getItem("currentUser")]);
  const schema = yup.object().shape({
    name: yup.string().required("Name Group is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const create = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="form-create">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8">
              <form
                onSubmit={handleSubmit(create)}
                className="bg-white  rounded-5 shadow-5-strong p-5"
              >
                <div className="form-outline mb-4">
                  <label className="form-label" for="form1Example1">
                    Name Group
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    className="form-control"
                    {...register("name")}
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Create Group
                </button>
                <button
                  style={{ marginLeft: 10, backgroundColor: "red" }}
                  className="btn btn-primary btn-block"
                >
                  <Link className="nav-link" variant="outline-primary" to="/">
                    Cancel
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateGroup;
