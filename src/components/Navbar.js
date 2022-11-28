import React from "react";
import {
    useNavigate,
} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getProfile} from "../services/auth";

function Navbar(props) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    function ProfileUser() {
        getProfile(props.token).then((data) => {
            setUser(data.user)
        });
    }

    useEffect(() => {
        ProfileUser();
    }, [props]);
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between px-5">
                    <a className="navbar-brand" onClick={() => navigate("/")}
                    >
                        KAMEYOKO
                    </a>
                    <div className="" id="navbarSupportedContent">
                        <form className="d-flex">
                            {user ?
                                <>
                                    <div>
                                        {user.profile_img === "" ?
                                            <img className="avatar rounded-circle"
                                                 src="https://i1-thethao.vnecdn.net/2022/11/20/ronaldo-messi-jpeg-2695-1668938162.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=Lv4T90hu_MaLuArTfZH4sA"
                                                 alt=''
                                                 onClick={() => navigate("/profile")}
                                                 style={{marginRight: "30px", height: "50px", width: "50px"}}/>
                                            :
                                            <img className="avatar rounded-circle" src={user.profile_img}
                                                 alt=''
                                                 onClick={() => navigate("/profile")}
                                                 style={{marginRight: "30px", height: "50px", width: "50px"}}/>}
                                        <button className="btn btn-outline-success" type="button">
                                            Logout
                                        </button>
                                    </div>
                                </>
                                : <>
                                    <button
                                        className="btn btn-outline-success"
                                        type="button"
                                        style={{marginRight: "10px"}}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                    <button className="btn btn-outline-success" type="button"
                                            onClick={() => navigate("/register")}>
                                        Register
                                    </button>
                                </>}
                        </form>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default React.memo(Navbar);
