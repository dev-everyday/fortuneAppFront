import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUserInfo } from "../store/slice/authSlice";
import axiosInstance from "../api/axiosCommon";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const userId = urlParams.get("userId");
    const email = urlParams.get("email");

    if (!userId || !email) {
      navigate("/login");
      return;
    }

    const checkUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/auth/user-info", {
          withCredentials: true, 
        });

        if (response.status === 200) {
          const user = response.data;
          dispatch(setUserInfo({
            username: user.email,
            nickname: user.nickname,
          }));

          navigate("/profile");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate(`/signup?userId=${userId}&email=${email}`);
        } else {
          navigate("/login");
        }
      }
    };

    checkUserInfo();
  }, [dispatch, navigate, location]);

  return <div>OAuth 로그인 중...</div>;
};

export default OAuthCallback;
