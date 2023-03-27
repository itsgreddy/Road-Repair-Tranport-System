import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Account from './pages/Account';
import Home from './pages/Home';

import Clerk from './pages/Clerk/Clerk';
import ClerkSignin from './pages/Clerk/Signin';
import ClerkMain from './pages/Clerk/Main';

import Officer from './pages/Officer/Officer';
import OfficerSignin from './pages/Officer/Signin';
import OfficerMain from './pages/Officer/Main';

import Supervisor from './pages/Supervisor/Supervisor';
import SupervisorSignin from './pages/Supervisor/Signin';
import SupervisorMain from './pages/Supervisor/Main';


import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/context';
import Protected from './components/Protected';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/clerk' element={<Clerk />} />
          <Route path='/clerksignin' element={<ClerkSignin />} />
          <Route path='/clerkmain' element={<Protected><ClerkMain /></Protected>} />

          <Route path='/officer' element={<Officer />} />
          <Route path='/officersignin' element={<OfficerSignin />} />
          <Route path='/officermain' element={<Protected><OfficerMain /></Protected>} />

          <Route path='/supervisor' element={<Supervisor />} />
          <Route path='/supervisorsignin' element={<SupervisorSignin />} />
          <Route path='/supervisormain' element={<Protected><SupervisorMain /></Protected>} />

          {/* <Route path='/account' element={<Protected><Account /></Protected>} /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;