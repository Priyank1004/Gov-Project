import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefrshHandler from "./RefrshHandler";


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
      <RefrshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/home" element={<PrivateRoute element={<Home />} />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
