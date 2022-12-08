import React from 'react'
import '../styles/CreateGroup.module.css'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createGroup} from "../services/auth"
import * as yup from "yup";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function CreateGroup(props) {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("name group is required"),
        link: yup.string().required("link group is required")

    });
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});
    const create = async (data) => {
        let group = {
            name: data.name,
            link: data.link,
            desc: data.desc
        }
        await createGroup(group, props.token).then((response) => {
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Create group successfully",
                    showConfirmButton: false,
                });
                navigate("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.message,
                });
            }
        })
    };

    return (
        <>
            <div className="form-create">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-md-8">
                            <form onSubmit={handleSubmit(create)} className="bg-white  rounded-5 shadow-5-strong p-5">
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example1">Name Group</label>
                                    <input type="text" id="form1Example1"
                                           className="form-control" {...register("name")} />
                                    <p className="error" style={{color: "red"}}>{errors.name?.message}</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example1">Link group</label>
                                    <input type="text" id="form1Example1"
                                           className="form-control" {...register("link")} />
                                    <p className="error" style={{color: "red"}}>{errors.link?.message}</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example1">Description</label>
                                    <input type="text" id="form1Example1"
                                           className="form-control" {...register("desc")} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Create Group</button>
                                <button style={{marginLeft: 10, backgroundColor: "red"}}
                                        className="btn btn-primary btn-block" onClick={() => navigate("/")}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateGroup