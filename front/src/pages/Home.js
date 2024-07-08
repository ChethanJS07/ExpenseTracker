// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MainLayout } from '../styles/Layouts';
import Navigation from '../Components/Navigation/Navigation';
import Income from '../Components/Income/Income';
import Dashboard from '../Components/Dashboard/Dashboard';
import Expenses from '../Components/Expenses/Expenses';
import YourTransactions from '../Components/YourTransactions/YourTransactions';
import { useGlobalContext } from '../context/globalContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import bg from '../img/bg.png';

function Home() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login page if user is not authenticated
    }
  }, [user, navigate]);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <YourTransactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) return null; // Return null if user is not authenticated to prevent rendering

  return (
    <HomeStyled bg={bg}>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  position: fixed;  
  width: 100vw;  
  height: 100vh;  
  background-image: url(${props => props.bg});
  background-size: cover;  
  z-index: -1; 
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;
