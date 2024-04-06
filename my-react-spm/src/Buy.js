import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const homePageStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/spm_theme.jpeg)`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const Buy = () => {
  const [comp_select, setSelectedOption] = useState('');
  const [qty, setQuantity] = useState(0);
  const [buy_price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleBuy = async () => {
    try {
      const response = await fetch('http://localhost:3001/Buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comp_select, qty, buy_price }),
      });

      if (response.ok) {
        console.log('Form data sent successfully!');
        const responseBody1 = await response.json();
        setSuccessMessage(responseBody1.reason);
      } else {
        const responseBody2 = await response.json();
        setErrorMessage(responseBody2.reason);
        console.error('Failed to Buy. Reason:', responseBody2.reason);

        switch (responseBody2.type) {
          case 'username':
            break;
          case 'password':
            break;
          case 'fields':
          default:
            break;
        }
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
    console.log('Buying:', { comp_select, qty, buy_price });
  };

  return (
    <div style={homePageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Stock Purchase Form</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <div style={formGroupStyle}>
          <label htmlFor="stockOptions" style={labelStyle}>
            Select Stock:
          </label>
          <select
            id="stockOptions"
            value={comp_select}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={inputStyle}
          >
            <option value="0">Select Stock</option>
            <option value="1">Infosys</option>
            <option value="2">Wipro</option>
            <option value="3">ICICI Bank</option>
            <option value="4">ITC</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="quantity" style={labelStyle}>
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={qty}
            onChange={(e) => setQuantity(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="BuyPrice" style={labelStyle}>
            Buy Price:
          </label>
          <input
            type="number"
            id="BuyPrice"
            value={buy_price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={handleBuy} style={buyButtonStyle}>
          Buy
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  backgroundColor: 'lightgrey',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  height: '450px', // Increased height
  margin: 'auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};


const headingStyle = {
  fontSize: '1.5rem',
  marginBottom: '20px',
  color: '#333',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  marginBottom: '8px',
  color: '#555',
  fontSize: '14px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  transition: 'border-color 0.3s ease-in-out',
};

const buyButtonStyle = {
  width: '80%',
  padding: '12px',
  marginTop: '20px',
  marginLeft:'20px',
  background: '#2980b9',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'background 0.3s ease-in-out',
};

buyButtonStyle[':hover'] = {
  background: '#1c70b6',
};

inputStyle[':hover'] = {
  borderColor: '#1c70b6',
};

export default Buy;
