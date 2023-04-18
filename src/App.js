import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main';
import { Authentication } from './pages/authentication/authentication';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Authentication />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
