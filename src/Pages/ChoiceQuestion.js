import React, {Component, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import MultipleChoice from "../components/MultipleChoice";

export default function ChoiceQuestion() {
    const [name, setName] = useState("abc")

    function clickButton() {
        setName("bcđcdcdcd")
    }

    useEffect(() => {
        setName(name);
    }, [name]);

    return (
        <div>
            <MultipleChoice abc={name}/>
            <Container>
                <Container className="multiple-choice" style={{width: "55%", marginTop: "35px"}}>
                    <button style={{fontSize: "15px", backgroundColor: "red", marginLeft: "auto", marginRight: "80%"}}
                            className="btn btn-primary" type="submit">Prev
                    </button>
                    <button style={{fontSize: "15px", backgroundColor: "red", marginRight: "auto", right: "auto"}}
                            className="btn btn-primary" type="submit" onClick={clickButton}>Next
                    </button>
                </Container>
            </Container>
        </div>
    );
}