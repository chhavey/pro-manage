import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

function NotFound() {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <p className={styles.notFound}> Page Not Found</p>
      <p className={styles.content}>
        Oh snap! The page you are attempting to access does not exist. This
        could be due to a mistyped URL or an outdated link.
      </p>
      <p>
        <Link to="/" className={styles.link}>
          Return to Login Page
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
