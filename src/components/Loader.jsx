import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderText = styled(motion.h1)`
  color: #fff;
  font-size: 5rem;
  font-weight: 800;
  position: relative;
  overflow: hidden;
`;

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const textVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: {
      y: 400,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  const letters = "WELCOME TO MY WORLD".split("");

  return (
    <LoaderContainer>
      <LoaderText
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: 'inline-block', marginRight: letter === ' ' ? '1rem' : '0.1rem' }}
          >
            {letter}
          </motion.span>
        ))}
      </LoaderText>
    </LoaderContainer>
  );
};

export default Loader;