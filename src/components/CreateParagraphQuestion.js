import React, {useState} from "react";
import {
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateParagraphQuestion(props) {
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
                    <h6 className="fw-bold">Paragraph</h6>
                    <TextField
                        label="Your paragraph"
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

export default CreateParagraphQuestion;