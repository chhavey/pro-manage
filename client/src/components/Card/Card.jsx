import React, { useState } from "react";
import styles from "./Card.module.css";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { priorityColor } from "../../utils/formatUtils";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { formatDeadlineDate } from "../../utils/formatDate";
import { deleteTask } from "../../apis/task";
import { frontendUrl } from "../../config/config";
import copy from "clipboard-copy";

function Card({ task }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleChecklist = () => {
    setIsChecklistOpen(!isChecklistOpen);
  };

  const handleDelete = (taskId) => {
    removeTask(taskId);

    setIsMenuOpen(false);
  };

  const removeTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (taskId) => {
    if (!taskId) {
      // toast.error("Cannot copy link");
      return;
    }
    const path = `${frontendUrl}/task/${taskId}`;
    try {
      await copy(path);
      //toast here
    } catch (error) {}
  };

  const getStatusClass = () => {
    if (task.status === "Done") {
      return styles.done;
    } else if (task.deadline && new Date(task.deadline) < new Date()) {
      return styles.deadline;
    } else {
      return styles.date;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.priorityWrapper}>
          <div
            className={styles.priorityBullet}
            style={{ backgroundColor: priorityColor(task.priority) }}
          ></div>
          <p className={styles.priorityLabel}>{task.priority} PRIORITY</p>
        </div>
        <div className={styles.menucontainer}>
          <Menu className={styles.menuicon} onClick={toggleMenu} />
          {isMenuOpen && (
            <ul className={styles.menulist}>
              <li className={styles.menuItem}>Edit</li>
              <li
                className={styles.menuItem}
                onClick={() => handleShare(task._id)}
              >
                Share
              </li>
              <li
                className={styles.menuItemDel}
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.taskName}>{task.title}</div>

      <div className={styles.checklistHeader}>
        <p className={styles.checklistLabel}>
          Checklist ({task.completedSubtasks}/{task.totalSubtasks})
        </p>
        <div className={styles.arrowBtn}>
          {isChecklistOpen ? (
            <GoChevronUp opacity="0.5" onClick={toggleChecklist} />
          ) : (
            <GoChevronDown opacity="0.5" onClick={toggleChecklist} />
          )}
        </div>
      </div>

      {isChecklistOpen && (
        <div className={styles.checklistWrapper}>
          {task.checklist.map((subtask, index) => (
            <label key={index} className={styles.checkWrapper}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              {subtask.subtask}
            </label>
          ))}
        </div>
      )}

      <div className={styles.bottomSection}>
        {task.deadline ? (
          <div className={getStatusClass()}>
            {formatDeadlineDate(task.deadline)}
          </div>
        ) : (
          <div className={styles.placeholder}></div>
        )}
        <div className={styles.statusWrapper}>
          <div className={styles.statusBtn}>IN PROGRESS</div>
          <div className={styles.statusBtn}>TO DO</div>
          <div className={styles.statusBtn}>DONE</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
