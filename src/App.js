import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Main } from './pages/map/main';
import { Trips } from './pages/expenses/Trips';
import { Authentication } from './pages/authentication/authentication';
import { Expenses } from './pages/expenses/Expenses';
import { Header } from './components/Header';
import { Expens } from './pages/expenses/Expens';
import { SignIn } from './components/SignIn';
import { Map } from './components/Map';

function App() {
  // Get the current location using useLocation hook
  // const location = useLocation();

  // Check if the current location is '/login' (SignIn page)
  // const isSignInPage = location.pathname === '/login';

  return (
    <div className='App'>
      <Router>
        {/* Render the Header only if it's not the SignIn page */}
        <Routes>
          {/* <Route path='/bag' element={<Bag />} /> */}
          <Route path='/' element={<Header />} />
          <Route
            path='/map'
            element={
              <>
                <Header />
                <Main />
              </>
            }
          />
          <Route
            path='/map2'
            element={
              <>
                <Header />
                <Map />
              </>
            }
          />
          <Route path='/login' element={<SignIn />} />
          <Route
            path='/expenses'
            element={
              <>
                <Header />
                <Trips />
              </>
            }
          />
          <Route
            path='/expenses/:id'
            element={
              <>
                <Header />
                <Expenses />
              </>
            }
          />
          <Route
            path='/expenses/:id/:idDetail'
            element={
              <>
                <Header />
                <Expens />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
