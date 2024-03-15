import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* Default variant
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/

const globalStyles = `
  body, html, #root {
    margin: 0;
    padding: 0;
  }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

const root = document.getElementById('root') || document.createElement('div');
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
