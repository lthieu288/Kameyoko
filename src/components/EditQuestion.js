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
import { updateSlide} from "../services/PresentationService";
import Swal from "sweetalert2";
import EditMultipleQuestion from "./EditMultipleQuestion";
import CreateMultipleQuestion from "./CreateMultipleQuestion";
import CreateParagraphQuestion from "./CreateParagraphQuestion";
import CreateHeadingQuestion from "./CreateHeadingQuestion";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import EditParagraphQuestion from "./EditParagraphQuestion";
import EditHeadingQuestion from "./EditHeadingQuestion";

function EditQuestion(props) {

    const callFunctionRender = () => {
        props.parentRender(true);
    };
    return (
        <>
            <div className="col-7">
                {
                    props.typeSlide === 1 ?
                        <Slide data={props?.options} id={props.id} check={false}/>
                        :
                        props.typeSlide === 9 ?
                            <Paragraph  paragraph={props?.content}/>
                            :
                            <h2>
                                <Heading heading={props?.content}/>
                            </h2>
                }
            </div>
            <div className="col-3">
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
                            value={props.typeSlide ? props.typeSlide : ""}
                        >
                            <MenuItem value={1}>Multiple choice</MenuItem>
                            <MenuItem value={9}>Paragraph</MenuItem>
                            <MenuItem value={8}>Heading</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {
                    props.typeSlide === 1 ?
                        <EditMultipleQuestion
                            typeSlide={props.typeSlide}
                            idContent={props.idContent}
                            id={props.id}
                            render={props.render}
                            title={props.title}
                            options={props.options}
                            parentRender={callFunctionRender}
                        />
                        :
                        props.typeSlide === 9 ?
                            <EditParagraphQuestion
                                typeSlide={props.typeSlide}
                                idContent={props.idContent}
                                id={props.id}
                                content={props.content}
                                parentRender={callFunctionRender}
                            />
                            :
                            <h2>
                                <EditHeadingQuestion
                                    typeSlide={props.typeSlide}
                                    idContent={props.idContent}
                                    id={props.id}
                                    content={props.content}
                                    parentRender={callFunctionRender}
                                />
                            </h2>
                }
            </div>
        </>
    );
}

export default EditQuestion;

