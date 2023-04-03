import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Account from './pages/Account';
import Home from './pages/Home';

import Clerk from './pages/Clerk/Clerk';
import ClerkSignin from './pages/Clerk/Signin';
import ClerkSignup from './pages/Clerk/Signup';
import ClerkMain from './pages/Clerk/Main';

import Officer from './pages/Officer/Officer';
import OfficerSignin from './pages/Officer/Signin';
import OfficerSignup from './pages/Officer/Signup';
import OfficerMain from './pages/Officer/Main';

import Supervisor from './pages/Supervisor/Supervisor';
import SupervisorSignin from './pages/Supervisor/Signin';
import SupervisorSignup from './pages/Supervisor/Signup';
import SupervisorMain from './pages/Supervisor/Main';


import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/context';
import Protected from './components/Protected';

function App() {
  return (
    <div className='bg-gray-300 h-screen'>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/clerk' element={<Clerk />} />
          <Route path='/clerksignin' element={<ClerkSignin />} />
          <Route path='/clerksignup' element={<ClerkSignup />} />
          <Route path='/clerkmain' element={<Protected><ClerkMain /></Protected>} />

          <Route path='/officer' element={<Officer />} />
          <Route path='/officersignin' element={<OfficerSignin />} />
          <Route path='/officersignup' element={<OfficerSignup />} />
          <Route path='/officermain' element={<Protected><OfficerMain /></Protected>} />

          <Route path='/supervisor' element={<Supervisor />} />
          <Route path='/supervisorsignin' element={<SupervisorSignin />} />
          <Route path='/supervisorsignup' element={<SupervisorSignup />} />
          <Route path='/supervisormain' element={<Protected><SupervisorMain /></Protected>} />

          {/* <Route path='/account' element={<Protected><Account /></Protected>} /> */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;