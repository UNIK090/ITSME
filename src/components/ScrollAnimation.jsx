import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

const AnimatedSection = styled(motion.div)`
  width: 100%;
  margin: 2rem 0;
`;

const ScrollAnimation = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  const variants = {
    hidden: {
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      opacity: 0
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.1, 0.25, 0.3, 1]
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <AnimatedSection
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </AnimatedSection>
  );
};

export default ScrollAnimation;