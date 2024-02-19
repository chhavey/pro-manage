import React, { useState } from "react";
import styles from "./Login.module.css";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as Email } from "../../assets/email.svg";
import { ReactComponent as Password } from "../../assets/password.svg";
import { login } from "../../apis/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const viewPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response) {
        navigate("/board");
      }
    } catch (error) {
      toast.error(error.message || "Login failed.", {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Toaster />
      <p className={styles.heading}>Login</p>

      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Email className={styles.icons} />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Password className={styles.icons} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Eye className={styles.icons} onClick={viewPassword} />
        </div>

        <button className={styles.loginBtn} type="submit">
          Log in
        </button>
        <p className={styles.content}>
          {loading ? "Logging in.. " : "Have no account yet?"}
        </p>
        <button className={styles.registerBtn} onClick={handleRegister}>
          Register
        </button>
      </div>
    </form>
  );
}

export default Login;
