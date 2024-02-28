import React, { useState } from "react";
import styles from "./Register.module.css";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as Name } from "../../assets/name.svg";
import { ReactComponent as Email } from "../../assets/email.svg";
import { ReactComponent as Password } from "../../assets/password.svg";
import { register } from "../../apis/auth";
import { toast, Toaster } from "react-hot-toast";
import { errorStyle } from "../../utils/toastStyle";
import { useNavigate } from "react-router-dom";
import Spinner from "@atlaskit/spinner";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const viewPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const viewConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (name.trim() && !/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Invalid name");
      isValid = false;
      setName("");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      setEmailError("Invalid email");
      isValid = false;
      setEmail("");
    }

    // Validate password
    if (password.trim() && password.length < 6) {
      setPasswordError("Weak password");
      isValid = false;
      setPassword("");
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
      setConfirmPassword("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await register(name, email, password);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Sign Up failed.", errorStyle, {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Toaster />
      <p className={styles.heading}>Register</p>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Name className={styles.icons} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {nameError && <p className={styles.error}>{nameError}</p>}
        <div className={styles.inputWrapper}>
          <Email className={styles.icons} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailError && <p className={styles.error}>{emailError}</p>}

        <div className={styles.inputWrapper}>
          <Password className={styles.icons} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Eye className={styles.icons} onClick={viewPassword} />
        </div>
        {passwordError && <p className={styles.error}>{passwordError}</p>}

        <div className={styles.inputWrapper}>
          <Password className={styles.icons} />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Eye className={styles.icons} onClick={viewConfirmPassword} />
        </div>
        {confirmPasswordError && (
          <p className={styles.error}>{confirmPasswordError}</p>
        )}

        <button className={styles.registerBtn} type="submit">
          Register
        </button>
        <p className={styles.content}>
          {loading ? <Spinner /> : "Have an account?"}
        </p>
        <button className={styles.loginBtn} onClick={handleLogin}>
          Log in
        </button>
      </div>
    </form>
  );
}

export default Register;
