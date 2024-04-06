// import React from 'react';
// import './AboutUs.css'; // Import your external CSS file

// const AboutUs = () => {
//   return (
//     <div className="about-us-container">
//       <div className="details-section">
//         <h1 className="header">About Us</h1>
//         <div className="person-details">
//           <h2>Person1 Details:</h2>
//           <p>
//             ..................................................................................................................<br />
//             ..................................................................................................................<br />
//             ..................................................................................................................
//           </p>
//           <h2>Person2 Details:</h2>
//           <p>
//             ..................................................................................................................<br />
//             ..................................................................................................................<br />
//             ..................................................................................................................
//           </p>
//           <h2>Person3 Details:</h2>
//           <p>
//             ..................................................................................................................<br />
//             ..................................................................................................................<br />
//             ..................................................................................................................
//           </p>
//         </div>
//       </div>
//       <div className="contact-section">
//         <h2>Contact Details:</h2>
//         <p>
//           PhoneNo1:..................................................................................<br />
//           PhoneNo2:..................................................................................<br />
//           PhoneNo3:..................................................................................<br />
//         </p>
//       </div>
//       <div className="hyperlinks">
//         <a href="http://localhost:3000/Dashboard">Home</a>
//         <a href="http://localhost:3000/AboutUs">About Us & Contact Us</a>
//         <a href="http://localhost:3000/Feedback">Feedback</a>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;



import React from 'react';
import './AboutUs.css'; // Import your external CSS file

const AboutUs = () => {
  const headingStyle = {
    color: '#3498db',
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
  };

  const strongStyle = {
    fontWeight: 'bold',
  };

  const linkStyle = {
    color: '#e74c3c',
    textDecoration: 'none',
  };

  return (
    <div className="about-us-container">
      <h1 style={headingStyle}>About Us</h1>
      <p style={paragraphStyle}>
        Welcome to our Stock Portfolio Manager! We are a team of passionate individuals dedicated to helping you manage and track your stock investments effectively.
      </p>
      <h2 style={headingStyle}>Our Mission</h2>
      <p style={paragraphStyle}>
        Our mission is to empower investors by providing them with the tools and insights needed to make informed decisions in the stock market.<br></br> We believe that everyone should have access to user-friendly and powerful portfolio management tools.
      </p>
      <h2 style={headingStyle}>Why Choose Us?</h2>
      <p style={paragraphStyle}>
        <span style={strongStyle}>1. User-Friendly Interface:</span> Our platform is designed with simplicity in mind, ensuring that both beginners and experienced investors<br></br> can easily navigate and use our features.
      </p>
      <p style={paragraphStyle}>
        <span style={strongStyle}>2. Comprehensive Data:</span> We provide comprehensive data and analytics to help you analyze your portfolio's performance, <br></br> track real-time market changes, and make strategic investment decisions.
      </p>
      <p style={paragraphStyle}>
        <span style={strongStyle}>3. Security and Privacy:</span> We prioritize the security and privacy of your financial information. Rest assured that your data is handled <br></br> with the utmost care and follows industry-standard security practices.
      </p>
      <h2 style={headingStyle}>Meet the Team</h2>
      <p style={paragraphStyle}>
        Our team is composed of experienced professionals in the fields of finance, technology, and design. We are dedicated to creating a platform <br></br> that meets the diverse needs of our users.
      </p>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li style={{ margin: '10px 0' }}><strong>Pullagura Santosha</strong></li>
        <li style={{ margin: '10px 0' }}><strong>Raghav Balakrishnan</strong></li>
        <li style={{ margin: '10px 0' }}><strong>Praveen Kumar Basvaraj Pujari</strong></li>
      </ul>
      <h2 style={headingStyle}>Contact Us</h2>
      <p style={paragraphStyle}>
        Have questions or suggestions? Feel free to reach out to us at <a href="mailto:info@stockportfoliomanager.com" style={linkStyle}>info@stockportfoliomanager.com</a>. <br></br> We value your feedback and are here to assist you!
      </p>
    </div>
  );
};

export default AboutUs;
