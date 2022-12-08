import React from "react";
import { Container } from "react-bootstrap";
import "./multipleChoice.css";

function MultipleChoice(props) {
  console.log(props);
  if (!props.slide) return <div></div>;
  return (
    <>
      <Container>
        <div className="name">
          <h1
            style={{
              textAlign: "center",
              fontStyle: "initial",
              fontWeight: "600",
            }}
          >
            KAMEYOKO
          </h1>
        </div>
        <div className="name">
          <h3
            style={{
              textAlign: "center",
              fontStyle: "initial",
              fontWeight: "600",
            }}
          >
            {props.slide.content.title}
          </h3>
        </div>
        <Container
          className="multiple-choice"
          style={{ width: "55%", marginTop: "35px" }}
        >
          <h2
            style={{
              textAlign: "left",
              fontStyle: "initial",
              fontSize: "30px",
              fontWeight: "600",
            }}
          >
            Multiple Choice
          </h2>
          <div className="option">
            <div className="my-3">
              <div
                className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3"
                id="options"
              >
                <div className="choice">
                  <label
                    style={{
                      borderWidth: "2px",
                      fontSize: "20px",
                      fontFamily: "MentiText, Arial, sans-serif",
                    }}
                    className="options"
                  >
                    {props.slide.content.options[0].name}
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="choice">
                  <label
                    style={{
                      borderWidth: "2px",
                      fontSize: "20px",
                      fontFamily: "MentiText, Arial, sans-serif",
                    }}
                    className="options"
                  >
                    {props.slide.content.options[1].name}
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="choice">
                  <label
                    style={{
                      borderWidth: "2px",
                      fontSize: "20px",
                      fontFamily: "MentiText, Arial, sans-serif",
                    }}
                    className="options"
                  >
                    Small Business Owner or Employee
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default MultipleChoice;
