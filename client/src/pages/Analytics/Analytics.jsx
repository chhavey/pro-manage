import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ReactComponent as Bullet } from "../../assets/bullet.svg";
import { fetchAnalytics } from "../../apis/task";
import { toast, Toaster } from "react-hot-toast";
import { formatNum } from "../../utils/formatUtils";
import Spinner from "@atlaskit/spinner";

function Analytics() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetchAnalytics();
      setStats(response);
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  const status = [
    { title: "Backlog Tasks", stats: stats.backlogTasks },
    { title: "To-do Tasks", stats: stats.todoTasks },
    { title: "In-Progress Tasks", stats: stats.inProgressTasks },
    { title: "Completed Tasks", stats: stats.doneTasks },
  ];

  const priority = [
    { title: "Low Priority", stats: stats.lowPriorityTasks },
    { title: "Moderate Priority", stats: stats.moderatePriorityTasks },
    { title: "High Priority", stats: stats.highPriorityTasks },
    { title: "Due Date Tasks", stats: stats.dueDateTasks },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Toaster />

      {!loading ? (
        <>
          <div className={styles.container}>
            <p className={styles.heading}>Analytics</p>
            <div className={styles.wrapper}>
              <div className={styles.analytics}>
                {status.map((data, index) => (
                  <div key={index} className={styles.element}>
                    <Bullet style={{ height: "10px" }} />
                    <p className={styles.title}>{data.title}</p>
                    <p className={styles.stats}>{formatNum(data.stats)}</p>
                  </div>
                ))}
              </div>
              <div className={styles.analytics}>
                {priority.map((data, index) => (
                  <div key={index} className={styles.element}>
                    <Bullet style={{ height: "10px" }} />
                    <p className={styles.title}>{data.title}</p>
                    <p className={styles.stats}>{formatNum(data.stats)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "84vw",
          }}
        >
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
}

export default Analytics;
