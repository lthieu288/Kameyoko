import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ListGroup from "./pages/listGroup";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
