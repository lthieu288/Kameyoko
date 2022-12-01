import React from "react";
import img from "../images.png";
import Swal from "sweetalert2";

function GroupMemberDetail(props) {
  console.log(props);
  const role = props.role === "co-owner" ? "member" : "co-owner";
  function handleChangeRole() {
    Swal.fire({
      title: "Do you want to assign this user to " + role + "?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Assign",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Assign successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
