import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {updateSlide} from "../services/PresentationService";
import Swal from "sweetalert2";

function EditHeadingQuestion(props) {
    const {id} = useParams();
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const [subHeading,setSubHeading]=useState("")
    const [idHeading,setIdHeading] = useState(0);
    const [headingText,setHeading] = useState("")
    const {
        handleSubmit,
        formState: {},
    } = useForm({});

    useEffect(()=>{
        setSubHeading(props?.content?.heading?.sub_heading)
        setHeading(props?.content?.heading?.heading)
        setIdHeading(props?.content?.heading?.id)
    },[props.content])

    const savePresentation = async () => {
        let jsonCreateSlide = ({
            "type": 8, "content": {
                "title": "new heading title",
                "meta":  "slide meta changed",
                "heading": {
                    "id": idHeading,
                    "heading": headingText,
                    "sub_heading": subHeading,
                    "image": "gimme a url"
                },
            }
        })
        await updateSlide(jsonCreateSlide, userInfo.token, id, props.id, props.idContent).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Update Slide successfully",
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
                    <h6 className="fw-bold">Heading</h6>
                    <TextField
                        label="Your heading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        value={headingText}
                        onChange={(e)=>{setHeading(e.target.value)}}
                    />
                </div>

                <div className="my-3">
                    <h6 className="fw-bold">Subheading</h6>
                    <TextField
                        label="Your subheading"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        value={subHeading}
                        onChange={(e)=>{setSubHeading(e.target.value)}}
                    />
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

export default EditHeadingQuestion;

