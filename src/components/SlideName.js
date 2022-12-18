import React from "react";
import Card from "react-bootstrap/Card";

function SlideName() {
    return (
        <div
            className=" bg-white p-3"
            style={{borderRadius: "10px", minHeight: "200px"}}
            // style={{ borderRadius: "10px", minHeight: "75vh" }}
        >

            <div className="d-grid gap-2">
                <Card.Img
                    variant="top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/1200px-Blue_question_mark_icon.svg.png?fbclid=IwAR2XnW1C-TVMsohYMOmiErIFBGufYe9OcON9SOLcrPRs2TyWBGB5Kvr_u1k"
                    style={{
                        width: "100%",
                        height: "8rem",
                    }}
                />
                {/*<button className="btn btn-primary" type="button">*/}
                {/*  Button*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default SlideName;
