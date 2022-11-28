import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import HomePage from "./Pages/Homepage";
import CreateGroup from "./components/CreateGroup";
import EditProfile from "./Pages/EditProfile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
import {useAuthState} from "./Context";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
    let token = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")).data.token
        : "";
    const userDetails = useAuthState();
    return (
        <>
            <Router>
                <Navbar token={token}/>
                <Routes>
                    <Route
                        path="/groups"
                        element={
                            !Boolean(userDetails.token) ? (
                                <Navigate to={"/login"} replace/>
                            ) : (
                                <GroupDetail/>
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            !Boolean(token) ? (
                                <Navigate to={"/login"} replace/>
                            ) : (
                                <EditProfile props={token}/>
                            )
                        }
                    />
                    <Route index element={<HomePage token={token}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route exact path="/" element={<HomePage token={token}/>}/>
                    <Route exact path="/create-group" element={<CreateGroup token={token}/>}/>
                    <Route path="*" element={<p>There's nothing here: 404!</p>}/>
                </Routes>
            </Router>
            <Footer/>
        </>
    );
}

export default App;
