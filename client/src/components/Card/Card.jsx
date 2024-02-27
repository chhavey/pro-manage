import React, { useState } from "react";
import styles from "./Card.module.css";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { priorityColor } from "../../utils/formatUtils";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { formatDeadlineDate } from "../../utils/formatDate";
import { deleteTask } from "../../apis/task";
import { frontendUrl } from "../../config/config";
import copy from "clipboard-copy";
import { toast, Toaster } from "react-hot-toast";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";

function Card({ task }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleChecklist = () => {
    setIsChecklistOpen(!isChecklistOpen);
  };

  const removeTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      console.log(response);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    }
  };

  const handleEdit = () => {
    //some logic
  };

  const handleShare = async (taskId) => {
    if (!taskId) {
      toast.error("Cannot copy link");
      return;
    }
    const path = `${frontendUrl}/task/${taskId}`;
    setIsMenuOpen(false);
    try {
      await copy(path);
      toast.success("Link copied");
    } catch (error) {
      toast.error(error.message || "Cannot copy link");
    }
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setIsMenuOpen(false);
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
      <Toaster />
      <div className={styles.topSection}>
        <div className={styles.priorityWrapper}>
          <div
            className={styles.priorityBullet}
            style={{ backgroundColor: priorityColor(task.priority) }}
          />
          <p className={styles.priorityLabel}>{task.priority} PRIORITY</p>
        </div>
        <div className={styles.menucontainer}>
          <Menu className={styles.menuicon} onClick={toggleMenu} />
          {isMenuOpen && (
            <ul className={styles.menulist}>
              <li className={styles.menuItem} onClick={handleEdit}>
                Edit
              </li>
              <li
                className={styles.menuItem}
                onClick={() => handleShare(task._id)}
              >
                Share
              </li>
              <li className={styles.menuItemDel} onClick={handleDelete}>
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

      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            removeTask(task._id);
            setDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Card;
