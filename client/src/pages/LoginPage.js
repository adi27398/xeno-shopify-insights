import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const {login}=useAuth();
  const navigate=useNavigate();
   
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    const success=await login(email,password);
    if(success){
      navigate('/dashboard'); //dashboard pe le jao agr login successful ho gya hai
    }else{
      setError('Login failed.Please check your credentials.');
    }
  };
  return(
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Xeno Insights Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
          />    
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
          />    
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    
  );

}
export default LoginPage;