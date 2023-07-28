import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Trips } from './components/Trips';
import { Expenses } from './components/Expenses';
import { Header } from './components/Header';
import { Expens } from './components/Expens';
import { SignIn } from './components/SignIn';
import { AroundYou } from './components/AroundYou';

function App() {
  // Get the current location using useLocation hook
  // const location = useLocation();

  // Check if the current location is '/login' (SignIn page)
  // const isSignInPage = location.pathname === '/login';

  return (
    <div className='h-screen'>
      <Router>
        <Header />
        <Routes>
          {/* <Route path='/bag' element={<Bag />} /> */}
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
