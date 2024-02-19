import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Analytics from "./pages/Analytics/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
