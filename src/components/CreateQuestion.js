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

let createSlide = {
    "type": 1, "content": {
        "title": "",
        "meta": "your meta",
        "options": []
    }
}

function CreateQuestion(props) {
    const [numberOption, setNumberOption] = useState(3);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm();
    const savePresentation = async (data) => {
        props.parentCallback(true);
        props.parentRender(true);
        let arrayOption = [];
        if (data.name0 !== undefined)
            arrayOption.push({"name": data.name0})
        if (data.name1 !== undefined)
            arrayOption.push({"name": data.name1})
        if (data.name2 !== undefined)
            arrayOption.push({"name": data.name2})
        if (data.name3 !== undefined)
            arrayOption.push({"name": data.name3})
        if (data.name4 !== undefined)
            arrayOption.push({"name": data.name4})
        let jsonCreateSlide = ({
            "type": 1, "content": {
                "title": data.title,
                "meta": "your meta",
                "options": arrayOption
            }
        })
        await createSlides(jsonCreateSlide, userInfo.token, props.idSlide).then((response) => {
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Create Slide successfully",
                    showConfirmButton: false,
                });
                navigate("/presentation")
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.message,
                });
            }
        });
    }

    return (
        <>
            <div className="col-7">
                <Slide data={createSlide} id={props.id}/>
            </div>
            <div className="col-3">
                <form
                    className="bg-white p-3"
                    style={{borderRadius: "10px", minHeight: "75vh"}}
                    onSubmit={handleSubmit(savePresentation)}
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
                            >
                                <MenuItem value={1}>Multiple choice</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="my-3">
                        <h6 className="fw-bold">Question</h6>
                        <TextField
                            label="Your question"
                            variant="outlined"
                            className="form-control"
                            size="medium"
                            {...register("title")}
                        />
                    </div>
                    <div className="my-3">
                        <h6 className="fw-bold">Options</h6>
                        {new Array(numberOption).fill(0).map((_, index) => (
                            <div key={index} className="d-flex mb-2">
                                <TextField
                                    label={"Option " + index}
                                    variant="outlined"
                                    className="form-control"
                                    size="small"
                                    {...register("name" + index)}
                                />

                                <button

                                    style={{border: "none", backgroundColor: "white"}}
                                    type="button"
                                    onClick={() => {
                                        setNumberOption(numberOption - 1);
                                    }}
                                >
                                    <DeleteIcon className=""></DeleteIcon>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="d-grid gap-2">
                        {
                            numberOption === 5 ?
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    disabled
                                >
                                    <AddIcon></AddIcon>
                                    Add option
                                </button>

                                :
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    onClick={() => {
                                        setNumberOption(numberOption + 1);
                                    }}
                                >
                                    <AddIcon></AddIcon>
                                    Add option
                                </button>

                        }

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
            </div>
        </>
    );
}

export default CreateQuestion;