import React from "react";
import Banner from "../../components/Banner/Banner";
import Login from "../../components/Login/Login";

function LoginPage() {
  return (
    <div style={{ display: "flex" }}>
      <Banner />
      <Login />
    </div>
  );
}

export default LoginPage;
