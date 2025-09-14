import React from 'react';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';//styling file


function App(){
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          {/*protected routes*/}
          <Route element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<DashboardPage/>}/>
          </Route>
          {/*agr loggedin hai toh root ko dashboard pe le jao wrna login pr*/}
          <Route path="/" element={<Navigate to="/dashboard"/>}/>    
        </Routes>
      </Router>
    </AuthProvider>


  );
}
export default App;
