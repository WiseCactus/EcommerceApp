import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct package for React 18
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(

  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>

);
