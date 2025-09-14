import React,{createContext,useState,useContext} from 'react';
import apiClient from '../services/api';


const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user'))||null);
  const [token,setToken]=useState(localStorage.getItem('accessToken') || null);

  const login=async (email,password)=>{
    try{
        
      const response=await apiClient.post('/auth/signin',{email,password});
      const {accessToken, ...userData}=response.data;
      //state aur local storage mein store karo
      setToken(accessToken);
      setUser(userData);
      localStorage.setItem('accessToken',accessToken);
      localStorage.setItem('user',JSON.stringify(userData));


      return true;  // success dikhata hai
    }catch(error){
      console.error("Login failed:",error);
      return false; // failure dikhata hai  
    }
  };

  const logout=()=>{
      //yeh clear krdega state aur local storage se 
      setToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    
  };
  const value={user,token,login,logout,isAuthenticated:!!token};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
  /// custom hook taki auth context use kr paye 
export const useAuth=()=>{
    return useContext(AuthContext);
};