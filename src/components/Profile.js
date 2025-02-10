import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, clearInfo } from "../store/slice/authSlice.js";
import axiosInstance from "../api/axiosCommon";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const nickname = useSelector((state) => state.auth.nickname);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/auth/user-info", {
          withCredentials: true
        });
  
        if (response.status === 200) {
          dispatch(setUserInfo({ username: response.data.email, nickname: response.data.nickname }));
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        navigate("/login"); 
      }
    };
  
    if (!username) {
      fetchUserInfo(); 
    }
  }, [username, navigate, dispatch]);
  
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout",{});
      dispatch(clearInfo());
      document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";

      window.location.href="/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div>
      <h2>프로필 페이지</h2>
      <p>이메일: {username}</p>
      <p>닉네임: {nickname}</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Profile;
