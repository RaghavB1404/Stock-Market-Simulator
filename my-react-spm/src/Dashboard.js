// import React from 'react';
// import { Link } from 'react-router-dom';

// const homePageStyle = {
//   backgroundImage: `url(${process.env.PUBLIC_URL}/spm_theme.jpeg)`,
//   backgroundSize: 'cover',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
// };

// const buttonStyle = {
//   width: '200px',
//   padding: '10px',
//   margin: '10px',
//   background: '#3498db',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   textDecoration: 'none', // Remove underline from Link
//   textAlign: 'center',
// };

// const linkStyle = {
//   fontSize: '14px',
//   color: 'blue',
//   textDecoration: 'underline',
//   margin: '5px', // Adjusted margin for spacing between links
//   display: 'inline-block', // Align links horizontally
// };

// const Dashboard = () => {
//   return (
//     <div style={homePageStyle}>
//       <Link to="/Portfolio" style={buttonStyle}>
//         Portfolio
//       </Link>
//       <Link to="/Buy" style={buttonStyle}>
//         Buy
//       </Link>
//       <Link to="/Sell" style={buttonStyle}>
//         Sell
//       </Link>
//       <a href="http://localhost:3000/Dashboard" style={linkStyle}>
//         Home
//       </a>
//       <a href="http://localhost:3000/AboutUs" style={linkStyle}>
//         About us & Contact us
//       </a>
//       <a href="http://localhost:3000/Feedback" style={linkStyle}>
//         Feedback
//       </a>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Link } from 'react-router-dom';

const videoStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
};

const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
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

const redBoxContainerStyle = {
  display: 'flex',
};

const redBoxStyle = {
  backgroundColor: 'white',
  padding: '5px 10px',
  borderRadius: '4px',
  margin: '5px',
  textDecoration: 'none', // Remove underline from Link
  color: 'white',
};

const videoPath = process.env.PUBLIC_URL + '/analysis_-_31251 (1440p).mp4';

const Dashboard = () => {
  return (
    <div style={homePageStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Link to="/Portfolio" style={buttonStyle}>
        Portfolio
      </Link>
      <Link to="/Buy" style={buttonStyle}>
        Buy
      </Link>
      <Link to="/Sell" style={buttonStyle}>
        Sell
      </Link>
      <div style={redBoxContainerStyle}>
        <div style={redBoxStyle}>
          <a href="http://localhost:3000/Dashboard">Home</a>
        </div>
        <div style={redBoxStyle}>
          <a href="http://localhost:3000/AboutUs">About us & Contact us</a>
        </div>
        <div style={redBoxStyle}>
          <a href="http://localhost:3000/Feedback">Feedback</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
