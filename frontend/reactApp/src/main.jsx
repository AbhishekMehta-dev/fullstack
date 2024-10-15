import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CategoryProvider } from './context/CategoryContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CategoryProvider>
    <App />
  </CategoryProvider>
);
