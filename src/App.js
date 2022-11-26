import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GroupDetail from "./Pages/GroupDetail";
import { useAuthState } from "./Context";

function App() {
  const userDetails = useAuthState();
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/groups"
          element={
            !Boolean(userDetails.token) ? (
              <Navigate to={"/"} replace />
            ) : (
              <GroupDetail />
            )
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
