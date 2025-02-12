import React, { useEffect } from "react";
import { HashRouter as Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./store/slice/authSlice";
import axiosInstance from "./api/axiosCommon";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      axiosInstance.get("/auth/user-info")
        .then(response => {
          dispatch(setUserInfo({ username: response.data.username, accessToken }));
          navigate("/profile"); 
        })
        .catch(error => {
          console.error("유저 정보 가져오기 실패:", error);
        });
    }
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
