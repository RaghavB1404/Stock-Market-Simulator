// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [Uname, setUsername] = useState('');
  const [Upwd, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("In handle Login")
    try {
      const response = await fetch('http://localhost:3001/LoginProcess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Uname, Upwd }), // Corrected this line
      });

      if (response.ok) {
        console.log('Form data sent successfully!');
        navigate('/dashboard');
        // Handle success if needed
      } else {
        const responseBody = await response.json();
        setErrorMessage(responseBody.reason);
        console.error('Failed to send form data. Reason:', responseBody.reason);

        // Handle different failure types
        switch (responseBody.type) {
          case 'username':
            // Handle invalid username failure
            break;
          case 'password':
            // Handle invalid password failure
            break;
          case 'unknown':
          default:
            // Handle unknown failure
            break;
        }
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      // Handle error if needed
    }
    console.log('Logging in:', { Uname, Upwd });
  };

  // Specify the path for the background video
  const videoPath = process.env.PUBLIC_URL + '/analysis_-_31251 (1440p).mp4';

  const loginPageStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  };

  const loginFormStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '30px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: 'auto', // Center horizontally
    marginTop: 'calc(50vh - 200px)', // Center vertically
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
  };

  const submitButtonStyle = {
    marginLeft: '5px',
    width: '100%',
    padding: '12px',
    background: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
  };

  return (
    <div style={loginPageStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form style={loginFormStyle} onSubmit={handleLogin}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          style={inputStyle}
          value={Uname}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={Upwd}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={submitButtonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
