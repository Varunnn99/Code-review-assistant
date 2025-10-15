import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Note: This imports App.jsx (extensions are optional in imports)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);