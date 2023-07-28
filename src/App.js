import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Trips } from './components/Trips';
import { Expenses } from './components/Expenses';
import { Header } from './components/Header';
import { Expens } from './components/Expens';
import { SignIn } from './components/SignIn';
import { AroundYou } from './components/AroundYou';
import { Bags } from './pages/bag/Bags';
import { Equipment } from './pages/bag/Equipment';

function App() {
  return (
    <div className='h-screen'>
      <Router>
        <Header />
        <Routes>
          <Route path='/bags' element={<Bags />} />
          <Route path='/bags/:id' element={<Equipment />} />
          <Route path='/map' element={<AroundYou />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/expenses' element={<Trips />} />
          <Route path='/expenses/:id' element={<Expenses />} />
          <Route path='/expenses/:id/:idDetail' element={<Expens />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
