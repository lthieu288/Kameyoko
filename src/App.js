import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/Homepage";
import CreateGroup from "./Pages/CreateGroup";
import EditProfile from "./Pages/EditProfile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
import JoinGroup from "./Pages/JoinGroup";
import Presentation from "./Pages/Presentation";
import MemberDetail from "./Pages/MemberDetail";
import Slide from "./Pages/CreatePresentation";
import ViewForTheHost from "./Pages/Viewforthehost";
import ChoiceQuestion from "./Pages/ChoiceQuestion";
import Result from "./Pages/Result";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<HomePage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/group/:id" element={<GroupDetail />} />

          <Route path="/presentation" element={<Presentation />} />
          <Route path="/presentation/:id" element={<Slide />} />
          <Route path="/view-host" element={<ViewForTheHost />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/view-host/:id" element={<ChoiceQuestion />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group/:id" element={<JoinGroup />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
