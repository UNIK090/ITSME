import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AskMeAnything from '../components/AskMeAnything';
import InteractiveAvatar from '../components/InteractiveAvatar';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.4);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
  max-width: 800px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ccc;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: #ff0066;
    color: #fff;
    
    &:hover {
      background: #d80057;
      transform: translateY(-3px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
    }
  }
`;

const MuteButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(255, 0, 102, 0.5);
  }
`;

// Remove the AdminLink styled component

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <HomeContainer>
      <HeroSection>
        <VideoBackground 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
        >
          <source src="/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
        
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span style={{ color: '#ff0066' }}>Valaboju Praveen Chary</span>
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A passionate developer focused on creating beautiful, functional, and user-friendly digital experiences.
          </HeroSubtitle>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button to="/projects" className="primary">View My Work</Button>
            <Button to="/about" className="secondary">Profile</Button>
          </ButtonContainer>
        </HeroContent>
        
        <MuteButton onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </MuteButton>
      </HeroSection>
      
      <AskMeAnything />
      
      {/* Remove the AdminLink component */}
      
      <InteractiveAvatar />
    </HomeContainer>
  );
};

export default Home;