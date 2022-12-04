import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Slide from "../components/Slide";
import { Row } from "react-bootstrap";
import SlideName from "../components/SlideName";
import CreateQuestion from "../components/CreateQuestion";

function CreatePresentation() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [listSlide, setListSlide] = useState([<SlideName />]);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation");
    }
  }, [userInfo]);

  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <div className="App" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container py-5">
          <div className="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-primary">
              <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              Name presentation
            </button>
            <div className="form-outline d-flex">
              <button type="button" class="btn btn-primary">
                <AddIcon></AddIcon>
                New slide
              </button>
            </div>
          </div>
          <Row className="my-3">
            <div className="col-2">
              {listSlide.map((sl) => (
                <div className="">{sl}</div>
              ))}
            </div>
            <div className="col-7">
              <Slide />
            </div>
            <div className="col-3">
              <CreateQuestion />
            </div>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreatePresentation;
