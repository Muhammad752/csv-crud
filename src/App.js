import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataPage from "./pages/DataPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import CheckIfWorks from "./pages/Check";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/dataPage" element={<DataPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
