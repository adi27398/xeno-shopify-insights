import React from 'react';
import {Navigate,Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';



const ProtectedRoute=()=>{
  const {isAuthenticated}=useAuth();

  //agr user authenticated hai toh child routes send karo
  //wrna login page pe le jao
  return isAuthenticated?<Outlet/>: <Navigate to="/login"/>;
};
export default ProtectedRoute;