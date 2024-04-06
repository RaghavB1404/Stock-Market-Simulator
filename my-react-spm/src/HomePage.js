import React from 'react';
import { Link } from 'react-router-dom';

const homePageStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/spm_theme.jpeg)`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const buttonStyle = {
  width: '200px',
  padding: '10px',
  margin: '10px',
  background: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  textDecoration: 'none', // Remove underline from Link
  textAlign: 'center',
};

const HomePage = () => {
  return (
    <div style={homePageStyle}>
      <Link to="/login" style={buttonStyle}>
        Login
      </Link>
      <Link to="/signup" style={buttonStyle}>
        Sign Up
      </Link>
    </div>
  );
};

export default HomePage;
