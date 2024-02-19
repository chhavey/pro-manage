import React from "react";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.container}>
      <img
        src={require("../../assets/robot.png")}
        className={styles.robot}
        alt="robo"
      />
      <p className={styles.subheading1}>Welcome aboard my friend</p>
      <p className={styles.subheading2}>just a couple of clicks and we start</p>
    </div>
  );
}

export default Banner;
