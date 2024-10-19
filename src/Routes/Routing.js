import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from '../Component/Signin';
import Home from '../Component/Home/Home';
import AdminVerify from '../Component/Admin/AdminVerify'
import {Toaster} from 'react-hot-toast'

function App() {
  

 
  return (
    <>
        <Toaster />
      <Routes>
        {/* Sign-in Route */}
        <Route path="/" element={ <SignIn /> } />
        
        {/* Dashboard Route (requires user to be signed in) */}
        <Route path="/home" element= { <Home /> } />
        <Route path="/admin" element= { <AdminVerify /> } />
      </Routes>

    </>
  );
}

export default App;
