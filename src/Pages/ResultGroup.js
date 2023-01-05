import React, {useEffect, useState} from "react";
import Slide2 from "../components/Slide2";
import { useNavigate, useParams} from "react-router-dom";
import {getListSlide} from "../services/UserService";
import ButtonComponent from "../components/ButtonComponent";
import {Container} from "react-bootstrap";
import {getPresentation} from "../services/PresentationService";
import Chat from "./Chat";
import Question from "../components/Question";

function ResultGroup(props) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const params = useParams();
    const [listSlide, setListSlide] = useState([]);
    const [listSlideSocket, setListSlideSocket] = useState([]);
    const [checkNextDisable, setCheckNextDisable] = useState(false)
    const [checkPrevDisable, setCheckPrevDisable] = useState(false)
    const [number, setNumber] = useState(0);

    function checkIndexElementInList(list,index){
        for(let i=0;i<list.length;i++){
            if(list[i].id === index)
                return i;
        }
    }
    useEffect(() => {
        if (!userInfo) {
            navigate("/login?redirect=result/group/" + params.id);
        }
        setCheckPrevDisable(true)
        if(params?.idGroup === undefined ){
            getPresentation(userInfo?.token, params?.id).then((res) => {
                if(res.data.data.owner.id !== userInfo.user.id)
                    navigate("/login?redirect=result/group/" + params.id);
            });
        }
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
                            setNumber(checkIndexElementInList(res.data.slides,JSON.parse(msg.data).id))
                        };
                    };
                }
        );

    }, []);

    const nextButton = () => {
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
    };
    const prevButton = () => {
        setCheckNextDisable(false)
        const numPrev = (number - 1);
        setNumber(number - 1);
        if(listSlide[numPrev].id !== undefined) {
            let socket = new WebSocket(`ws://kameyoko.up.railway.app/ws?roomId=${params.id}`);
            socket.onopen = function () {
                socket.send(listSlide[numPrev].id)
                socket.onmessage = (msg) => {
                    setListSlideSocket(JSON.parse(msg.data));
                };
            };
        }
        if(numPrev -1  === -1){
            setCheckPrevDisable(true)
            setCheckNextDisable(false)
        }
    };

    return (
        <div>
            <div className="p-3" style={{ width: "100%" }}>
                <div className="row">
                    <div className="col-9">
                        <Slide2 token={userInfo?.token} id={params.id} listSlide={listSlideSocket}/>
                    </div>
                    <div className="col-3">
                        <Chat id={params?.id} idGroup={params?.idGroup}></Chat>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center" }}>
                <ButtonComponent name={"Prev"} parentPrevClick={prevButton} disable={checkPrevDisable}/>
                <ButtonComponent name={"Next"} parentNextClick={nextButton} disable={checkNextDisable}/>
            </div>
            <Container style={{textAlign: "center" }}>
                <div className="row py-5">
                    {
                        props?.role === undefined?
                            <Question id={params.id} role="owner"></Question>
                            :
                            <Question id={params.id} role={props.role}></Question>
                    }
                </div>
            </Container>
        </div>
    );
}

export default ResultGroup;
