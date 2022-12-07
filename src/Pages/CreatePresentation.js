import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Slide from "../components/Slide";
import {Row} from "react-bootstrap";
import SlideName from "../components/SlideName";
import CreateQuestion from "../components/CreateQuestion";

const CreatePresentation = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    let [listSlide, setListSlide] = useState([{"type": ""}]);
    useEffect(() => {
        if (!userInfo) {
            navigate("/login?redirect=presentation");
        }
    }, [userInfo]);
    const createNewSlide = () => {
        setListSlide([...listSlide, {type: ""}])
    }
    return (
        <>
            <Navbar username={userInfo ? userInfo.user.username : null}/>
            <div className="App" style={{backgroundColor: "whitesmoke"}}>
                <div className="container py-5">
                    <div className="d-flex justify-content-between bg-white p-3">
                        <button type="button" class="btn btn-outline-primary" onClick={() => navigate("/presentation")}>
                            <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                            Name presentation
                        </button>
                        <div className="form-outline d-flex">
                            <button type="button" class="btn btn-primary" onClick={createNewSlide}>
                                <AddIcon></AddIcon>
                                New slide
                            </button>
                        </div>
                    </div>
                    <Row className="my-3">
                        <div className="col-2">
                            {listSlide?.map((sl) => (
                                <div className="">
                                    <SlideName/>
                                </div>
                            ))}
                        </div>
                        <div className="col-7">
                            <Slide/>
                        </div>
                        <div className="col-3">
                            <CreateQuestion/>
                        </div>
                    </Row>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default CreatePresentation;
