import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinGroup } from "../services/GroupService";
import Swal from "sweetalert2";

function JoinGroup() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const params = useParams();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=join-group/" + params.id);
    } else {
      joinGroup(userInfo?.token, userInfo?.user.id, params?.id).then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "You joined group " + params.id,
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/group/" + params.id);
        } else {
          Swal.fire({
            icon: "error",
            title: res.response.data.message,
          });
          navigate("/");
        }
      });
    }
  }, [localStorage.getItem("currentUser")]);
  return <div>Loading</div>;
}

export default JoinGroup;
