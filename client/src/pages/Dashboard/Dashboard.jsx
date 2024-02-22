import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Board from "../../components/Board/Board";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Board />
    </div>
  );
}

export default Dashboard;
