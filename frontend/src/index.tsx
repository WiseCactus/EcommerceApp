import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct package for React 18
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Ensure an element with id="root" exists in the HTML.');
}

const root = ReactDOM.createRoot(rootElement); // Use createRoot

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
