import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faParticles, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const ToggleContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToggleButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ThemeToggle = ({ toggleTheme, currentTheme, toggleParticles }) => {
  return (
    <ToggleContainer>
      <ToggleButton
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={currentTheme === 'light' ? faMoon : faSun} />
      </ToggleButton>
      
      <ToggleButton
        onClick={toggleParticles}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faSnowflake} />
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;