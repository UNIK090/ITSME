import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow: hidden;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectsTitle = styled(motion.h1)`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  z-index: 10;
  text-align: center;
  
  span {
    color: #ff0066;
  }
`;

const ProjectCard = styled(motion.div)`
  position: absolute;
  width: 80%;
  max-width: 1000px;
  height: 70vh;
  background: rgba(20, 20, 20, 0.8);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProjectTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProjectNumber = styled.span`
  font-size: 8rem;
  font-weight: 800;
  color: rgba(255, 0, 102, 0.2);
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectDescription = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 0, 102, 0.2), transparent);
  }
`;

const TechStack = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 0, 102, 0.2);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.9rem;
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
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
    border: 1px solid #fff;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
    }
  }
`;

const BackgroundElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 0, 102, 0.2) 0%, rgba(255, 0, 102, 0) 70%);
`;

const NavigationControls = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 102, 0.5);
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const ProjectIndicators = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff0066' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [circles, setCircles] = useState([]);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  
  // Projects data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Personal Assistant",
      description: "Developed a voice-controlled personal assistant using natural language processing to handle tasks like scheduling, reminders, and information retrieval. Implemented with advanced speech recognition and machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      techStack: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "AWS"],
      liveLink: "https://ai-assistant-demo.herokuapp.com",
      codeLink: "https://github.com/UNIK090/ai-assistant",
    },
    {
      id: 2,
      title: "Blockchain-based Supply Chain",
      description: "Created a transparent supply chain management system using blockchain technology to track products from manufacturer to consumer. Features include QR code scanning, real-time tracking, and immutable transaction records.",
      image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      techStack: ["Solidity", "Ethereum", "React", "Web3.js", "Node.js", "Express"],
      liveLink: "https://blockchain-supply.netlify.app",
      codeLink: "https://github.com/UNIK090/blockchain-supply",
    },
    {
      id: 3,
      title: "Immersive 3D Portfolio",
      description: "Designed and developed an interactive 3D portfolio website with WebGL and Three.js. Features include 3D model interactions, particle effects, and smooth camera transitions between different sections of the portfolio.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      techStack: ["Three.js", "JavaScript", "GLSL", "React", "Framer Motion", "Blender"],
      liveLink: "https://3d-portfolio-demo.vercel.app",
      codeLink: "https://github.com/UNIK090/3d-portfolio",
    },
    {
      id: 4,
      title: "Real-time Collaborative Editor",
      description: "Built a collaborative code and document editor with real-time synchronization, allowing multiple users to edit simultaneously. Includes features like syntax highlighting, version history, and video chat integration.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      techStack: ["Socket.io", "React", "Redux", "MongoDB", "Express", "WebRTC"],
      liveLink: "https://collab-editor.herokuapp.com",
      codeLink: "https://github.com/UNIK090/collab-editor",
    }
  ];
  
  useEffect(() => {
    // Generate random background circles
    const newCircles = [];
    for (let i = 0; i < 5; i++) {
      newCircles.push({
        id: i,
        size: Math.random() * 300 + 100,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 20 + 10,
      });
    }
    setCircles(newCircles);
  }, []);
  
  const nextProject = () => {
    setDirection(1);
    setActiveProject((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setDirection(-1);
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  const goToProject = (index) => {
    setDirection(index > activeProject ? 1 : -1);
    setActiveProject(index);
  };
  
  // Variants for animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };
  
  return (
    <ProjectsContainer>
      <BackgroundElements>
        {circles.map(circle => (
          <BackgroundCircle
            key={circle.id}
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.left,
              top: circle.top,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </BackgroundElements>
      
      <StickyContainer>
        <ProjectsTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span>Projects</span>
        </ProjectsTitle>
        
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeProject}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ProjectCard>
              <ProjectHeader>
                <ProjectTitle
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {projects[activeProject].title}
                </ProjectTitle>
                <ProjectNumber>{projects[activeProject].id.toString().padStart(2, '0')}</ProjectNumber>
              </ProjectHeader>
              
              <ProjectContent>
                <ProjectDescription
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p>{projects[activeProject].description}</p>
                  
                  <TechStack
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {projects[activeProject].techStack.map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  
                  <ProjectLinks
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <ProjectLink href={projects[activeProject].liveLink} target="_blank" className="primary">
                      Live Demo
                    </ProjectLink>
                    <ProjectLink href={projects[activeProject].codeLink} target="_blank" className="secondary">
                      View Code
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectDescription>
                
                <ProjectImage
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={projects[activeProject].image} alt={projects[activeProject].title} />
                </ProjectImage>
              </ProjectContent>
            </ProjectCard>
          </motion.div>
        </AnimatePresence>
        
        <NavigationControls>
          <NavButton onClick={prevProject} disabled={activeProject === 0}>
            &#8592;
          </NavButton>
          <NavButton onClick={nextProject} disabled={activeProject === projects.length - 1}>
            &#8594;
          </NavButton>
        </NavigationControls>
        
        <ProjectIndicators>
          {projects.map((_, index) => (
            <Indicator 
              key={index} 
              active={index === activeProject} 
              onClick={() => goToProject(index)}
            />
          ))}
        </ProjectIndicators>
      </StickyContainer>
    </ProjectsContainer>
  );
};

export default Projects;