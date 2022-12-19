import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getListSlide, postVote } from "../services/UserService";
import MultipleChoice from "../components/MultipleChoice";

export default function ChoiceQuestion() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [render, setRender] = useState(true);
  const [listSlide, setListSlide] = useState([]);
  const [slide, setSlide] = useState();
  const [number, setNumber] = useState(0);
  const [optionChecked, setOptionChecked] = useState();
  const [payload, setPayload] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getAPIListSlide() {
      const response = await getListSlide(userInfo.token, params.id).then(
        (res) => {
          setListSlide(res.data.slides);
          setSlide(res.data.slides[0]);
        }
      );
      return response;
    }

    getAPIListSlide();
    // setSlide(array[0]);
  }, [render]);

  const handleClick = () => {
    const obj = {
      id: params.id.toString(),
      option: optionChecked.toString(),
      content: slide.content.id.toString(),
    };
    const socket = new WebSocket(`ws://localhost:7777/ws?roomId=${slide.id.toString()}`);
    socket.onopen = function (event) {
      socket.send(JSON.stringify(slide.id.toString()));
      socket.send(JSON.stringify(obj));
      socket.onmessage = (msg) => {
        console.log("we got msg..");
        console.log(msg);
      };
    };
    async function postApiVote() {
      const response = await postVote(
        userInfo.token,
        obj.id,
        obj.content,
        obj.option
      ).then((res) => {
        console.log(res);
      });
      return response;
    }
    postApiVote();
    const num = (number + 1) % listSlide.length;
    if (num === 0) {
      navigate("/result/" + params.id);
    }
    //push to payload
    setPayload((current) => [...current, obj]);
    //next to slide
    setNumber((prev) => (prev + 1) % listSlide.length);

    setSlide(listSlide[num]);
    console.log(num);
  };
  const handleChange = (event) => {
    setOptionChecked(event.target.value);
  };
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
            {slide?.content.title}
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
                {slide?.content.options.map((el, index) => (
                  <div className="choice">
                    <label
                      style={{
                        borderWidth: "2px",
                        fontSize: "20px",
                        fontFamily: "MentiText, Arial, sans-serif",
                      }}
                      className="options"
                    >
                      {el.name}
                      <input
                        type="radio"
                        name="radio"
                        value={el.id}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{ fontSize: "25px" }}
          className="btn btn-primary px-5"
          type="submit"
          onClick={handleClick}
        >
          {number + 1}/{listSlide.length} Next
        </button>
      </Container>
      {/* <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{ fontSize: "25px" }}
          className="btn btn-primary px-5"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </Container> */}
    </>
  );
}
