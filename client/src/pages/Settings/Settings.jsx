import React, { useState } from "react";
import styles from "./Settings.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as Name } from "../../assets/name.svg";
import { ReactComponent as Password } from "../../assets/password.svg";
import { settings } from "../../apis/auth";
import { toast, Toaster } from "react-hot-toast";
import Spinner from "@atlaskit/spinner";

function Settings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const viewOldPassword = () => {
    setShowOldPassword((prevState) => !prevState);
  };
  const viewNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await settings(name, oldPassword, newPassword);
      if (response) {
        toast.success(response);
        setName("");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Toaster />
      <div className={styles.container}>
        <p className={styles.heading}>Settings</p>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <Name className={styles.icons} />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Password className={styles.icons} />
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              name="old"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Eye className={styles.icons} onClick={viewOldPassword} />
          </div>
          <div className={styles.inputWrapper}>
            <Password className={styles.icons} />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              name="new"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Eye className={styles.icons} onClick={viewNewPassword} />
          </div>

          <button className={styles.updateBtn} onClick={handleUpdate}>
            {loading ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
