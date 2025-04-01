import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  background-color: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  
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

// Removed AdminButton and MobileAdminButton styled components

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
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
  
  return (
    <>
      <NavContainer scrolled={scrolled}>
        <Logo to="/">
          Port<span>folio</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Projects
          </NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavLink>
          {/* Removed AdminButton */}
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
      
      <MobileMenu
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
      >
        <MobileNavLink 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Projects
        </MobileNavLink>
        <MobileNavLink 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </MobileNavLink>
        {/* Removed MobileAdminButton */}
      </MobileMenu>
    </>
  );
};

export default Navbar;