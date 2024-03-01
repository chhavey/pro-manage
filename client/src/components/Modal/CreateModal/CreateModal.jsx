import React, { useState, useEffect } from "react";
import styles from "./CreateModal.module.css";
import { ReactComponent as Add } from "../../../assets/addNew.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";
import { toast, Toaster } from "react-hot-toast";
import { errorStyle } from "../../../utils/toastStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateModal({ isOpen, onClose, onConfirm, taskData }) {
  const [checklistItems, setChecklistItems] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setPriority(taskData.priority);
      setSelectedDate(taskData.deadline ? new Date(taskData.deadline) : null);
      setChecklistItems(taskData.checklist.map((subtask) => subtask.subtask));
      setSelectedCheckboxes(
        taskData.checklist.map((subtask) => subtask.isDone)
      );
    }
  }, [taskData]);

  const handleAddChecklist = () => {
    setChecklistItems([...checklistItems, ""]);
    setSelectedCheckboxes([...selectedCheckboxes, false]);
  };

  const handleDeleteChecklist = (index) => {
    const updatedChecklistItems = [...checklistItems];
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    updatedChecklistItems.splice(index, 1);
    updatedSelectedCheckboxes.splice(index, 1);
    setChecklistItems(updatedChecklistItems);
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const toggleCheckBox = (index) => {
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    updatedSelectedCheckboxes[index] = !updatedSelectedCheckboxes[index];
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const totalSelected = selectedCheckboxes.filter(
    (isSelected) => isSelected
  ).length;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const deadline = selectedDate ? selectedDate.toISOString() : null;
  const checklist = checklistItems.map((item, index) => ({
    subtask: item,
    isDone: selectedCheckboxes[index] || false,
  }));

  const handleSave = () => {
    if (
      !title ||
      !priority ||
      checklist.length === 0 ||
      checklistItems.some((item) => item.trim() === "")
    ) {
      toast.error("All fields marked with * are required", errorStyle);
      return;
    }
    onConfirm(title, priority, checklist, deadline);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <Toaster />
      <div className={styles.modal}>
        <div className={styles.label}>
          Title <span>*</span>
        </div>
        <input
          type="text"
          placeholder="Enter Task Title"
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.priorityContainer}>
          <div className={styles.label}>
            Select Priority <span>*</span>
          </div>
          <div className={styles.priorityWrapper}>
            <div
              className={`${styles.priority} ${
                priority === "HIGH" ? styles.selected : ""
              }`}
              onClick={() => setPriority("HIGH")}
            >
              <div className={styles.highPriority} />
              HIGH PRIORITY
            </div>
            <div
              className={`${styles.priority} ${
                priority === "MODERATE" ? styles.selected : ""
              }`}
              onClick={() => setPriority("MODERATE")}
            >
              <div className={styles.moderatePriority} />
              MODERATE PRIORITY
            </div>
            <div
              className={`${styles.priority} ${
                priority === "LOW" ? styles.selected : ""
              }`}
              onClick={() => setPriority("LOW")}
            >
              <div className={styles.lowPriority} />
              LOW PRIORITY
            </div>
          </div>
        </div>

        <div className={styles.label}>
          Checklist ({totalSelected}/{checklistItems.length}) <span>*</span>
        </div>

        <div className={styles.subtaskWrapper}>
          {checklistItems && (
            <div className={styles.checklistWrapper}>
              {checklistItems.map((item, index) => (
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
                  <input
                    type="text"
                    value={item}
                    className={styles.subtask}
                    onChange={(e) => {
                      const updatedChecklistItems = [...checklistItems];
                      updatedChecklistItems[index] = e.target.value;
                      setChecklistItems(updatedChecklistItems);
                    }}
                  />
                  <Delete
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteChecklist(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={styles.addTaskBtn} onClick={handleAddChecklist}>
            <Add style={{ height: "11px", marginRight: "2px" }} /> Add New
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Select Due Date"
            dateFormat="dd/MM/yyyy"
            className={styles.dateBtn}
            popperClassName={styles.custom}
          />

          <div className={styles.buttons}>
            <div className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </div>
            <div className={styles.createBtn} onClick={handleSave}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
