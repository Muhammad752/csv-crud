import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataPage from './pages/DataPage';
import SignUpPage from './pages/SignUpPage';
import Example from './components/checkDropDown';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path='/dataPage' element={<DataPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/check' element={<Example />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
