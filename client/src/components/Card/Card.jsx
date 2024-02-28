import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import { priorityColor } from "../../utils/formatUtils";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { formatDeadlineDate } from "../../utils/formatDate";
import { updateSubtaskStatus } from "../../apis/task";
import { frontendUrl } from "../../config/config";
import copy from "clipboard-copy";
import { toast, Toaster } from "react-hot-toast";
import { errorStyle, successStyle } from "../../utils/toastStyle";

import DeleteModal from "../Modal/DeleteModal/DeleteModal";

function Card({ task, status, moveCard, deleteCard, collapse, resetCollapse }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [completedSubtasks, setCompletedSubtasks] = useState(
    task.completedSubtasks
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleChecklist = () => {
    setIsChecklistOpen(!isChecklistOpen);
  };

  useEffect(() => {
    if (collapse) {
      setIsChecklistOpen(false);
      resetCollapse();
    }
    // eslint-disable-next-line
  }, [collapse]);

  useEffect(() => {
    setSelectedCheckboxes(task.checklist.map((subtask) => subtask.isDone));
  }, [task]);

  useEffect(() => {
    const completedCount = selectedCheckboxes.filter(
      (isChecked) => isChecked
    ).length;
    setCompletedSubtasks(completedCount);
  }, [selectedCheckboxes]);

  const toggleCheckBox = async (index) => {
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    updatedSelectedCheckboxes[index] = !updatedSelectedCheckboxes[index];
    setSelectedCheckboxes(updatedSelectedCheckboxes);

    try {
      await updateSubtaskStatus(
        task._id,
        index,
        updatedSelectedCheckboxes[index]
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const handleEdit = () => {
    //some logic
  };

  const handleShare = async (taskId) => {
    if (!taskId) {
      toast.error("Cannot copy link", errorStyle);
      return;
    }
    const path = `${frontendUrl}/task/${taskId}`;
    setIsMenuOpen(false);
    try {
      await copy(path);
      toast.success("Link copied", successStyle);
    } catch (error) {
      toast.error(error.message || "Cannot copy link", errorStyle);
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
          Checklist ({completedSubtasks}/{task.totalSubtasks})
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
            <div key={index} className={styles.checkWrapper}>
              <div
                className={
                  selectedCheckboxes[index]
                    ? styles.checkboxSelected
                    : styles.checkbox
                }
                onClick={() => toggleCheckBox(index)}
              >
                {selectedCheckboxes[index] && <Check />}
              </div>
              {subtask.subtask}
            </div>
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
          {status !== "Backlog" && (
            <div
              className={styles.statusBtn}
              onClick={() => moveCard(task._id, "Backlog")}
            >
              BACKLOG
            </div>
          )}
          {status !== "To Do" && (
            <div
              className={styles.statusBtn}
              onClick={() => moveCard(task._id, "To Do")}
            >
              TO DO
            </div>
          )}
          {status !== "In Progress" && (
            <div
              className={styles.statusBtn}
              onClick={() => moveCard(task._id, "In Progress")}
            >
              IN PROGRESS
            </div>
          )}
          {status !== "Done" && (
            <div
              className={styles.statusBtn}
              onClick={() => moveCard(task._id, "Done")}
            >
              DONE
            </div>
          )}
        </div>
      </div>

      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            deleteCard(task._id);
            setDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Card;
