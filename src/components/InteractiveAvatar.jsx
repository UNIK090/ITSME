import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled components for the avatar
const AvatarContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  cursor: pointer;
`;

const Avatar = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff0066, #ff9900);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(255, 0, 102, 0.4);
  overflow: hidden;
  position: relative;
`;

const AvatarFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AvatarEyes = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
`;

const AvatarEye = styled(motion.div)`
  width: 10px;
  height: ${props => props.blinking ? '1px' : '10px'};
  background-color: white;
  border-radius: 50%;
`;

const AvatarMouth = styled(motion.div)`
  width: 20px;
  height: 10px;
  background-color: white;
  border-radius: ${props => props.speaking ? '5px' : '10px 10px 20px 20px'};
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 15px;
  max-width: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(0, 0, 0, 0.8);
  }
`;

const InteractiveAvatar = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  
  // Memoize the messages array so it doesn't change on every render
  const messages = useMemo(() => [
    "Hi there! Welcome to my portfolio!",
    "Feel free to explore my projects!",
    "Check out my skills and experience!",
    "Have questions? Use the chat feature!",
    "Thanks for visiting my website!",
    "I'm passionate about creating amazing digital experiences!",
    "Want to connect? Find my social links in the chat!",
  ], []);
  
  // Memoize the handleAvatarClick function
  const handleAvatarClick = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Select a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowBubble(true);
    setIsSpeaking(true);
    
    // Hide the bubble after a delay
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
      setIsSpeaking(false);
    }, 5000);
  }, [messages]);
  
  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000); // Random blink interval
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Initial greeting
  useEffect(() => {
    // Wait a moment before showing the initial greeting
    const timer = setTimeout(() => {
      handleAvatarClick();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [handleAvatarClick]); // Now this is safe to use as a dependency
  
  return (
    <AvatarContainer
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleAvatarClick}
    >
      <Avatar
        animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <AvatarFace>
          <AvatarEyes>
            <AvatarEye blinking={isBlinking} />
            <AvatarEye blinking={isBlinking} />
          </AvatarEyes>
          <AvatarMouth 
            speaking={isSpeaking}
            animate={isSpeaking ? { 
              height: ["10px", "5px", "10px", "5px"],
              width: ["20px", "15px", "20px", "15px"]
            } : {}}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        </AvatarFace>
      </Avatar>
      
      <AnimatePresence>
        {showBubble && (
          <SpeechBubble
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </SpeechBubble>
        )}
      </AnimatePresence>
    </AvatarContainer>
  );
};

export default InteractiveAvatar;