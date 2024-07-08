// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './Components/Navbar'; // Import the Navbar component
import styled from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <Router>
      <AppStyled className='App'>
        <Navbar /> {/* Add the Navbar component */}
        <Routes>
          <Route path="/login" element={!user?<Login />: <Navigate to="/"/>} />
          <Route path="/signup" element={!user?<Signup />:  <Navigate to="/"/>} />
          <Route path="/" element={user?<Home />:  <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  position: fixed;  
  width: 100vw;  
  height: 100vh;  
  background-size: cover;  
  z-index: -1;
`;

export default App;
