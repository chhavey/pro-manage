import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
import SharedTask from "./pages/SharedTask/SharedTask";

function App() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {isLoggedIn && (
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/board" element={<Dashboard />} />
        </Routes>
      )}
      <Routes>
        <Route path="/task/:taskId" element={<SharedTask />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
