import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ListGroup from "./Pages/homePage/ListGroup";
import CreateGroup from "./Pages/homePage/CreateGroup";
import EditProfile from "./Pages/profile/EditProfile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
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
}

export default App;
