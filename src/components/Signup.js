import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/slice/authSlice.js";
import axiosInstance from "../api/axiosCommon";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storedUserId = urlParams.get("userId");
    const storedEmail = urlParams.get("email");

    if (storedUserId && storedEmail) {
      setUserId(storedUserId);
      setEmail(storedEmail);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login"); 
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      userId,
      nickname,
      birth
    };

    try {
      const response = await axiosInstance.post("/user/sign-up", requestData);

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        const {accessToken, nickname}=response.data;

        dispatch(setUserInfo({ username: email, nickname, accessToken }));

        navigate("/profile");
      } else {
        alert("오류 발생");
      }
    } catch (error) {
      alert("서버 오류 발생");
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={userId} />

        <label htmlFor="nickname">닉네임:</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <br />

        <label htmlFor="birth">생년월일:</label>
        <input
          type="date"
          id="birth"
          name="birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          required
        />
        <br />

        <button type="submit">회원가입 완료</button>
      </form>
    </div>
  );
};

export default Signup;
