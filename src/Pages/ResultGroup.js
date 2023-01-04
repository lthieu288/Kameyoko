import React, {useEffect, useState} from "react";
import Slide2 from "../components/Slide2";
import { useNavigate, useParams} from "react-router-dom";
import {getListSlide} from "../services/UserService";
import ButtonComponent from "../components/ButtonComponent";
import {Container} from "react-bootstrap";
import {getPresentation} from "../services/PresentationService";

function ResultGroup() {
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
                    let socket = new WebSocket(`ws://localhost:7777/ws?presId=${params.id}`);
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
            let socket = new WebSocket(`ws://localhost:7777/ws?presId=${params.id}`);
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
            let socket = new WebSocket(`ws://localhost:7777/ws?presId=${params.id}`);
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
            <Slide2 token={userInfo?.token} id={params.id} listSlide={listSlideSocket}/>
            <Container style={{ marginTop: "20px",textAlign: "center" }}>
                <ButtonComponent name={"Prev"} parentPrevClick={prevButton} disable={checkPrevDisable}/>
                <ButtonComponent name={"Next"} parentNextClick={nextButton} disable={checkNextDisable}/>
            </Container>
        </div>
    );
}

export default ResultGroup;
