import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const LoginForm = styled(motion.form)`
  background: ${props => props.theme.card};
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: ${props => props.theme.cardShadow};
`;

const Title = styled.h1`
  color: ${props => props.theme.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  text-align: center;
  margin-bottom: 1rem;
`;

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simple authentication - in a real app, use a secure backend
    // This is just for demonstration purposes
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        onLogin();
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <LoginContainer>
      <LoginForm 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Admin Login</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default AdminLogin;