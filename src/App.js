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
<<<<<<< HEAD
import JoinGroup from "./Pages/JoinGroup";
import MemberDetail from "./Pages/MemberDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ListGroup />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups/member/:group/:id" element={<MemberDetail />} />
          <Route exact path="/groups/:id" element={<GroupDetail />} />
          <Route exact path="/profile/:id" element={<EditProfile />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
=======
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
>>>>>>> 4453545a684386d53fba1c055aad3fb6bd059912
}

export default App;
