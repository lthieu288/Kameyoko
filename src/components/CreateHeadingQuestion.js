import React, {useState} from "react";
import {
    TextField,
} from "@mui/material";
import {useForm} from "react-hook-form";
import {createSlides} from "../services/PresentationService";
import Swal from "sweetalert2";


function CreateHeadingQuestion(props) {
    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const savePresentation = async (data) => {
        let objectHeading = {
            "heading": data.heading,
            "sub_heading":data.sub_heading,
            "image":"" }
        let jsonCreateSlide = ({
            "type": 8, "content": {
                "title": "heading title",
                "meta": "heading meta",
                "heading": objectHeading
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

            <form  onSubmit={handleSubmit(savePresentation)} >
                <div className="my-3">
                    <h6 className="fw-bold">Heading</h6>
                    <TextField
                        label="Your heading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        {...register("heading")}
                    />
                </div>

                <div className="my-3">
                    <h6 className="fw-bold">Subheading</h6>
                    <TextField
                        label="Your subheading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        {...register("sub_heading")}
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