import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import CreateGroup from "./Pages/CreateGroup";
import EditProfile from "./Pages/EditProfile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
import JoinGroup from "./Pages/JoinGroup";
import Presentation from "./Pages/Presentation";
import Slide from "./Pages/CreatePresentation";
import ViewForTheHost from "./Pages/Viewforthehost";
import ChoiceQuestion from "./Pages/ChoiceQuestion";
import Result from "./Pages/Result";
import Chat from "./Pages/Chat";
import ResultPublic from "./Pages/ResultPublic";
import ResultGroup from "./Pages/ResultGroup";
import PresentationGroup from "./Pages/PresentationGroup";
import Question from "./components/Question";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/group/:id" element={<GroupDetail />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/presentation/:id" element={<Slide />} />
          <Route path="/view-host" element={<ViewForTheHost />} />
          <Route path="/view-host-public" element={<ViewForTheHost />} />
          <Route path="/result/public/:id" element={<Result />} />
          <Route path="/result/group/:idGroup/:id" element={<ResultGroup />} />
          <Route path="/presentation/public/:id" element={<ChoiceQuestion />} />
          <Route
            path="/presentation/group/:idGroup/:id"
            element={<PresentationGroup />}
          />
          <Route path="/profile" element={<EditProfile />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group/:id" element={<JoinGroup />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import {useEffect, useState} from "react";
// function App() {
//     // websocket
//     const handleClick = () => {
//         setCount(count + 1)
//     }
//
//     const [count, setCount] = useState(0)
//
//     useEffect(() => {
//         console.log("in it")
//         const socket = new WebSocket('ws://localhost:7777/ws');
//
//         socket.onopen = function () {
//             socket.send("Greetings from frontend!")
//             socket.onmessage = (msg) => {
//                 console.log(msg);
//                 console.log("we got msg..")
//             };
//         };
//     }, [count]);
//
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <p>Hello Vite + React!</p>
//                 <p>
//                     <button type="button" onClick={handleClick}>
//                         count is: {count}
//                     </button>
//                 </p>
//             </header>
//         </div>
//     )
