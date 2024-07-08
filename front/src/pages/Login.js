// src/pages/Login.js
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import styled from 'styled-components';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <LoginFormStyled className='login' onSubmit={handleLogin}>
      <h3>Login</h3>
      <label>Username: </label>
      <input
        type="text"
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password: </label>
      <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Log In</button>
      {error && <ErrorStyled>{error}</ErrorStyled>}
    </LoginFormStyled>
  );
};

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;

  h3 {
    margin-bottom: 1.5rem;
    color: #333;
  }

  label {
    align-self: flex-start;
    margin-bottom: 0.5rem;
    color: #666;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      outline: none;
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ErrorStyled = styled.div`
  color: #ff0000; /* Red text color */
  background-color: #ffe5e5; /* Light red background */
  border: 1px solid #ff0000; /* Red border */
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

export default Login;
