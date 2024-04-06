import React from 'react';

const Feedback = () => {
  return (
    <div style={{
      backgroundImage: "url('spm_theme.jpeg')",
      backgroundSize: '1520px 1000px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        height: '410px',
        width: '415px',
        backgroundColor: 'rgb(150, 150, 150)',
        borderRadius: '5%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: '0.9',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <form method="get">
          <label style={{ marginRight: '25px' }}>Name</label>
          <input style={{ marginTop: '40px', marginLeft: '40px', marginRight: '50px', height: '20px', width: '200px', borderColor: 'black' }} /><br />
          <label style={{ marginRight: '35px' }}>PhoneNo</label>
          <input style={{ marginTop: '8%', marginLeft: '10px', marginRight: '45px', height: '20px', width: '200px', borderColor: 'black' }} /><br />
          <label style={{ marginRight: '15px' }}>Email address</label>
          <input style={{ marginTop: '8%', width: '200px', height: '20px', marginRight: '40px', borderColor: 'black' }} /><br />
          <label style={{ marginRight: '40px' }}>Feedback</label>
          <textarea style={{ borderColor: 'black', width: '205px', height: '90px', marginTop: '8%', marginRight: '40px' }}></textarea>
        </form>
        <center><button style={{ marginTop: '4%', marginBottom: '4%', marginLeft: '70px', width: '150px', height: '30px', backgroundColor: 'rgb(5, 91, 71)', color: 'rgb(4, 150, 223)' }}>Submit</button></center>
        <a href="http://localhost:3000/Dashboard" style={{ fontSize: '14px', color: 'blue' }}>Home</a>
        <a href="http://localhost:3000/AboutUs" style={{ fontSize: '14px', color: 'blue' }}>About us & Contact us</a>
        <a href="http://localhost:3000/Feedback" style={{ fontSize: '14px', color: 'blue' }}>Feedback</a>
      </div>
    </div>
  );
};

export default Feedback;
