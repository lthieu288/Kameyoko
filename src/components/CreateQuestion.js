import React, { useState} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "./Slide";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {createSlides} from "../services/PresentationService";
import {useNavigate} from "react-router-dom";
import CreateMultipleQuestion from "./CreateMultipleQuestion";

let createSlide = {
    "type": 1, "content": {
        "title": "",
        "meta": "your meta",
        "options": []
    }
}

function CreateQuestion(props) {
    const [typeSlide,setTypeSlide] = useState(1)

    const _handleChange = (event) => {
        setTypeSlide(event.target.value)
        console.log("CreateQuestion")
        console.log(event.target.value)
    }
    return (
        <>
            <div className="col-7">
                <Slide data={createSlide} id={props.id} check={true}/>
            </div>
            <div className="col-3">
                <div
                    className="bg-white p-3"
                    style={{borderRadius: "10px", minHeight: "75vh"}}
                >
                    <div className="list-group">
                        <h6 className="fw-bold mb-3">Slide type</h6>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Popular question type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Popular question type"
                                onChange={e =>{_handleChange(e)}}
                            >
                                <MenuItem value={1}  >Multiple choice</MenuItem>
                                <MenuItem value={2}>Paragraph</MenuItem>
                                <MenuItem value={3}>Heading</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <CreateMultipleQuestion idSlide={props.idSlide}/>
                </div>
            </div>
        </>
    );
}

export default CreateQuestion;