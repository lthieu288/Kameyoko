import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between px-5">
                    <a className="navbar-brand" href="/">KAMEYOKO</a>
                    <div className="" id="navbarSupportedContent">

                        <form className="d-flex">
                            <button className="btn btn-outline-success" type="button" style={{marginRight:"10px"}}>Login</button>
                            <button className="btn btn-outline-success" type="button">Register</button>
                        </form>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default Navbar