import React, {useState} from "react";
import {
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {createSlides} from "../services/PresentationService";

function CreateMultipleQuestion(props) {
    const [numberOption, setNumberOption] = useState(3);
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm();
    const savePresentation = async (data) => {
        props.parentRender(true);
        let arrayOption = [];
        if (data.name0 !== undefined  && data.name0 !== '')
            arrayOption.push({"name": data.name0})
        if (data.name1 !== undefined && data.name1 !== '')
            arrayOption.push({"name": data.name1})
        if (data.name2 !== undefined  && data.name2 !== '')
            arrayOption.push({"name": data.name2})
        if (data.name3 !== undefined  && data.name3 !== '')
            arrayOption.push({"name": data.name3})
        if (data.name4 !== undefined  && data.name4 !== '')
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
        </>
    );
}

export default CreateMultipleQuestion;