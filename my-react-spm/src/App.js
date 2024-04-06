import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Buy from './Buy';
import Sell from './Sell';
import AboutUs from './AboutUs';
import Feedback from './Feedback';
import Portfolio from './Portfolio';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;