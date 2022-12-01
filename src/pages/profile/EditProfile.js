import React, { useState, useEffect } from "react";
import "./profile.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=create-group");
    }
  }, [localStorage.getItem("currentUser")]);
  const schema = yup.object().shape({
    username: yup.string().required("User Name is required"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const editProfile = (data) => {
    console.log(data);
  };

  const [image, setImage] = useState("");

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
  return (
    <div className="mt-0 mb-4 container" style={{ paddingTop: "30px" }}>
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {image === "" ? (
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
              ) : (
                <img
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
              <form onSubmit={handleSubmit(editProfile)}>
                <div className="mb-3">
                  <label className="small mb-1" for="inputUsername">
                    Username (how your name will appear to other users on the
                    site)
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    defaultValue="username"
                    {...register("username")}
                  />
                  <p className="error">{errors.username?.message}</p>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" for="inputFirstName">
                      First name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      defaultValue="Valerie"
                      {...register("firstname")}
                    />
                    <p className="error">{errors.firstname?.message}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" for="inputLastName">
                      Last name
                    </label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      defaultValue="Luna"
                      {...register("lastname")}
                    />
                    <p className="error">{errors.lastname?.message}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" for="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    value="Khanh@gmail.com"
                    disabled
                  />
                </div>
                <button className="btn btn-primary" type="submit" style={{}}>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
