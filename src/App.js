import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/Homepage";
import CreateGroup from "./Pages/homePage/CreateGroup";
import EditProfile from "./Pages/EditProfile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
import JoinGroup from "./Pages/JoinGroup";
import GroupMemberDetail from "./components/GroupMemberDetail";
import MemberDetail from "./Pages/MemberDetail";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<HomePage />} />
          <Route path="/groups/:id" element={<GroupDetail/>} />
          <Route path="/groups/member/:group/:id" element={<MemberDetail  />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group/:id" element={<JoinGroup />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
