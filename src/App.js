import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/map/main';
import { Expenses } from './pages/expenses/Expenses';
import { Authentication } from './pages/authentication/authentication';
import { Navbar } from './navbar';
import { Detail } from './pages/expenses/Detail';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/map' element={<Main />} />
          <Route path='/login' element={<Authentication />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/expenses/detail' element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
