import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
import SharedTask from "./pages/SharedTask/SharedTask";
import NotFound from "./pages/NotFound/NotFound";
import { toast, Toaster } from 'react-hot-toast';

function ProtectedRoute({ element: Element, ...rest }) {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    if (rest.path === '/board' || rest.path === '/analytics' || rest.path === '/settings') {
      setTimeout(() => {
        toast.error("Please log in to continue", { duration: 5000 });
      }, 2000);
    }
    return <Navigate to="/" />;
  }
  return <Element {...rest} />;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/analytics" element={<ProtectedRoute element={Analytics} />} />
        <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
        <Route path="/board" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/task/:taskId" element={<SharedTask />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
