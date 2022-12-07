import React from "react"
import {Container} from "react-bootstrap";
import {
    TextField,
} from "@mui/material";

function ViewForTheHost() {

    return (
        <>
            <Container>
                <div className="name">
                    <h2 style={{
                        textAlign: "center",
                        fontStyle: "initial",
                        fontSize: "50px",
                        fontWeight: "600"
                    }}>KAMEYOKO</h2>
                    <h2 style={{textAlign: "center", fontStyle: "initial", fontSize: "20px"}}>Please enter the code</h2>
                </div>
                <Container className="my-3" style={{width: "600px"}}>
                    <TextField
                        label="Code"
                        variant="outlined"
                        className="form-control"
                        type="number"
                        aria-valuemax="5"
                        size="400px"
                    />
                    <Container style={{marginTop: "20px", textAlign: "center"}}>
                        <button style={{fontSize: "25px"}} className="btn btn-primary" type="submit">Submit</button>
                    </Container>
                </Container>

            </Container>
        </>
    );
}

export default ViewForTheHost;
