// src/routes/AllRoutes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProfileCart from '../pages/ProfileCart';
import Layout from './Layout';
import TinderScroll from '../pages/TinderScroll';
import ProfileDetails from '../pages/ProfileDetails';
import ProtectedRoute from './ProtectedRoute';
import VarifyAccount from '../pages/VarifyAccount';
import NotFound from '../pages/NotFound';
//import AddprofileDetais from '../pages/AddprofileDetais';
import AddProfileDetails from '../pages/AddprofileDetais';
import UpdateProfile from '../pages/UpdateProfile';
import Message from '../pages/Message';
import Chat from '../pages/Chat';
import Userdetails from '../pages/Userdetails';
import Admindashboard from '../pages/AdminPages/Admindashboard';
import Layoutadmin from './Layoutadmin';
import ManagesUsers from '../pages/AdminPages/ManagesUsers';
import ReportedUsers from '../pages/AdminPages/ReportedUsers';
import UserAllDetails from '../pages/AdminPages/UserAllDetails';
import ForgotPassowrd from '../pages/ForgotPassowrd';
import Settings from '../pages/Settings';
import ResetPassword from '../pages/ResetPassword';
import UsersLikes from '../pages/UsersLikes';
import PaymentForm from '../pages/PaymentForm';
import PastUsers from '../pages/AdminPages/PastUsers';
import ManageComments from '../pages/AdminPages/ManageComments';

const AllRoutes = () => {
  return (
    
   
    <BrowserRouter basename='/'>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<TinderScroll />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verifyuser" element={<VarifyAccount />} />
    <Route path='/forgot-password' element={<ForgotPassowrd/>}/>
              
    <Route path='/auth/reset-password/:token' element={<ResetPassword/>}/>

    {/* Protected but without layout */}
    <Route
      path="/addprofiledetails"
      element={
        <ProtectedRoute>
          <AddProfileDetails />
        </ProtectedRoute>
      }
    />



{/* Protected but without layout */}
    <Route
      path='/chat/:targetUserId'
      element={
        <ProtectedRoute>
          <Chat/>
        </ProtectedRoute>
      }
    />

    {/* Protected but without layout */}
    <Route

    element={
        <ProtectedRoute   role="admin">
          <Layoutadmin/>
        </ProtectedRoute>
      }
    
    >
      
      <Route path="/admindashboard" element={<Admindashboard />} />
       <Route path="/manageallusers" element={<ManagesUsers />} />
       <Route path="/reportedusers" element={<ReportedUsers />} />
       <Route path="/useralldetails/:userId" element={<UserAllDetails />} />

       <Route path="/pastusers" element={<PastUsers />} />
        <Route path="/managecommnets" element={<ManageComments/>} />
       



      
    </Route >


    {/* Protected routes */}
    <Route
      element={
        <ProtectedRoute>
          <Layout /> 
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<ProfileCart />} />
      <Route path="/profilecart" element={<ProfileCart />} />
      <Route path="/profile" element={<ProfileDetails />} />
      <Route path='/updateprofile' element={<UpdateProfile/>}/>
      <Route path='/messages' element={<Message/>}/>
      <Route path='/settings' element={<Settings/>}/>
       <Route path='/userdetails/:userId' element={<Userdetails/>}/> 
       <Route path='/likes-you' element={<UsersLikes/>}/>
       <Route path="/update-to-premium"  element={<PaymentForm/>}/>
      
    </Route>
   
    {/* Catch-all route for 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

  );
};

export default AllRoutes;
