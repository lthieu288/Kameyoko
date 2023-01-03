import React, {useState} from "react";
import {Container} from "react-bootstrap";
import {TextField} from "@mui/material";
import {getListSlide} from "../services/UserService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function ViewForTheHost() {
  const [textValue, setTextValue] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleTextInputChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleClick = () => {
    if (!userInfo) {
        navigate("/login?redirect=result");
    }
    async function getAPIListSlide() {
        return await getListSlide(userInfo.token, textValue).then(
          (res) => {
              if (res.data.slides != null) {
                  navigate("/presentation/public/" + textValue);
              } else {
                  Swal.fire({
                      icon: "error",
                      title: "Invalid code",
                      text: "Check your code again, please",
                  });
              }
          }
      );
    }
    getAPIListSlide();
  };

  return (
    <>
      <Container>
        <div className="name">
          <h2
            style={{
              textAlign: "center",
              fontStyle: "initial",
              fontSize: "50px",
              fontWeight: "600",
            }}
          >
            KAMEYOKO
          </h2>
          <h2
            style={{
              textAlign: "center",
              fontStyle: "initial",
              fontSize: "20px",
            }}
          >
            Please enter the code
          </h2>
        </div>
        <Container className="my-3" style={{ width: "600px" }}>
          <TextField
            label="Code"
            variant="outlined"
            className="form-control"
            type="text"
            aria-valuemax="5"
            size="400px"
            value={textValue}
            onChange={handleTextInputChange}
          />
          <Container style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              style={{ fontSize: "25px" }}
              className="btn btn-primary"
              type="submit"
              onClick={handleClick}
            >
              Submit
            </button>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default ViewForTheHost;
