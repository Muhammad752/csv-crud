import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataPage from "./pages/DataPage";
import SignUpPage from "./pages/SignUpPage";
import Protector from "./auth/Protector";
import NotFound from "./pages/NotFound";
import SingUpAlterNate from "./pages/SignUpAlternate";
import useUser from "./auth/useUser";
import CheckIfWorks from "./pages/Check";

function App() {
  /*--------------------
  
  Changing for checking
  
  --------------------*/

  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign" element={<SingUpAlterNate />} />
        {/* <Route index path="/" element={<CheckIfWorks />} /> */}
        <Route index element={<Login user={user} />} />
        <Route element={<Protector user={user} />}>
          <Route path="/dataPage" element={<DataPage />} />
        </Route>
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
