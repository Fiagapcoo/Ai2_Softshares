import React from 'react';
import { BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './pages/404/404';

function App() {
  return (
    <Router>
      <div>
        <Routes>
         <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
