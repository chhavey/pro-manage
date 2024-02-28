import React, { useState } from "react";
import styles from "./Column.module.css";
import { ReactComponent as Minimize } from "../../assets/minimize.svg";
import { ReactComponent as AddButton } from "../../assets/add.svg";
import Card from "../Card/Card";
import CreateModal from "../Modal/CreateModal/CreateModal";

function Column({ status, tasks, moveCard, deleteCard, createCard }) {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddTask = () => {
    setAddTaskModal(true);
  };

  const minimize = () => {
    setIsCollapsed(true);
  };

  const resetCollapse = () => {
    setIsCollapsed(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{status}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          {status === "To Do" && (
            <AddButton className={styles.buttons} onClick={handleAddTask} />
          )}
          <Minimize className={styles.buttons} onClick={minimize} />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        {tasks.map((task) => (
          <Card
            key={task._id}
            task={task}
            status={status}
            moveCard={moveCard}
            deleteCard={deleteCard}
            collapse={isCollapsed}
            resetCollapse={resetCollapse}
          />
        ))}
      </div>
      {addTaskModal && (
        <CreateModal
          isOpen={addTaskModal}
          onClose={() => setAddTaskModal(false)}
          onConfirm={createCard}
        />
      )}
    </div>
  );
}

export default Column;
