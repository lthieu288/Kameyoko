import React from "react";
import img from "../images.png";
import Swal from "sweetalert2";
import { ediUserRoleGroup} from "../services/auth";
import {
  useNavigate,
} from 'react-router-dom';
function GroupMemberDetail(props) {

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const role = props.role === "co-owner" ? "member" : "co-owner";
  const handleChangeRole = async () => {
    Swal.fire({
      title: "Do you want to assign this user to " + role + "?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Assign",
    }).then( async (result) => {
      if (result.isConfirmed) {
        let idRole;
        role ==="co-owner" ? idRole = 2 : idRole=3;
        await ediUserRoleGroup(currentUser.data.token,props.idgroup,props.id,idRole).then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Assign successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate("/groups/"+props.idgroup)
          } else {
            Swal.fire({
              icon: "error",
              title: response.message,
            });
          }
        })
      }
    });
  }
  return (
    <div className="container bg-white py-3">
      <div className="text-center">
        <img
          src={img}
          className="rounded"
          style={{ height: "100px" }}
          alt="Cinque Terre"
        />
      </div>
      <h4 className="text-center my-2">{props.username}</h4>
      <div className="text-center">
        <button
          type="button"
          class="btn btn-primary px-5"
          onClick={handleChangeRole}
          disabled={props.role === "owner" ? true : false}
        >
          {props.role}
        </button>
      </div>
      <hr />
    </div>
  );
}

export default GroupMemberDetail;
