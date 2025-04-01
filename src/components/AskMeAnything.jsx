import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import OpenAI from 'openai';

const AskMeContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ff0066;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.4);
  font-size: 1.5rem;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 450px;
  background: rgba(20, 20, 20, 0.95);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: rgba(255, 0, 102, 0.8);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
  
  &.user {
    align-self: flex-end;
    background: rgba(255, 0, 102, 0.2);
    color: white;
    border-bottom-right-radius: 5px;
  }
  
  &.bot {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-bottom-left-radius: 5px;
  }
`;

const ChatInput = styled.div`
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  background: #ff0066;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #d80057;
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 0.3rem;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  
  span {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: inline-block;
    animation: typing 1s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes typing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

// Add these new styled components after your existing styled components
const SocialLinksContainer = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

const SocialLink = styled(motion.button)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: #ff0066;
  }
`;

const SocialPopup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled(motion.div)`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(255, 0, 102, 0.3);
  border: 1px solid rgba(255, 0, 102, 0.2);
  color: white;
`;

const PopupTitle = styled.h2`
  margin-top: 0;
  color: #ff0066;
  font-size: 1.8rem;
`;

const PopupDescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const PopupButton = styled(motion.button)`
  background: #ff0066;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  
  &:hover {
    background: #d80057;
  }
`;

const AskMeAnything = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your AI assistant. Ask me anything about Valaboju Praveen Chary or check out his social profiles below!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Add this new state variable
  const [activePopup, setActivePopup] = useState(null);
  
  // Initialize OpenAI client with the API key from environment variables
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // For development/testing without API key, use a mock response
      // This will ensure the bot always responds even without an API key
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        setTimeout(() => {
          const mockResponses = {
            skills: "Praveen is skilled in React, JavaScript, Node.js, and modern web technologies. He specializes in frontend development and UI/UX design with strong backend knowledge.",
            experience: "Praveen has over 5 years of experience in web and mobile development, working on various projects including web applications, mobile apps, and interactive interfaces.",
            education: "Praveen graduated with a degree in Computer Science and continues to learn new technologies and frameworks.",
            default: "I'm Praveen's portfolio assistant. Praveen is a passionate developer focused on creating beautiful, functional digital experiences. Feel free to ask more specific questions about his skills, projects, or experience!"
          };
          
          // Simple keyword matching for demo purposes
          let responseText = mockResponses.default;
          const inputLower = input.toLowerCase();
          
          if (inputLower.includes('skill') || inputLower.includes('tech') || inputLower.includes('know')) {
            responseText = mockResponses.skills;
          } else if (inputLower.includes('experience') || inputLower.includes('work') || inputLower.includes('job')) {
            responseText = mockResponses.experience;
          } else if (inputLower.includes('education') || inputLower.includes('study') || inputLower.includes('degree')) {
            responseText = mockResponses.education;
          }
          
          setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
          setIsTyping(false);
        }, 1000);
        
        return;
      }
      
      // Original OpenAI API call code
      const context = `You are a helpful AI assistant embedded on Valaboju Praveen Chary's personal website. 
      
      About Valaboju Praveen Chary:
      - He is a passionate developer focused on creating beautiful, functional digital experiences
      - He has expertise in React, JavaScript, Node.js, and modern web technologies
      - He specializes in frontend development and UI/UX design with strong backend knowledge
      - He has worked on various projects including web applications, mobile apps, and interactive interfaces
      - He combines technical expertise with an eye for design and user experience
      - He has over 5 years of experience in web and mobile development
      - He graduated with a degree in Computer Science
      - He is passionate about creating accessible and user-friendly applications
      - His portfolio showcases projects in React, Node.js, and full-stack development
      - He is constantly learning new technologies and frameworks
      
      When users ask questions about Praveen, his skills, experience, or background, provide detailed and personalized responses based on this information. For technical questions, highlight his expertise in the relevant areas. For other general questions, respond helpfully like a knowledgeable assistant would.`;
      
      // Rest of the function looks correct for API call and response handling
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: input
      });
      
      // Add system message with context
      conversationHistory.unshift({
        role: 'system',
        content: context
      });
      
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
        max_tokens: 500
      });
      
      // Get the response
      const botResponse = completion.choices[0].message.content;
      
      // Add bot message
      const botMessage = { 
        text: botResponse, 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // Add error message
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        sender: 'bot' 
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Add these new functions
  const handleSocialClick = (platform) => {
    setActivePopup(platform);
  };
  
  const closePopup = () => {
    setActivePopup(null);
  };
  
  const goToSocialProfile = (url) => {
    window.open(url, '_blank');
    closePopup();
  };
  
  // Social profiles data
  const socialProfiles = {
    github: {
      url: 'https://github.com/UNIK090',
      title: 'GitHub Profile',
      description: 'Check out my code repositories, open-source contributions, and development projects.',
      icon: '💻'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/valaboju-praveen-chary-9295b7280/',
      title: 'LinkedIn Profile',
      description: 'Connect with me professionally and explore my work experience and skills.',
      icon: '🔗'
    },
    twitter: {
      url: 'https://twitter.com/praveenchary',
      title: 'Twitter Profile',
      description: 'Follow me for updates on my latest projects, tech insights, and professional journey.',
      icon: '🐦'
    },
    instagram: {
      url: 'https://www.instagram.com/praveen_unik/',
      title: 'Instagram Profile',
      description: 'See the creative side of my life and work through visual stories.',
      icon: '📸'
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  return (
    <AskMeContainer>
      <ChatButton 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '✕' : '?'}
      </ChatButton>
      
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <ChatTitle>Ask Me Anything</ChatTitle>
              <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
            </ChatHeader>
            
            <ChatMessages>
              {messages.map((message, index) => (
                <Message 
                  key={index} 
                  className={message.sender}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text}
                </Message>
              ))}
              
              {isTyping && (
                <TypingIndicator>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingIndicator>
              )}
              
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            {/* Add the social links container here */}
            <SocialLinksContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {Object.entries(socialProfiles).map(([platform, data]) => (
                <SocialLink 
                  key={platform}
                  onClick={() => handleSocialClick(platform)}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, -10, 0],
                    boxShadow: '0 0 15px rgba(255, 0, 102, 0.7)' 
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {data.icon}
                </SocialLink>
              ))}
            </SocialLinksContainer>
            
            <ChatInput>
              <Input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleSend} disabled={!input.trim()}>
                ➤
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
      
      {/* Add the social popup */}
      <AnimatePresence>
        {activePopup && (
          <SocialPopup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PopupContent
              initial={{ scale: 0.5, y: 100, rotate: -5 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                rotate: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                } 
              }}
              exit={{ 
                scale: 0.5, 
                y: 100, 
                rotate: 5,
                transition: { duration: 0.3 } 
              }}
            >
              <PopupTitle>{socialProfiles[activePopup].title}</PopupTitle>
              <PopupDescription>{socialProfiles[activePopup].description}</PopupDescription>
              
              <PopupButton 
                onClick={() => goToSocialProfile(socialProfiles[activePopup].url)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Profile
              </PopupButton>
              
              <PopupButton 
                onClick={closePopup}
                style={{ background: 'rgba(255, 255, 255, 0.1)', marginLeft: '1rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </PopupButton>
            </PopupContent>
          </SocialPopup>
        )}
      </AnimatePresence>
    </AskMeContainer>
  );
};

export default AskMeAnything;