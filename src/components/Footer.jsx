import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeHigh, 
  faVolumeMute,
  faEnvelope // Add this import for the envelope icon
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  background-color: #111;
  padding: 2rem 5rem;
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #aaa;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: #fff;
    background: #ff0066;
    transform: translateY(-5px);
  }
`;

const VideoButton = styled.button`
  background: transparent;
  border: 1px solid #ff0066;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(255, 0, 102, 0.2);
  }
`;

const VideoModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  
  &:hover {
    color: #ff0066;
  }
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1001;
`;

const ControlButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 0, 102, 0.5);
  }
`;

const ContactSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ContactTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #fff;
  text-align: center;
  
  span {
    color: #ff0066;
  }
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 0 2px rgba(255, 0, 102, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 0 2px rgba(255, 0, 102, 0.2);
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background: #ff0066;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem auto 0;
  display: block;
  
  &:hover {
    background: #d80057;
    transform: translateY(-3px);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  
  &.success {
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
  }
  
  &.error {
    background: rgba(255, 0, 0, 0.1);
    color: #ff0000;
  }
`;

// Add this new styled component for the two-column layout
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutSection = styled.div`
  color: #f5f5f5;
`;

const AboutTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #ff0066;
`;

const AboutText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const SkillTag = styled.li`
  background: rgba(255, 0, 102, 0.1);
  border: 1px solid rgba(255, 0, 102, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Footer = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoSource, setVideoSource] = useState("/V!.mp4");
  const [aboutContent, setAboutContent] = useState({
    bio: "I'm Valaboju Praveen Chary, a passionate web developer with a keen eye for creating beautiful, functional digital experiences. With over 5 years of experience in web development, I specialize in building modern, responsive websites and applications.",
    approach: "My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations. I believe in clean code, user-centered design, and continuous learning.",
    skills: ["React", "JavaScript", "HTML5/CSS3", "Node.js", "UI/UX Design", "Responsive Design", "Three.js", "Framer Motion"]
  });
  const formRef = useRef();
  
  // Fetch content from localStorage on component mount
  useEffect(() => {
    // Load video source
    const savedVideoSource = localStorage.getItem('introVideoSource');
    if (savedVideoSource) {
      setVideoSource(savedVideoSource);
    }
    
    // Load about content
    const savedAboutContent = localStorage.getItem('aboutContent');
    if (savedAboutContent) {
      try {
        setAboutContent(JSON.parse(savedAboutContent));
      } catch (e) {
        console.error("Error parsing about content", e);
      }
    }
    
    // In a real implementation, you would fetch from Firebase/backend here
    // Example: 
    // import { db } from '../firebase';
    // db.collection('settings').doc('video').get().then(doc => {
    //   if (doc.exists) setVideoSource(doc.data().source);
    // });
  }, []);
  
  const toggleMute = () => {
    const video = document.getElementById('intro-video');
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace these with your actual EmailJS service ID, template ID, and user ID
    const serviceId = 'service_iouvct8';
    const templateId = 'template_cm51pnl';
    const userId = 'yPR8lDbS5iCw9Tm0u';
    
    emailjs.sendForm(serviceId, templateId, formRef.current, userId)
      .then((result) => {
        setFormStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        formRef.current.reset();
        setIsSubmitting(false);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus(null);
        }, 5000);
      }, (error) => {
        setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        setIsSubmitting(false);
      });
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <Copyright>
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </Copyright>
          <VideoButton onClick={() => setShowVideo(true)}>
            Watch My Introduction
          </VideoButton>
        </div>
        
        <SocialLinks>
          <SocialLink 
            href="https://github.com/UNIK090" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </SocialLink>
          <SocialLink 
            href="https://www.linkedin.com/in/valaboju-praveen-chary-9295b7280/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialLink>
          <SocialLink 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </SocialLink>
          <SocialLink 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </SocialLink>
          {/* Add Gmail icon */}
          <SocialLink 
            href="mailto:praveenchary@gmail.com" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </SocialLink>
        </SocialLinks>
      </FooterContent>
      
      <ContactSection>
        <ContactTitle>
          Connect <span>With Me</span>
        </ContactTitle>
        
        {/* Replace the form with a two-column layout */}
        <ContactGrid>
          <AboutSection>
            <AboutTitle>About Me</AboutTitle>
            <AboutText>
              {aboutContent.bio}
            </AboutText>
            <AboutText>
              {aboutContent.approach}
            </AboutText>
            <AboutTitle>My Skills</AboutTitle>
            <SkillsList>
              {aboutContent.skills.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </AboutSection>
          
          <ContactForm ref={formRef} onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" name="name" required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" name="email" required />
            </FormGroup>
            <FormGroup className="full-width">
              <FormLabel>Subject</FormLabel>
              <FormInput type="text" name="subject" required />
            </FormGroup>
            <FormGroup className="full-width">
              <FormLabel>Message</FormLabel>
              <FormTextarea name="message" required></FormTextarea>
            </FormGroup>
            
            {formStatus && (
              <FormMessage className={formStatus.type}>
                {formStatus.message}
              </FormMessage>
            )}
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </ContactSection>
      
      <AnimatePresence>
        {showVideo && (
          <VideoModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setShowVideo(false)}>✕</CloseButton>
            <VideoContainer>
              <video 
                id="intro-video"
                width="100%" 
                height="auto" 
                autoPlay 
                muted={isMuted}
                controls={false}
                loop
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <VideoControls>
                <ControlButton onClick={toggleMute}>
                  {isMuted ? 
                    <FontAwesomeIcon icon={faVolumeMute} /> : 
                    <FontAwesomeIcon icon={faVolumeHigh} />
                  }
                </ControlButton>
              </VideoControls>
            </VideoContainer>
          </VideoModal>
        )}
      </AnimatePresence>
    </FooterContainer>
  );
};

export default Footer;