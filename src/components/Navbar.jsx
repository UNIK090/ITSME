import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: background-color 0.3s ease;
  background-color: ${props => props.$scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const NavLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  
  span {
    color: #ff0066;
  }
`;

const LogoText = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  
  span {
    color: #ff0066;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #ff0066;
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    padding: 5rem 2rem;
    z-index: 99;
  }
`;

const MobileNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  
  &.active {
    color: #ff0066;
  }
`;

const AdminButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const MobileAdminButton = styled.button`
  width: 100%;
  padding: 1rem;
  text-align: center;
  background: transparent;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  font-size: 1.2rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const handleAdminClick = () => {
    navigate('/admin');
  };
  
  return (
    <NavContainer $scrolled={scrolled}>
      <NavLogo to="/">
        <LogoText>Praveen<span>Chary</span></LogoText>
      </NavLogo>
      
      <NavLinks>
        <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
        <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</NavLink>
        <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</NavLink>
        
        {/* Admin button */}
        <AdminButton onClick={handleAdminClick}>Admin</AdminButton>
      </NavLinks>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <MobileMenu 
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      >
        <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
        <MobileNavLink to="/projects" onClick={closeMobileMenu}>Projects</MobileNavLink>
        <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
        
        {/* Admin button for mobile menu */}
        <MobileAdminButton onClick={() => {
          closeMobileMenu();
          navigate('/admin');
        }}>Admin</MobileAdminButton>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navbar;