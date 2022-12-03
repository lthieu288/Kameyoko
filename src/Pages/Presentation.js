import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
function Presentation() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation");
    }
  }, [userInfo]);
  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <Row className="App">
        <div className="col-2"></div>
        <div className="col-10"></div>
      </Row>
      <Footer />
    </>
  );
}

export default Presentation;
