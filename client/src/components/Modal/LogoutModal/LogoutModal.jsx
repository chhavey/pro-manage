import React from "react";
import styles from "./LogoutModal.module.css";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.label}>Are you sure you want to Logout?</p>
        <button className={styles.deleteBtn} onClick={onConfirm}>
          Yes, Logout
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
