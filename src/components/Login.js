import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosCommon";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      axiosInstance.get("/auth/oauth-success")
        .then(response => {
          const redirectUrl = response.data.redirectUrl;
          if (redirectUrl === "/signup") {
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("nickname", response.data.nickname);
            localStorage.setItem("email", response.data.email);
          }
          navigate(redirectUrl);
        })
        .catch(error => {
          console.error("OAuth 로그인 처리 오류:", error);
          navigate("/login?error=true");
        });
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };    

  return (
    <div>
      <h1>로그인</h1>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
    </div>
  );
};

export default Login;
