import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JoinGroup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=groups/");
    }
  }, [localStorage.getItem("currentUser")]);
  return <div>JoinGroup</div>;
}

export default JoinGroup;
