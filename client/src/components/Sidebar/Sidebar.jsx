import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as BoardIcon } from "../../assets/board.svg";
import { ReactComponent as AnalyticsIcon } from "../../assets/analytics.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("board");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedTab(path || "board");
  }, [location.pathname]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    navigate(`/${tabName}`);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Logo />
          Pro Manage
        </div>

        <div className={styles.wrapper}>
          <Link
            to="/board"
            className={`${styles.tab} ${
              selectedTab === "board" ? styles.selectedTab : ""
            }`}
            onClick={() => handleTabClick("board")}
          >
            <BoardIcon style={{ opacity: selectedTab === "board" ? 1 : 0.5 }} />
            Board
          </Link>
          <Link
            to="/analytics"
            className={`${styles.tab} ${
              selectedTab === "analytics" ? styles.selectedTab : ""
            }`}
            onClick={() => handleTabClick("analytics")}
          >
            <AnalyticsIcon
              style={{ opacity: selectedTab === "analytics" ? 1 : 0.5 }}
            />
            Analytics
          </Link>
          <Link
            to="/settings"
            className={`${styles.tab} ${
              selectedTab === "settings" ? styles.selectedTab : ""
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <SettingsIcon
              style={{ opacity: selectedTab === "settings" ? 1 : 0.5 }}
            />
            Settings
          </Link>
        </div>
      </div>

      <div className={styles.logoutWrapper} onClick={handleLogout}>
        <LogoutIcon className={styles.logoutBtn} />
      </div>
    </div>
  );
}

export default Sidebar;
