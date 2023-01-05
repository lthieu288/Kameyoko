import React, {useEffect, useState} from "react";
import Slide2 from "../components/Slide2";
import { useNavigate, useParams } from "react-router-dom";
import { getListSlide } from "../services/UserService";
import ButtonComponent from "../components/ButtonComponent";
import { Container } from "react-bootstrap";
import Question from "../components/Question";
import Chat from "./Chat";

function ResultPublic() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const params = useParams();
  const [listSlideSocket, setListSlideSocket] = useState([]);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=result/" + params.id);
    }
    async function getAPIListSlide() {
      return await getListSlide(userInfo.token, params.id).then((res) => {
        let socket = new WebSocket(
          `ws://kameyoko.up.railway.app/ws?roomId=${params.id}`
        );
        socket.onopen = function () {
          socket.send(res.data.slides[0].id);
          socket.onmessage = (msg) => {
            setListSlideSocket(JSON.parse(msg.data));
          };
        };
      });
    }
    getAPIListSlide();
  }, []);

  return (
    <div className="p-5" style={{ width: "100%" }}>
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
      <div className="row py-5">
        <Question id={params.id} role="member"></Question>
      </div>
    </div>
  );
}

export default ResultPublic;
