import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {getListSlide, postVote} from "../services/UserService";
import ButtonComponent from "../components/ButtonComponent";
import Paragraph from "../components/Paragraph";
import Heading from "../components/Heading";
import Slide from "../components/Slide";
import CloseButton from "react-bootstrap/CloseButton";
import Slide2 from "../components/Slide2";
import Chat from "./Chat";
import Question from "../components/Question";

export default function ChoiceQuestion(props) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [listSlide, setListSlide] = useState([]);
  const [slide, setSlide] = useState();
  const [number, setNumber] = useState(0);
  const [contentSlide, setContentSlide] = useState();
  const [type,setType] = useState()
  const params = useParams();

  useEffect(() => {
    async function getAPIListSlide() {
      return await getListSlide(userInfo.token, params.id).then(
          (res) => {
            setListSlide(res.data.slides);
              let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);

              socket.onopen = function () {
                socket.send(res.data.slides[0].id)
                socket.onmessage = (msg) => {
                    setType(JSON.parse(msg.data).type)
                    setContentSlide(JSON.parse(msg.data).content)
                    setSlide(JSON.parse(msg.data));
                };
            };
          }
      );
    }
    getAPIListSlide();
  }, []);

  function saveVote(value){
      if(listSlide[number].id !== undefined) {
          const socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
          socket.onopen = function () {
              socket.send(slide.id)
          };
      }
      async function postApiVote() {
          return await postVote(
            userInfo.token,
            params.id.toString(),
            slide.content.id,
            value
        ).then((res) => {
            console.log(res);
        });
      }
      postApiVote();
      const socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
      socket.onopen = function () {
          socket.send(slide.id)
      };
  }

  const handleChange = (event) => {
      saveVote(event.target.value)
  };
  return (
    <>
      <CloseButton className="button-cancel" onClick={()=>{navigate("/")}} />
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
        <div style={{height:"420px" }}>
            {
                type === 1 ?
                    <>
                        <div className="row">
                            <div className="col-4">
                                <Slide data={contentSlide?.options} check={false}/>
                            </div>
                            <div className="col-5">
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
                                                {contentSlide.options.map((el) => (
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
                            </div>
                            <div className="col-3">
                                <Chat id={params.id}></Chat>
                            </div>
                        </div>
                    </>
                    :
                    type === 9 ?
                        <div className="row">
                            <div className="col-9">
                                <Paragraph  paragraph={contentSlide}/>
                            </div>
                            <div className="col-3">
                                <Chat id={params.id}></Chat>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-9">
                                <Heading heading={contentSlide}/>
                            </div>
                            <div className="col-3">
                                <Chat id={params.id}></Chat>
                            </div>
                        </div>


            }
        </div>
      </Container>
        <Container style={{textAlign: "center" , marginTop:"80px"}}>
            <div className="row py-5" style={{marginTop:"20px"}}>
                <Question id={params.id} role="member"></Question>
            </div>
        </Container>
      {/*<Container style={{ marginTop: "20px", textAlign: "center" }}>*/}
      {/*  <ButtonComponent name={"Prev"} parentPrevClick={handleClickPrev} disable={checkPrevDisable}/>*/}
      {/*  <ButtonComponent name={"Next"} parentNextClick={handleClickNext} disable={checkNextDisable}/>*/}
      {/*</Container>*/}
    </>
  );
}
