import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroup } from "../services/auth";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
function CreateGroup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=create-group");
    }
  }, [localStorage.getItem("currentUser")]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const schema = yup.object().shape({
    name: yup.string().required("Name group is required"),
    link: yup.string().required("Link group is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const create = async (data) => {
    let group = {
      name: data.name,
      link: data.link,
      desc: data.desc,
    };
    await createGroup(group, currentUser.token).then((response) => {
      console.log(response.status);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Create group successfully",
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="form-create gradient-custom-3"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8">
              <form
                onSubmit={handleSubmit(create)}
                className="bg-white  rounded-5 shadow-5-strong p-5 m-5"
              >
                <h4 className="text-center mb-3">Create New Group</h4>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example1">
                    Name Group
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    className="form-control"
                    {...register("name")}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.name?.message}
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example1">
                    Link group
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    className="form-control"
                    {...register("link")}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.link?.message}
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example1">
                    Description
                  </label>
                  <input
                    type="text"
                    id="form1Example1"
                    className="form-control"
                    {...register("desc")}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-secondary mx-3"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-block">
                    Create Group
                  </button>
                </div>
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
