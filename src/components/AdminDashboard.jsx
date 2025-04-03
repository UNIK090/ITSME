import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.primary};
  
  span {
    color: ${props => props.theme.text};
  }
`;

const LogoutButton = styled(motion.button)`
  background: transparent;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: rgba(255, 0, 102, 0.1);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(255, 0, 102, 0.2)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#ff0066' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#aaa'};
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const ContentSection = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ff0066;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SkillTag = styled.div`
  background: rgba(255, 0, 102, 0.1);
  border: 1px solid rgba(255, 0, 102, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff3333;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddSkillContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SaveButton = styled(motion.button)`
  background: #ff0066;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #d80057;
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(0, 255, 0, 0.1);
  color: #00ff00;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
`;

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

// Remove this if you don't need it
// const AddProjectButton = styled(motion.button)`
//   background: rgba(255, 0, 102, 0.2);
//   border: 1px dashed #ff0066;
//   color: #fff;
//   padding: 1.5rem;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 1rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   height: 100%;
//   
//   &:hover {
//     background: rgba(255, 0, 102, 0.3);
//   }
// `;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  position: relative;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const ProjectLink = styled.a`
  color: #ff0066;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #ff3333;
  cursor: pointer;
  font-size: 1rem;
`;

// DELETE THIS ENTIRE BLOCK - COMPLETELY REMOVE IT
// const AddProjectButton = styled(motion.button)`
//   background: rgba(255, 0, 102, 0.2);
//   border: 1px dashed #ff0066;
//   color: #fff;
//   padding: 1.5rem;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 1rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   height: 100%;
//   
//   &:hover {
//     background: rgba(255, 0, 102, 0.3);
//   }
// `;

const VideoPreview = styled.div`
  margin-top: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  max-width: 600px;
`;

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [aboutContent, setAboutContent] = useState({
    bio: '',
    approach: '',
    skills: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    image: ''
  });
  const [videoSource, setVideoSource] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAboutContent = localStorage.getItem('aboutContent');
    if (savedAboutContent) {
      try {
        setAboutContent(JSON.parse(savedAboutContent));
      } catch (e) {
        console.error("Error parsing about content", e);
      }
    }
    
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Error parsing projects", e);
      }
    }
    
    const savedVideoSource = localStorage.getItem('introVideoSource');
    if (savedVideoSource) {
      setVideoSource(savedVideoSource);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    onLogout();
  };
  
  const addSkill = () => {
    if (newSkill.trim() !== '' && !aboutContent.skills.includes(newSkill.trim())) {
      setAboutContent({
        ...aboutContent,
        skills: [...aboutContent.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove) => {
    setAboutContent({
      ...aboutContent,
      skills: aboutContent.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const saveProfile = () => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    showSuccessMessage('Profile updated successfully!');
  };
  
  const addProject = () => {
    if (newProject.title.trim() !== '' && newProject.description.trim() !== '') {
      const updatedProjects = [...projects, { ...newProject, id: Date.now() }];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setNewProject({ title: '', description: '', link: '', image: '' });
      showSuccessMessage('Project added successfully!');
    }
  };
  
  const removeProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    showSuccessMessage('Project removed successfully!');
  };
  
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Remove the unused state setter
      // setNewVideoFile(file);
      
      // Create a local URL for the video
      const localUrl = URL.createObjectURL(file);
      setVideoSource(localUrl);
    }
  };
  
  const saveVideo = () => {
    // In a real app, you'd upload the video to a server/storage
    // and save the URL to your database
    
    // For demo purposes, we'll just save the current videoSource to localStorage
    localStorage.setItem('introVideoSource', videoSource);
    showSuccessMessage('Video updated successfully!');
  };
  
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  return (
    <DashboardContainer>
      <Header>
        <Title>Admin <span>Dashboard</span></Title>
        <LogoutButton 
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </LogoutButton>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Tab>
        <Tab 
          active={activeTab === 'projects'} 
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </Tab>
        <Tab 
          active={activeTab === 'video'} 
          onClick={() => setActiveTab('video')}
        >
          Intro Video
        </Tab>
      </TabsContainer>
      
      {activeTab === 'profile' && (
        <ContentSection>
          <SectionTitle>Edit Profile</SectionTitle>
          
          <FormGroup>
            <FormLabel>Bio</FormLabel>
            <FormTextarea 
              value={aboutContent.bio}
              onChange={(e) => setAboutContent({ ...aboutContent, bio: e.target.value })}
              placeholder="Enter your bio..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Approach</FormLabel>
            <FormTextarea 
              value={aboutContent.approach}
              onChange={(e) => setAboutContent({ ...aboutContent, approach: e.target.value })}
              placeholder="Describe your approach..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Skills</FormLabel>
            <SkillsContainer>
              {aboutContent.skills.map((skill, index) => (
                <SkillTag key={index}>
                  {skill}
                  <RemoveButton onClick={() => removeSkill(skill)}>
                    <FaTrash />
                  </RemoveButton>
                </SkillTag>
              ))}
            </SkillsContainer>
            
            <AddSkillContainer>
              <FormInput 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <SaveButton 
                onClick={addSkill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Skill
              </SaveButton>
            </AddSkillContainer>
          </FormGroup>
          
          <SaveButton 
            onClick={saveProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Profile
          </SaveButton>
          
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </ContentSection>
      )}
      
      {activeTab === 'projects' && (
        <ContentSection>
          <SectionTitle>Manage Projects</SectionTitle>
          
          <FormGroup>
            <FormLabel>Project Title</FormLabel>
            <FormInput 
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Enter project title..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Project Description</FormLabel>
            <FormTextarea 
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe the project..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Project Link</FormLabel>
            <FormInput 
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="Enter project URL..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Project Image URL</FormLabel>
            <FormInput 
              value={newProject.image}
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              placeholder="Enter image URL..."
            />
          </FormGroup>
          
          <SaveButton 
            onClick={addProject}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Project
          </SaveButton>
          
          <ProjectsContainer>
            {projects.map(project => (
              <ProjectCard key={project.id}>
                <DeleteButton onClick={() => removeProject(project.id)}>
                  <FaTrash />
                </DeleteButton>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                {project.link && (
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </ProjectLink>
                )}
              </ProjectCard>
            ))}
          </ProjectsContainer>
          
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </ContentSection>
      )}
      
      {activeTab === 'video' && (
        <ContentSection>
          <SectionTitle>Update Intro Video</SectionTitle>
          
          <FormGroup>
            <FormLabel>Upload Video</FormLabel>
            <FormInput 
              type="file" 
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </FormGroup>
          
          {videoSource && (
            <VideoPreview>
              <video 
                src={videoSource} 
                controls 
                width="100%" 
                height="auto"
              />
            </VideoPreview>
          )}
          
          <SaveButton 
            onClick={saveVideo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!videoSource}
          >
            Save Video
          </SaveButton>
          
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </ContentSection>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;