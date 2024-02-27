import React from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.label}>Are you sure you want to Delete?</p>
        <button className={styles.deleteBtn} onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
