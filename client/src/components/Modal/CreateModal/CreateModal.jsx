import React, { useState } from "react";
import styles from "./CreateModal.module.css";
import { ReactComponent as Add } from "../../../assets/addNew.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateModal({ isOpen, onClose, onConfirm }) {
  const [checklistItems, setChecklistItems] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");

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
    onConfirm(title, priority, checklist, deadline);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
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
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--priority-high)",
                  borderRadius: "50%",
                }}
              />
              HIGH PRIORITY
            </div>
            <div
              className={`${styles.priority} ${
                priority === "MODERATE" ? styles.selected : ""
              }`}
              onClick={() => setPriority("MODERATE")}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--priority-moderate)",
                  borderRadius: "50%",
                }}
              />
              MODERATE PRIORITY
            </div>
            <div
              className={`${styles.priority} ${
                priority === "LOW" ? styles.selected : ""
              }`}
              onClick={() => setPriority("LOW")}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--priority-low)",
                  borderRadius: "50%",
                }}
              />
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
