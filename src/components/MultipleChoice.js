import React from "react"
import {Container} from "react-bootstrap";
import "./multipleChoice.css"

function MultipleChoice(props) {

    return (
        <>
            <Container>
                <div className="name">
                    <h2 style={{
                        textAlign: "center",
                        fontStyle: "initial",
                        fontSize: "50px",
                        fontWeight: "600"
                    }}>KAMEYOKO {props.abc}</h2>
                </div>
                <Container className="multiple-choice" style={{width: "55%", marginTop: "35px"}}>
                    <h2 style={{textAlign: "left", fontStyle: "initial", fontSize: "30px", fontWeight: "600"}}>Multiple
                        Choice</h2>
                    <div className="option">
                        <div className="my-3">
                            <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                <div className="choice">
                                    <label style={{
                                        borderWidth: "2px",
                                        fontSize: "20px",
                                        fontFamily: "MentiText, Arial, sans-serif"
                                    }} className="options">Small Business Owner or Employee
                                        <input type="radio" name="radio"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="choice">
                                    <label style={{
                                        borderWidth: "2px",
                                        fontSize: "20px",
                                        fontFamily: "MentiText, Arial, sans-serif"
                                    }} className="options">Small Business Owner or Employee
                                        <input type="radio" name="radio"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="choice">
                                    <label style={{
                                        borderWidth: "2px",
                                        fontSize: "20px",
                                        fontFamily: "MentiText, Arial, sans-serif"
                                    }} className="options">Small Business Owner or Employee
                                        <input type="radio" name="radio"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Container style={{marginTop: "20px", textAlign: "center"}}>
                            <button style={{fontSize: "25px"}} className="btn btn-primary" type="submit">Submit</button>
                        </Container>
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default MultipleChoice;
