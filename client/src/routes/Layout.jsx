
import React from 'react';
import Sidebar from '../components/Sidebar'; // ✅ Ensure exact casing
import { useNavigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BaseUrl from '../utils/basUrl';
//this is layOut or Body page
const Layout = () => {
const dispatch= useDispatch();
const navigate= useNavigate();
const userData= useSelector((store)=>store.user)


const fetchUser= async () => {
  if(userData) return;
  try {
    const res = await axios.get(BaseUrl+ "/api/profile",{
      withCrdentials:true,
    });
    dispatch(addUser(res.data));
    
  } catch (error) {

    if (error.status ===401){
      navigate("/login")
    }
    
  }
  
}

useEffect(()=>{
  
  fetchUser()
  
  
},[])



  return (
    <>
     {/* <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
        <Footer />
      </main>
      
    </div> */}



    <div className="flex h-screen overflow-hidden">
  <Sidebar />
  <div className="ml-20 md:ml-64 flex-1 overflow-y-auto">
    <main className="p-6">
      <Outlet />
      <Footer />
    </main>
  </div>
</div>

    
    </>
   
  );
};

export default Layout;
