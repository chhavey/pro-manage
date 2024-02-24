import React, { useState } from "react";
import styles from "./Board.module.css";
import { formattedDate } from "../../utils/formatDate";
import Column from "../Column/Column";
import { GoChevronDown } from "react-icons/go";

function Board() {
  const options = [
    { label: "Today", value: "Today" },
    { label: "This Week", value: "This Week" },
    { label: "This Month", value: "This Month" },
  ];
  const name = localStorage.getItem("loggedInUser").split(" ");
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <p className={styles.welcomeText}>Welcome! {name[0]}</p>
        <p className={styles.dateText}>{formattedDate}</p>
      </div>
      <div className={styles.topWrapper}>
        <p className={styles.titleText}>Board</p>
        {/* select */}
        <div className={styles.selectWrapper}>
          <div
            className={styles.selectHeader}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption.label}
            <GoChevronDown />
          </div>
          {isOpen && (
            <div className={styles.optionsWrapper}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    selectedOption === option ? styles.selected : ""
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
          <Column status="Backlog" />
          <Column status="To do" />
          <Column status="In progress" />
          <Column status="Done" />
        </div>
      </div>
    </div>
  );
}

export default Board;
