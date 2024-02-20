import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import Board from "./pages/Board/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
