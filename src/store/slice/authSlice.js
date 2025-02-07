import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {
  username: "",
  nickname: "",
};

const initialState = {
  username: storedUserInfo.username,
  nickname: storedUserInfo.nickname,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const { username, nickname } = action.payload;
      state.username = username;
      state.nickname = nickname;

      localStorage.setItem("userInfo", JSON.stringify({ username, nickname }));
    },
    clearInfo(state) {
      state.username = "";
      state.nickname = "";

      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, clearInfo } = authSlice.actions;
export default authSlice.reducer;
