import React, { useEffect, useState } from "react";
import Slide2 from "../components/Slide2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListSlide } from "../services/UserService";
import ButtonComponent from "../components/ButtonComponent";
import { Container } from "react-bootstrap";
import Chat from "./Chat";
import Question from "../components/Question";
import {getPresentation} from "../services/PresentationService";
import CloseButton from "react-bootstrap/CloseButton";

function Result() {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const params = useParams();
  const [listSlide, setListSlide] = useState([]);
  const [listSlideSocket, setListSlideSocket] = useState([]);
  const [checkNextDisable, setCheckNextDisable] = useState(false)
  const [checkPrevDisable, setCheckPrevDisable] = useState(false)
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=result/public/" + params.id);
    }
    setCheckPrevDisable(true)
    getPresentation(userInfo.token,  params.id).then((response) =>{
        if (response.data !== null){
          if (response.data.data.owner.id.toString() !==  userInfo.user.id.toString()) {
            navigate("/login?redirect=result/public/" + params.id);
          }
        }
      });
    getListSlide(userInfo.token, params.id).then(
          (res) => {
            setListSlide(res.data.slides);
            if(1 === res.data.slides.length){
              setCheckNextDisable(true)
            }
            let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
            socket.onopen = function () {
              socket.send(res.data.slides[0].id)
              socket.onmessage = (msg) => {
                setListSlideSocket(JSON.parse(msg.data));
                  console.log(msg)
              };
            };
          }
      );

  }, []);

  const nextButton = ()=> {
    setCheckPrevDisable(false)
    const num = (number + 1);
    setNumber(number + 1);
    if(listSlide[num].id !== undefined) {
      let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
      socket.onopen = function () {
        socket.send(listSlide[num].id)
        socket.onmessage = (msg) => {
          setListSlideSocket(JSON.parse(msg.data));
        };
      };
    }
    if(num +1 === listSlide.length){
      setCheckNextDisable(true)
      setCheckPrevDisable(false)
    }
  }
  const prevButton = () => {
    setCheckNextDisable(false);
    const numPrev = number - 1;
    setNumber(number - 1);
    if (listSlide[numPrev].id !== undefined) {
      let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
      socket.onopen = function () {
        socket.send(listSlide[numPrev].id);
        socket.onmessage = (msg) => {
          setListSlideSocket(JSON.parse(msg.data));
        };
      };
    }
    if (numPrev - 1 === -1) {
      setCheckPrevDisable(true);
      setCheckNextDisable(false);
    }
  };
  const leaveShowSlide = () => {
    let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
      socket.onopen = function () {
        socket.send("123456")
        socket.onmessage = (msg) => {
          setListSlideSocket(JSON.parse(msg.data));
          console.log(JSON.parse(msg.data))
        };
      };
  };

  return (
    <div>
      <CloseButton className="button-cancel" onClick={()=>{leaveShowSlide()}} />
      <div style={{textAlign:"center" , fontSize:"25px" , fontWeight:"regular"}}>
        <div>
          Go to
          <span className="fw-bold" style={{ marginLeft: "10px" }}>
            <Link
              style={{ color: "rgb(37, 43, 54)", fontWeight: "700" }}
              to={"/view-host"}
            >
              https://kameyoko-lime.vercel.app/view-host
            </Link>
          </span>
          <span> use the code </span>
          <span style={{ color: "rgb(37, 43, 54)", fontWeight: "700" }}>
            {params.id}
          </span>
        </div>
      </div>
      <div className="p-3" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-9">
            <Slide2
              token={userInfo.token}
              id={params.id}
              listSlide={listSlideSocket}
            />
          </div>
          <div className="col-3">
            <Chat id={params.id}></Chat>
          </div>
        </div>
      </div>
      <Container style={{textAlign: "center" }}>
        <ButtonComponent
          name={"Prev"}
          parentPrevClick={prevButton}
          disable={checkPrevDisable}
        />
        <ButtonComponent
          name={"Next"}
          parentNextClick={nextButton}
          disable={checkNextDisable}
        />
      </Container>
      <Container style={{textAlign: "center" }}>
        <div className="row py-5">
          <Question id={params.id} role="owner" style={{padding:"20px"}}></Question>
        </div>
      </Container>
    </div>
  );
}

export default Result;
