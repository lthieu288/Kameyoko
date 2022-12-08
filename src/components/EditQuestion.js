import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import Slide from "./Slide";
import {useNavigate, useParams} from "react-router-dom";
import { updateSlide} from "../services/PresentationService";
import Swal from "sweetalert2";

let createSlide = {
    "type": 1, "content": {
        "title": "",
        "meta": "your meta",
        "options": []
    }
}

function EditQuestion(props) {
    const [numberOption, setNumberOption] = useState(0);
    const [listOption, setListOption] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
    const {id} = useParams();
    let [option, setOption] = useState([{
        "id": 1,
        "name": "ab"
    }]);

    useEffect(() => {
        setNumberOption(props?.options?.length)
        setListOption(props.options)
    }, [props.options]);

    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm({});

    for (let i = 0; i < numberOption; i++) {
        for (let j = 0; j < option.length; j++) {
            if (listOption[i].id === option[j].id) {
                listOption[i] = option[j]
            }
        }
    }
    const savePresentation = async (data) => {
        let jsonCreateSlide = ({
            "type": 1, "content": {
                "title": data.title,
                "meta": "slide 6 meta changed",
                "options": listOption
            }
        })
        createSlide = jsonCreateSlide;
        await updateSlide(jsonCreateSlide, userInfo.token, id, props.id, props.idContent).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Update Slide successfully",
                    showConfirmButton: false,
                });
                navigate("/presentation");
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
                <Slide data={props?.options} id={props.id}/>
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
                            label={props?.title}
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
                                    label={props?.options?.at(index)?.name}
                                    variant="outlined"
                                    className="form-control"
                                    size="small"
                                    onChange={e => (setOption([...option, {
                                        "id": props?.options?.at(index)?.id,
                                        "name": e.target.value
                                    }]))}
                                />

                            </div>
                        ))}
                    </div>
                    <div className="d-grid gap-2">

                    </div>
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-secondary"
                            style={{color: "red", marginTop: "30px"}}
                            type="submit"
                        >
                            Update Slide
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditQuestion;

