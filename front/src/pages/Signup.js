// src/pages/Signup.js
import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import styled from 'styled-components';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
    // Optionally, you can reset form fields upon successful signup
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <SignupFormStyled className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input
        type="text"
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Email:</label>
      <input
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SignupFormStyled>
  );
};

const SignupFormStyled = styled.form`
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

const ErrorMessage = styled.div`
  color: red;
  border: 1px solid red;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  width: 100%;
  text-align: center;
`;

export default Signup;
