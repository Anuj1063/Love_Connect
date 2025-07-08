// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';


// import BaseUrl from "../utils/basUrl"

// function Settings() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPreferences, setShowPreferences] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [gender, setGender] = useState('');
//   const [ageRange, setAgeRange] = useState({ min: 18, max: 30 });
//   const [distance, setDistance] = useState(10);

//   const navigate = useNavigate();


//   const handlePasswordUpdate = async () => {
//     try {
//       const res = await axios.post(
//         `${BaseUrl}auth/updatepassword`,
//         { currentPassword, newPassword },
//         { withCredentials: true }
//       );
//       toast.success(res.data.message || 'Password updated successfully');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update password');
//     }
//   };

//   const handleSetPreferences = async () => {
//     try {
//       const res = await axios.post(
//         `${BaseUrl}api/preference`,
//         { gender, ageRange, distance },
//         { withCredentials: true }
//       );
//       toast.success(res.data.message || 'Preferences saved!');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to save preferences');
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirm = window.confirm('Are you sure you want to delete your account?');
//     if (!confirm) return;

//     try {
//       const res = await axios.delete(`${BaseUrl}api/profile/delete`, {
//         withCredentials: true,
//       });
      
//       toast.success(res.data.message || 'Account deleted successfully');
//       navigate('/login')
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete account');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-base-100 text-base-content px-4 py-10">
//       <div className="max-w-2xl mx-auto space-y-6">
//         <h2 className="text-3xl font-bold text-center mb-6">⚙️ Settings</h2>

//         {/* Change Password Section */}
//         <div className="collapse collapse-arrow bg-base-200">
//           <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
//           <div className="collapse-title text-xl font-medium">
//             🔐 Change Password
//           </div>
//           <div className="collapse-content space-y-4">
//             <input
//               type="password"
//               placeholder="Current Password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               className="input input-bordered w-full"
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="input input-bordered w-full"
//             />
//             <button onClick={handlePasswordUpdate} className="btn btn-primary w-full">
//               Update Password
//             </button>
//           </div>
//         </div>

//         {/* Set Preferences Section */}
//         <div className="collapse collapse-arrow bg-base-200">
//           <input type="checkbox" checked={showPreferences} onChange={() => setShowPreferences(!showPreferences)} />
//           <div className="collapse-title text-xl font-medium">
//             🎯 Set Preferences
//           </div>
//           <div className="collapse-content space-y-4">
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="select select-bordered w-full"
//             >
//               <option value="">Select Gender Interest</option>
//               <option value="female">Female</option>
//               <option value="male">Male</option>
//               <option value="everyone">Everyone</option>
//             </select>
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 placeholder="Min Age"
//                 value={ageRange.min}
//                 onChange={(e) => setAgeRange({ ...ageRange, min: Number(e.target.value) })}
//                 className="input input-bordered w-full"
//               />
//               <input
//                 type="number"
//                 placeholder="Max Age"
//                 value={ageRange.max}
//                 onChange={(e) => setAgeRange({ ...ageRange, max: Number(e.target.value) })}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <input
//               type="number"
//               placeholder="Distance (km)"
//               value={distance}
//               onChange={(e) => setDistance(Number(e.target.value))}
//               className="input input-bordered w-full"
//             />
//             <button onClick={handleSetPreferences} className="btn btn-success w-full">
//               Save Preferences
//             </button>
//           </div>
//         </div>

//         {/* Delete Account */}
//         <div className="card bg-base-200 p-6">
//           <h3 className="text-xl font-semibold mb-3">🗑️ Delete My Account</h3>
//           <button onClick={handleDeleteAccount} className="btn btn-error w-full">
//             Delete Account
//           </button>
//         </div>

//         <ToastContainer position="top-right" />
//       </div>
//     </div>
//   );
// }

// export default Settings;












import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Heart, Trash2, User, Shield, Sliders, Settings as SettingsIcon ,Star as StarIcon } from 'lucide-react';

import BaseUrl from "../utils/basUrl"

function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState({ min: 18, max: 30 });
  const [distance, setDistance] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BaseUrl}auth/updatepassword`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      toast.success(res.data.message || 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPreferences = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BaseUrl}api/preference`,
        { gender, ageRange, distance },
        { withCredentials: true }
      );
      toast.success(res.data.message || 'Preferences saved!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirm) return;

    setIsLoading(true);
    try {
      const res = await axios.delete(`${BaseUrl}api/profile/delete`, {
        withCredentials: true,
      });
      
      toast.success(res.data.message || 'Account deleted successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 text-sm">Manage your account preferences and security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          
          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                  <p className="text-gray-600 text-sm">Manage your password and account security</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Change Password</span>
                </div>
                <div className={`transform transition-transform ${showPassword ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {showPassword && (
                <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handlePasswordUpdate} 
                    disabled={isLoading || !currentPassword || !newPassword}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Dating Preferences</h2>
                  <p className="text-gray-600 text-sm">Set your matching preferences and criteria</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Manage Preferences</span>
                </div>
                <div className={`transform transition-transform ${showPreferences ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {showPreferences && (
                <div className="mt-6 space-y-6 p-4 bg-gray-50 rounded-xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Gender Interest</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select gender preference</option>
                      <option value="female">Women</option>
                      <option value="male">Men</option>
                      <option value="everyone">Everyone</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Age Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          placeholder="Min age"
                          value={ageRange.min}
                          onChange={(e) => setAgeRange({ ...ageRange, min: Number(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Max age"
                          value={ageRange.max}
                          onChange={(e) => setAgeRange({ ...ageRange, max: Number(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Maximum Distance</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center">
                        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {distance} km
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSetPreferences} 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Premium Plan Upgrade */}
<div className="bg-white rounded-2xl shadow-sm border border-yellow-200 overflow-hidden">
  <div className="p-6 border-b border-yellow-100">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-yellow-100 rounded-lg">
        <StarIcon className="w-5 h-5 text-yellow-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-yellow-900">Premium Plan</h2>
        <p className="text-yellow-700 text-sm">Unlock premium features and boost your visibility</p>
      </div>
    </div>
  </div>

  <div className="p-6 bg-yellow-50">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="font-semibold text-yellow-900">Upgrade Your Account</h3>
        <p className="text-yellow-700 text-sm">Enjoy advanced filters, unlimited likes, and top profile boost</p>
      </div>
      <button
        onClick={() => navigate('/update-to-premium')}
        className="bg-yellow-500 text-white font-medium py-3 px-6 rounded-xl hover:bg-yellow-600 transition-all duration-200 transform hover:scale-[1.02] whitespace-nowrap"
      >
        Upgrade Now
      </button>
    </div>
  </div>
</div>


          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
            <div className="p-6 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
                  <p className="text-red-600 text-sm">Irreversible and destructive actions</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-red-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-red-900">Delete Account</h3>
                  <p className="text-red-700 text-sm">Permanently delete your account and all associated data</p>
                </div>
                <button 
                  onClick={handleDeleteAccount} 
                  disabled={isLoading}
                  className="bg-red-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] whitespace-nowrap"
                >
                  {isLoading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Settings; 