import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './routes/AppLayout.js';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App;
