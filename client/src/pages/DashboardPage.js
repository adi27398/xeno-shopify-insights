import React,{useState,useEffect} from 'react';
import apiClient from '../services/api';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import StatCard from '../components/StatCard'; 
import OrdersChart from '../components/OrdersChart';
import TopCustomersList from '../components/TopCustomersList';

function DashboardPage(){
  const [summary,setSummary]=useState({totalCustomers:0,totalOrders:0,totalRevenue:0,totalProducts:0});
  const [ordersByDate,setOrdersByDate]=useState([]);
  const [topCustomers,setTopCustomers]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const {user,logout}=useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        setLoading(true);
        //sara data parrallel mein fetch karo
        const[summaryRes,ordersRes,customersRes]=await Promise.all([
          apiClient.get('/insights/summary'),
          //last 30 days ke liye default kr do

          apiClient.get(`/insights/orders-by-date?start=${new Date(Date.now()-30*24*60*60*1000).toISOString()}&end=${new Date().toISOString()}`),
          apiClient.get('/insights/top-customers')
        ]);

        setSummary(summaryRes.data);
        setOrdersByDate(ordersRes.data);
        setTopCustomers(customersRes.data);
      }catch(err){
        setError('Failed to fetch dashboard data.');
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  const handleLogout=()=>{
    logout();
    navigate('/login');

  };
  if(loading)return <div>Loading dashboard...</div>;
  if(error)return <div>{error}</div>;

  return(
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome,{user?.email}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>

      </header>
      <div className="stats-grid">
        <StatCard title="Total Revenue" value={`$${parseFloat(summary.totalRevenue).toFixed(2)}`} icon="💰"/>
        <StatCard title="Total Orders" value={summary.totalOrders} icon="📦"/>
        <StatCard title="Total Customers" value={summary.totalCustomers} icon="👥"/>
        <StatCard title="Total Products" value={summary.totalProducts} icon="🏷️"/>
      </div>

      <div className="main-content">
        <OrdersChart data={ordersByDate}/>
        <TopCustomersList data={topCustomers}/>
      </div>
    </div>

  );


} 
export default DashboardPage;
