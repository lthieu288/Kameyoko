import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./pages/homePage/ListGroup";
import CreateGroup from "./pages/homePage/CreateGroup";
import EditProfile from "./pages/profile/EditProfile";
import Footer from "./pages/footer/Footer";
import Navbar from "./pages/navbar/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<ListGroup />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route exact path="/profile/:id" element={<EditProfile />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
