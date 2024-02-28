import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { formattedDate } from "../../utils/formatDate";
import Column from "../Column/Column";
import { GoChevronDown } from "react-icons/go";
import {
  filterTasks,
  updateStatus,
  deleteTask,
  createTask,
} from "../../apis/task";
import { toast, Toaster } from "react-hot-toast";
import { errorStyle, successStyle } from "../../utils/toastStyle";

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
  const [status, setStatus] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [createUpdate, setCreateUpdate] = useState(null);

  const handleOptionClick = (option) => {
    setFilterType(option);
    setIsOpen(false);
  };

  const filterTask = async () => {
    try {
      const response = await filterTasks(filterType.label);
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
  }, [filterType, status, taskId, deleteId, createUpdate]);

  const moveCard = async (taskId, newStatus) => {
    try {
      await updateStatus(taskId, newStatus);
      setStatus(newStatus);
      setTaskId(taskId);
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const deleteCard = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response) {
        setDeleteId(taskId);
        toast.success(response.message || "Task removed", successStyle);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", errorStyle);
    }
  };

  const createCard = async (title, priority, checklist, deadline) => {
    try {
      const response = await createTask(title, priority, checklist, deadline);
      setCreateUpdate(response.data.id);
      toast.success(response.message || "Task added", successStyle);
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
          />
          <Column
            status="To Do"
            tasks={tasks["To Do"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
          />
          <Column
            status="In Progress"
            tasks={tasks["In Progress"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
          />
          <Column
            status="Done"
            tasks={tasks.Done}
            moveCard={moveCard}
            deleteCard={deleteCard}
            createCard={createCard}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
