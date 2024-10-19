import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import handleSignOut from '../Signout'
import Accounts from './Accounts';

const Home = () => {


  // If the user is not authenticated, redirect to sign-in page





  return (
    <div>
      
     <Accounts />
    </div>
  );
};

export default Home;
