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
import {useParams} from "react-router-dom";
import {updateSlide} from "../services/PresentationService";
import Swal from "sweetalert2";

let createSlide = {
    "type": 1, "content": {
        "title": "",
        "meta": "your meta",
        "options": []
    }
}

function EditMultipleQuestion(props) {
    const [numberOption, setNumberOption] = useState(0);
    const [title, setTitle] = useState("");

    const [listOption, setListOption] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const {id} = useParams();
    let [option, setOption] = useState([{
        "id": 1,
        "name": "ab"
    }]);
    useEffect(() => {
        setNumberOption(props?.options?.length)
        setTitle(props?.title)
        setListOption(props.options)
    }, [props.options, props.render]);

    const {
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
                "title": title,
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
                setOption([])
                setListOption([])
                props.parentRender(true);
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
            <form
                onSubmit={handleSubmit(savePresentation)}
            >
                <div className="my-3">
                    <h6 className="fw-bold">Question</h6>
                    <TextField
                        value={title}
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        onChange={e => (setTitle(e.target.value))}
                    />
                </div>
                <div className="my-3">
                    <h6 className="fw-bold">Options</h6>
                    {props.options?.map((value, index) => (
                        <div key={index} className="d-flex mb-2">
                            <input
                                className="form-control"
                                size="small"
                                value={props.options?.at(index).name}
                                onChange={e => (setOption([...option, {
                                    "id": props?.options?.at(index)?.id,
                                    "name": e.target.value
                                }]))}
                            />
                        </div>
                    ))}
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
        </>
    );
}

export default EditMultipleQuestion;

