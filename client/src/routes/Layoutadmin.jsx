import React from 'react';
import Sidebaradmin from '../pages/AdminPages/components/Sidebaradmin';
import { useNavigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../utils/userSlice'; // Make sure to import addUser
import BaseUrl from '../utils/basUrl';
import Navbar from '../pages/AdminPages/components/Navbar';

const Layoutadmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BaseUrl + "/api/profile", {
        withCredentials: true, // Fixed typo: was "withCrdentials"
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebaradmin />
      
      {/* Main Content Area */}
      <div className="ml-20 md:ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Main content with proper scrolling */}
        <main className="flex-1 overflow-y-auto">
            {/* <Navbar/> */}
          <div className="p-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layoutadmin;