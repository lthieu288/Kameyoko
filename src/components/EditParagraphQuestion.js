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

function EditParagraphQuestion(props) {
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    const {id} = useParams();
    const [heading,setHeading]=useState("")
    const [text,setText] = useState("")
    const [idParagraph,setIdParagraph] = useState(0);

    useEffect(()=>{
        setHeading(props?.content?.paragraph?.heading)
        setIdParagraph(props?.content?.paragraph?.id)
        setText(props?.content?.paragraph?.text)
    },[props.content])
    const {
        handleSubmit,
        formState: {},
    } = useForm({});

    const savePresentation = async () => {
        let jsonCreateSlide = ({
            "type": 9, "content": {
                "title": "slide title changed",
                "meta": "paragraph content meta changed",
                "paragraph": {
                    "id": idParagraph,
                    "heading": heading,
                    "text": text,
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
                        value={heading}
                        onChange={(e)=>{setHeading(e.target.value)}}
                    />
                </div>

                <div className="my-3">
                    <h6 className="fw-bold">Paragraph</h6>
                    <TextField
                        label="Your paragraph"
                        variant="outlined"
                        className="form-control"
                        size="medium"
                        value={text}
                        onChange={(e)=>{setText(e.target.value)}}
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

export default EditParagraphQuestion;

