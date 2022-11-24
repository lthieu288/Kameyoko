import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ListGroup from "./pages/homePage/ListGroup";
import CreateGroup from "./pages/homePage/CreateGroup";
import EditProfile from "./pages/profile/EditProfile";
import Footer from "./pages/footer/Footer"
import Navbar from "./pages/navbar/Navbar"
function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path="/" element={<ListGroup />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route exact path="/profile/:id" element={<EditProfile />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
