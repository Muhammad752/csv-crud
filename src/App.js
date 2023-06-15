import './App.css';
import Login from './pages/Login';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import DataPage from './pages/DataPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/dataPage' element={<DataPage/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
