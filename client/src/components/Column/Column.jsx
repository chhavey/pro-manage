import React from "react";
import styles from "./Column.module.css";
import { ReactComponent as Minimize } from "../../assets/minimize.svg";
import { ReactComponent as AddButton } from "../../assets/add.svg";
import Card from "../Card/Card";

function Column({ status, tasks }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{status}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          {status === "To do" && <AddButton className={styles.buttons} />}
          <Minimize className={styles.buttons} />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        {tasks.map((task) => (
          <Card key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
