import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5rem 5rem;
  background: #000;
  color: #fff;

  @media (max-width: 768px) {
    padding: 120px 2rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: #ff0066;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
`;

const AboutImage = styled(motion.div)`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Removing the color overlay effect */
  &::before {
    content: none;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ff0066;
`;

const SkillDescription = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 1rem;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: #ff0066;
`;

const ExperienceContainer = styled.div`
  margin-top: 5rem;
`;

const TimelineContainer = styled.div`
  margin-top: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TimelineItem = styled(motion.div)`
  padding-left: 2rem;
  position: relative;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff0066;
  }
`;

const TimelineDate = styled.span`
  font-size: 0.9rem;
  color: #ff0066;
  font-weight: 600;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const TimelineCompany = styled.h4`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
`;

const About = () => {
  const [refTitle, inViewTitle] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refContent, inViewContent] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refSkills, inViewSkills] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [refExperience, inViewExperience] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "Frontend Development", level: 90, description: "React, Vue, Angular, HTML, CSS, JavaScript" },
    { name: "Backend Development", level: 85, description: "Node.js, Express, Django, Flask, PHP" },
    { name: "Mobile Development", level: 80, description: "React Native, Flutter, Swift" },
    { name: "UI/UX Design", level: 75, description: "Figma, Adobe XD, Sketch, Photoshop" },
    { name: "Database", level: 85, description: "MongoDB, MySQL, PostgreSQL, Firebase" },
    { name: "DevOps", level: 70, description: "Docker, Kubernetes, AWS, CI/CD" },
  ];

  const experiences = [
    {
      date: "2021 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      description: "Leading the frontend development team, implementing new features, and optimizing performance for web applications."
    },
    {
      date: "2018 - 2021",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      description: "Developed and maintained full-stack applications using React, Node.js, and MongoDB. Collaborated with design and product teams."
    },
    {
      date: "2016 - 2018",
      title: "Junior Web Developer",
      company: "Creative Web Agency",
      description: "Created responsive websites and implemented UI designs using HTML, CSS, and JavaScript."
    }
  ];

  return (
    <AboutContainer>
      <SectionTitle
        ref={refTitle}
        initial={{ opacity: 0, x: -50 }}
        animate={inViewTitle ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        About Me
      </SectionTitle>

      <AboutContent ref={refContent}>
        <AboutText
          initial={{ opacity: 0, y: 50 }}
          animate={inViewContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p>
            Hello! I'm a passionate developer with a strong focus on creating beautiful, functional, and user-friendly digital experiences. With over 5 years of experience in web and mobile development, I've had the opportunity to work on a wide range of projects from small business websites to large-scale enterprise applications.
          </p>
          <p style={{ marginTop: '1rem' }}>
            My journey in tech began when I was just a teenager, tinkering with HTML and CSS to create simple websites. That curiosity evolved into a deep passion for coding and problem-solving. I believe in continuous learning and staying updated with the latest technologies and best practices.
          </p>
          <p style={{ marginTop: '1rem' }}>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and tutorials. I'm always open to new challenges and opportunities to grow as a developer.
          </p>
        </AboutText>

        <AboutImage
          initial={{ opacity: 0, y: 50 }}
          animate={inViewContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Replace with your actual photo */}
          <img src="/P1.JPG" alt="Valaboju Praveen Chary" />
        </AboutImage>
      </AboutContent>

      <SkillsContainer ref={refSkills}>
        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          animate={inViewSkills ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </SectionTitle>

        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inViewSkills ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillTitle>{skill.name}</SkillTitle>
              <SkillDescription>{skill.description}</SkillDescription>
              <ProgressBar>
                <Progress
                  initial={{ width: 0 }}
                  animate={inViewSkills ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </ProgressBar>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsContainer>

      <ExperienceContainer ref={refExperience}>
        <SectionTitle
          initial={{ opacity: 0, x: -50 }}
          animate={inViewExperience ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Experience
        </SectionTitle>

        <TimelineContainer>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inViewExperience ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineDate>{exp.date}</TimelineDate>
              <TimelineTitle>{exp.title}</TimelineTitle>
              <TimelineCompany>{exp.company}</TimelineCompany>
              <TimelineDescription>{exp.description}</TimelineDescription>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ExperienceContainer>
    </AboutContainer>
  );
};

export default About;