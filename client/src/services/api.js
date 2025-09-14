import axios from 'axios';
const apiClient=axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',  //backend api url
});

//yeh request Interceptor hai joki every req se pehle run hota hai 

apiClient.interceptors.request.use(
    (config)=>{
      //token lo local storage se 
      const token =localStorage.getItem('accessToken');
      if(token){
        // agr token exists krta hai authorization header mein add karo
        config.headers.Authorization=`Bearer ${token}`;
      }
      return config;
    },
    (error)=>{
      return Promise.reject(error);
    }

);

export default apiClient;