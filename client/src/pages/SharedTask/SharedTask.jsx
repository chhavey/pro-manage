import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTask } from "../../apis/task";
import styles from "./SharedTask.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { priorityColor } from "../../utils/formatUtils";
import Spinner from "@atlaskit/spinner";
import { formatDeadlineDate } from "../../utils/formatDate";

function SharedTask() {
  const [task, setTask] = useState(null);
  const [total, setTotal] = useState(null);
  const [completed, setCompleted] = useState(null);
  const { taskId } = useParams();

  const sharedTask = async () => {
    const response = await fetchTask(taskId);
    setTask(response.data.data.task);
    setCompleted(response.data.data.completedSubtasks);
    setTotal(response.data.data.totalSubtasks);
  };

  useEffect(() => {
    sharedTask();
    // eslint-disable-next-line
  }, [taskId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        Pro Manage
      </div>
      {task ? (
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.priorityWrapper}>
              <div
                className={styles.priorityBullet}
                style={{ backgroundColor: priorityColor(task.priority) }}
              ></div>
              <p className={styles.priorityLabel}>{task.priority} PRIORITY</p>
            </div>
            <div className={styles.taskName}>{task.title}</div>
            <p className={styles.checklistLabel}>
              Checklist ({completed}/{total})
            </p>
            <div className={styles.checklistWrapper}>
              {task.checklist.map((subtask, index) => (
                <label key={index} className={styles.checkWrapper}>
                  <input type="checkbox" checked={subtask.isDone} readOnly />
                  <span className={styles.checkmark}></span>
                  {subtask.subtask}
                </label>
              ))}
            </div>
            {task.deadline && (
              <div className={styles.dueDate}>
                <p className={styles.dateLabel}> Due Date</p>
                <div className={styles.deadline}>
                  {formatDeadlineDate(task.deadline)}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
}

export default SharedTask;
