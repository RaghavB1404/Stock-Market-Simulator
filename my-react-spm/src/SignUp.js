// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [Uname, setUsername] = useState('');
  const [Upwd1, setPassword1] = useState('');
  const [Upwd2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("In handle SignUp")
    try {
      const response = await fetch('http://localhost:3001/SignupProcess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Uname, Upwd1, Upwd2 }), // Corrected this line
      });

      if (response.ok) {
        console.log('Form data sent successfully!');
        navigate('/login');
        // Handle success if needed
      } else {
        const responseBody = await response.json();
        setErrorMessage(responseBody.reason);
        console.error('Failed to SignUp. Reason:', responseBody.reason);

        // Handle different failure types
        switch (responseBody.type) {
          case 'username':
            // Handle invalid username failure
            break;
          case 'password':
            // Handle invalid password failure
            break;
          case 'fields':
          default:
            // Handle unknown failure
            break;
        }
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      // Handle error if needed
    }
    console.log('Signing up:', { Uname, Upwd1, Upwd2 });
  };

  // Specify the path for the background video
  const videoPath = process.env.PUBLIC_URL + '/analysis_-_31251 (1440p).mp4';

  const signUpPageStyle = {
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

  const signUpFormStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: 'auto', // Center horizontally
    display: 'flex',
    flexDirection: 'column', // Center vertically
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const inputStyle = {
    width: '95%',
    padding: '8px',
    marginBottom: '10px',
  };

  const submitButtonStyle = {
    marginLeft: '5px',
    width: '100%',
    padding: '10px',
    background: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={signUpPageStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src={videoPath} type="video/mp4" />
      </video>
      <form style={signUpFormStyle} onSubmit={handleSignUp}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <input
          type="text"
          placeholder="Enter Username"
          style={inputStyle}
          value={Uname}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          style={inputStyle}
          value={Upwd1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="ReEnter Password"
          style={inputStyle}
          value={Upwd2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit" style={submitButtonStyle}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
