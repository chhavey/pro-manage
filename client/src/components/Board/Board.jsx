import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { formattedDate } from "../../utils/formatDate";
import Column from "../Column/Column";
import { GoChevronDown } from "react-icons/go";
import { filterTasks, updateStatus, deleteTask } from "../../apis/task";
import { toast, Toaster } from "react-hot-toast";

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
      toast.error(error.message || "Cannot fetch tasks");
    }
  };

  useEffect(() => {
    filterTask();
    // eslint-disable-next-line
  }, [filterType, status, taskId, deleteId]);

  const moveCard = async (taskId, newStatus) => {
    try {
      await updateStatus(taskId, newStatus);
      setStatus(newStatus);
      setTaskId(taskId);
      console.log("Task status updated successfully");
    } catch (error) {
      console.error("Error updating Task status:", error.message);
    }
  };

  const deleteCard = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      console.log(response);
      setDeleteId(taskId);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
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
          />
          <Column
            status="To Do"
            tasks={tasks["To Do"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />
          <Column
            status="In Progress"
            tasks={tasks["In Progress"]}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />
          <Column
            status="Done"
            tasks={tasks.Done}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
