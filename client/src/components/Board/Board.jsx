import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import Column from "../Column/Column";
import { GoChevronDown } from "react-icons/go";
import { formattedDate } from "../../utils/formatDate";
import { toast, Toaster } from "react-hot-toast";
import { errorStyle, successStyle } from "../../utils/toastStyle";
import {
  filterTasks,
  updateStatus,
  deleteTask,
  createTask,
  editTask,
  updateSubtaskStatus,
} from "../../apis/task";

function Board() {
  const options = [
    { label: "Today", value: "Today" },
    { label: "This Week", value: "This Week" },
    { label: "This Month", value: "This Month" },
  ];
  const name = localStorage.getItem("loggedInUser").split(" ");
  const [filterType, setFilterType] = useState(options[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState({
    Backlog: [],
    "To Do": [],
    "In Progress": [],
    Done: [],
  });
  //to reload the board as soon as card status or task Id changes in card component
  const [reload, setReload] = useState(false);

  const handleOptionClick = (option) => {
    setFilterType(option);
    setIsOpen(false);
  };

  const filterTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await filterTasks(token, filterType.label);
      const organizedTasks = {
        Backlog: [],
        "To Do": [],
        "In Progress": [],
        Done: [],
      };
      response.data.Tasks.forEach((task) => {
        organizedTasks[task.status].push(task);
      });
      setTasks(organizedTasks);
    } catch (error) {
      toast.error(error.message || "Cannot fetch tasks", errorStyle);
    }
  };

  useEffect(() => {
    filterTask();
    // eslint-disable-next-line
  }, [filterType, reload]);

  const moveCard = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await updateStatus(token, taskId, newStatus);
      setReload(!reload);
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const deleteCard = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await deleteTask(token, taskId);
      if (response) {
        setReload(!reload);
        toast.success(response.message || "Task removed", successStyle);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const createCard = async (title, priority, checklist, deadline) => {
    try {
      const token = localStorage.getItem("token");
      const response = await createTask(
        token,
        title,
        priority,
        checklist,
        deadline
      );
      setReload(!reload);
      toast.success(response.message || "Task added", successStyle);
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const editCard = async (taskId, title, priority, checklist, deadline) => {
    const updatedTaskData = { title, priority, checklist, deadline };
    try {
      const token = localStorage.getItem("token");
      const response = await editTask(token, taskId, updatedTaskData);
      setReload(!reload);
      toast.success(response.message || "Task updated", successStyle);
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const updateSubtask = async (taskId, index, update) => {
    try {
      const token = localStorage.getItem("token");
      await updateSubtaskStatus(token, taskId, index, update);
      setReload(!reload);
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.topWrapper}>
        <p className={styles.welcomeText}>Welcome! {name[0]}</p>
        <p className={styles.dateText}>{formattedDate}</p>
      </div>
      <div className={styles.topWrapper}>
        <p className={styles.titleText}>Board</p>
        <div className={styles.selectWrapper}>
          <div
            className={styles.selectHeader}
            onClick={() => setIsOpen(!isOpen)}
          >
            {filterType.label}
            <GoChevronDown />
          </div>
          {isOpen && (
            <div className={styles.optionsWrapper}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    filterType === option ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <Column
            status="Backlog"
            tasks={tasks.Backlog}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
            editCard={editCard}
            updateSubtask={updateSubtask}
          />
          <Column
            status="To Do"
            tasks={tasks["To Do"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
            editCard={editCard}
            updateSubtask={updateSubtask}
          />
          <Column
            status="In Progress"
            tasks={tasks["In Progress"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
            editCard={editCard}
            updateSubtask={updateSubtask}
          />
          <Column
            status="Done"
            tasks={tasks.Done}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
            editCard={editCard}
            updateSubtask={updateSubtask}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
