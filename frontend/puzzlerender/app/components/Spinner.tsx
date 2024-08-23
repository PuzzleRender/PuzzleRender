"use client";


import React from 'react';

const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)', // Light grey background
  borderRadius: '50%',
  borderTop: '4px solid #3498db', // Blue color for the spinning part
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  margin: '0 auto' // Center the spinner
};

const spinnerAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Spinner = () => {
  return (
    <div>
      <style>
        {spinnerAnimation}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
