import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ListGroup from "./pages/ListGroup";
import CreateGroup from "./pages/CreateGroup";
import EditProfile from "./pages/profile/EditProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListGroup />} />
        <Route exact path="/create-group" element={<CreateGroup />} />
        <Route exact path="/profile/:id" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
