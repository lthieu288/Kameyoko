import React, {useState} from "react";
import {
    TextField,
} from "@mui/material";


function CreateHeadingQuestion(props) {
    return (
        <>

            <form>
                <div className="my-3">
                    <h6 className="fw-bold">Heading</h6>
                    <TextField
                        label="Your heading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                    />
                </div>

                <div className="my-3">
                    <h6 className="fw-bold">Subheading</h6>
                    <TextField
                        label="Your subheading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                    />
                </div>

                <div className="d-grid gap-2">
                    <button
                        className="btn btn-secondary"
                        style={{color: "yellow", marginTop: "30px"}}
                        type="submit"
                    >
                        Create new Slide
                    </button>
                </div>
            </form>
        </>
    );
}

export default CreateHeadingQuestion;