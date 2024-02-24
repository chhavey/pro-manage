import React, { useState } from "react";
import styles from "./Card.module.css";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { priorityColor } from "../../utils/formatUtils";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function Card({ priority }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleChecklist = () => {
    setIsChecklistOpen(!isChecklistOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.priorityWrapper}>
          <div
            className={styles.priorityBullet}
            style={{ backgroundColor: priorityColor(priority) }}
          ></div>
          <p className={styles.priorityLabel}>{priority} PRIORITY</p>
        </div>
        <div className={styles.menucontainer}>
          <Menu className={styles.menuicon} onClick={toggleMenu} />
          {isMenuOpen && (
            <ul className={styles.menulist}>
              <li className={styles.menuItem}>Edit</li>
              <li className={styles.menuItem}>Share</li>
              <li className={styles.menuItemDel}>Delete</li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.taskName}>Hero Section</div>

      <div className={styles.checklistHeader}>
        <p className={styles.checklistLabel}>Checklist (0/3)</p>{" "}
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
          <label className={styles.checkWrapper}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, ut
            sequi provident inventore sapiente deleniti vitae. Molestias
            voluptatum quia ducimus.
          </label>
          <label className={styles.checkWrapper}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            <p>one</p>
          </label>
          <label className={styles.checkWrapper}>
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
            One
          </label>
        </div>
      )}

      <div className={styles.bottomSection}>
        <div className={styles.dateBtn}>Feb 10th</div>
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
