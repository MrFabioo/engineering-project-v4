import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './pages/map/main';
import { Trips } from './pages/expenses/Trips';
import { Authentication } from './pages/authentication/authentication';
import { Expenses } from './pages/expenses/Expenses';
import { Navbar } from './navbar';
import { Expens } from './pages/expenses/Expens';
// import { Bag } from './pages/bag/bag';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/bag' element={<Bag />} /> */}
          <Route path='/map' element={<Main />} />
          <Route path='/login' element={<Authentication />} />
          <Route path='/expenses' element={<Trips />} />
          <Route path='/expenses/:id' element={<Expenses />} />
          <Route path='/expenses/:id/:idDetail' element={<Expens />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
