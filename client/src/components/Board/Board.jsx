import React from "react";
import styles from "./Board.module.css";
import { formattedDate } from "../../utils/formatDate";
import Column from "../Column/Column";

function Board() {
  const name = localStorage.getItem("loggedInUser").split(" ");

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <p className={styles.welcomeText}>Welcome! {name[0]}</p>
        <p className={styles.dateText}>{formattedDate}</p>
      </div>
      <div className={styles.topWrapper}>
        <p className={styles.titleText}>Board</p>
        <div className={styles.dropdown}>
          <select className={styles.dropdownContent}>
            <option>Today</option>
            <option selected>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <Column status="Backlog" />
          <Column status="To do" />
          <Column status="In progress" />
          <Column status="Done" />
        </div>
      </div>
    </div>
  );
}

export default Board;
