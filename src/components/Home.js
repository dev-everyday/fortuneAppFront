import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>홈 페이지</h1>
      <Link to="/login">
        <button>로그인</button>
      </Link>
    </div>
  );
};

export default Home;
