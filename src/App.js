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
import { useAuthState } from "./Context";

function App() {
  const userDetails = useAuthState();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/groups"
            element={
              !Boolean(userDetails.token) ? (
                <Navigate to={"/login"} replace />
              ) : (
                <GroupDetail />
              )
            }
          />
          <Route index element={<ListGroup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<ListGroup />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route exact path="/profile/:id" element={<EditProfile />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
