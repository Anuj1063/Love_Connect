// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import BaseUrl from '../utils/basUrl';

// function Userdetails() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const res = await axios.get(`${BaseUrl}api/profile/otheruser/${userId}`, {
//           withCredentials: true,
//         });

//         // FIX: Use the correct key from the API response
//         setUser(res.data.Data);
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]);

//   if (loading) {
//     return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
//   }

//   if (!user) {
//     return <div className="min-h-screen flex justify-center items-center text-red-500">User not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100 flex items-center justify-center px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-gray-800">
//         <img
//           src={user.profileImages?.[0]}
//           alt={user.name}
//           className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow"
//         />
//         <h2 className="text-2xl font-bold text-center mb-1">{user.name}</h2>
//         <p className="text-center text-gray-500 mb-4">{user.email}</p>

//         <div className="space-y-2 text-sm">
//           <p><strong>Bio:</strong> {user.bio}</p>
//           <p><strong>Age:</strong> {user.age}</p>
//           <p><strong>Gender:</strong> {user.gender}</p>
//           <p><strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
//           <p><strong>Interests:</strong> {user.interests?.join(', ')}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Userdetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Heart, MapPin, Calendar, User, Mail, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
// import BaseUrl from '../utils/basUrl';

// function Userdetails() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const res = await axios.get(`${BaseUrl}api/profile/otheruser/${userId}`, {
//           withCredentials: true,
//         });

//         // Set user data from API response
//         setUser(res.data.Data);
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserDetails();
//     }
//   }, [userId]);

//   const nextImage = () => {
//     if (user?.profileImages?.length > 1) {
//       setCurrentImageIndex((prev) =>
//         prev === user.profileImages.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (user?.profileImages?.length > 1) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? user.profileImages.length - 1 : prev - 1
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-purple-200 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😔</div>
//           <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
//           <p className="text-purple-200">The profile you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-800 via-blue-900 to-indigo-900 py-8 px-4">
//       {/* Floating background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//       </div>

//       <div className="relative max-w-4xl mx-auto">
//         <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           {/* Header with image carousel */}
//           <div className="relative h-96 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
//             <div className="absolute inset-0 bg-black/20"></div>

//             {/* Image carousel */}
//             <div className="relative h-full">
//               {user.profileImages && user.profileImages.length > 0 ? (
//                 <>
//                   <img
//                     src={user.profileImages[currentImageIndex]}
//                     alt={user.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x400/667eea/ffffff?text=No+Image';
//                     }}
//                   />

//                   {/* Navigation arrows */}
//                   {user.profileImages.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
//                       >
//                         <ChevronLeft size={24} />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
//                       >
//                         <ChevronRight size={24} />
//                       </button>
//                     </>
//                   )}

//                   {/* Image indicators */}
//                   {user.profileImages.length > 1 && (
//                     <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                       {user.profileImages.map((_, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setCurrentImageIndex(index)}
//                           className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                             index === currentImageIndex
//                               ? 'bg-white shadow-lg'
//                               : 'bg-white/50 hover:bg-white/75'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 // Fallback when no profile images
//                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
//                   <div className="text-center text-white">
//                     <User size={80} className="mx-auto mb-4 opacity-50" />
//                     <p className="text-lg opacity-75">No Profile Image</p>
//                   </div>
//                 </div>
//               )}

//               {/* Profile overlay */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
//                 <div className="flex items-end space-x-6">
//                   <div className="flex-1">
//                     <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
//                       {user.name}
//                       <Sparkles className="ml-3 text-yellow-400" size={28} />
//                     </h1>
//                     <div className="flex items-center text-purple-200 mb-2">
//                       <Mail size={16} className="mr-2" />
//                       {user.email || 'Email not provided'}
//                     </div>
//                     {user.age && (
//                       <div className="text-pink-200 font-medium">
//                         {user.age} years old
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-8">
//             {/* Bio section */}
//             {user.bio && (
//               <div className="mb-8">
//                 <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30">
//                   <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
//                     <User className="mr-2 text-purple-400" size={20} />
//                     About Me
//                   </h3>
//                   <p className="text-purple-100 leading-relaxed text-lg">{user.bio}</p>
//                 </div>
//               </div>
//             )}

//             {/* Details grid */}
//             <div className="grid md:grid-cols-2 gap-6 mb-8">
//               {user.gender && (
//                 <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-300/30">
//                   <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
//                     <User className="mr-2" size={18} />
//                     Gender
//                   </h4>
//                   <p className="text-white text-lg capitalize">{user.gender}</p>
//                 </div>
//               )}

//               {user.birthday && (
//                 <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-300/30">
//                   <h4 className="font-semibold text-pink-200 mb-2 flex items-center">
//                     <Calendar className="mr-2" size={18} />
//                     Birthday
//                   </h4>
//                   <p className="text-white text-lg">
//                     {new Date(user.birthday).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Interests */}
//             {user.interests && user.interests.length > 0 && (
//               <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-300/30">
//                 <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
//                   <Heart className="mr-2 text-red-400" size={20} />
//                   Interests
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {user.interests.map((interest, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                     >
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Userdetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Heart, MapPin, Calendar, User, Mail, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
// import BaseUrl from '../utils/basUrl';

// function Userdetails() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const res = await axios.get(`${BaseUrl}api/profile/otheruser/${userId}`, {
//           withCredentials: true,
//         });

//         // Set user data from API response
//         setUser(res.data.Data);
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserDetails();
//     }
//   }, [userId]);

//   const nextImage = () => {
//     if (user?.profileImages?.length > 1) {
//       setCurrentImageIndex((prev) =>
//         prev === user.profileImages.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (user?.profileImages?.length > 1) {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? user.profileImages.length - 1 : prev - 1
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-purple-200 border-t-white rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">😔</div>
//           <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
//           <p className="text-purple-200">The profile you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-800 via-blue-800 to-indigo-800 py-8 px-4">
//       {/* Floating background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//       </div>

//       <div className="relative max-w-4xl mx-auto">
//         <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           {/* Header with image carousel */}
//           <div className="relative h-96 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
//             <div className="absolute inset-0 bg-black/20"></div>

//             {/* Image carousel */}
//             <div className="relative h-full">
//               {user.profileImages && user.profileImages.length > 0 ? (
//                 <>
//                   <img
//                     src={user.profileImages[currentImageIndex]}
//                     alt={user.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x400/667eea/ffffff?text=No+Image';
//                     }}
//                   />

//                   {/* Navigation arrows */}
//                   {user.profileImages.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
//                       >
//                         <ChevronLeft size={24} />
//                       </button>
//                       <button
//                         onClick={nextImage}
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
//                       >
//                         <ChevronRight size={24} />
//                       </button>
//                     </>
//                   )}

//                   {/* Image indicators */}
//                   {user.profileImages.length > 1 && (
//                     <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                       {user.profileImages.map((_, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setCurrentImageIndex(index)}
//                           className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                             index === currentImageIndex
//                               ? 'bg-white shadow-lg'
//                               : 'bg-white/50 hover:bg-white/75'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 // Fallback when no profile images
//                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
//                   <div className="text-center text-white">
//                     <User size={80} className="mx-auto mb-4 opacity-50" />
//                     <p className="text-lg opacity-75">No Profile Image</p>
//                   </div>
//                 </div>
//               )}

//               {/* Profile overlay */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
//                 <div className="flex items-end space-x-6">
//                   <div className="flex-1">
//                     <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
//                       {user.name}
//                       <Sparkles className="ml-3 text-yellow-400" size={28} />
//                     </h1>
//                     <div className="flex items-center text-purple-200 mb-2">
//                       <Mail size={16} className="mr-2" />
//                       {user.email || 'Email not provided'}
//                     </div>
//                     {user.age && (
//                       <div className="text-pink-200 font-medium">
//                         {user.age} years old
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-8">
//             {/* Bio section */}
//             {user.bio && (
//               <div className="mb-8">
//                 <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30">
//                   <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
//                     <User className="mr-2 text-purple-400" size={20} />
//                     About Me
//                   </h3>
//                   <p className="text-purple-100 leading-relaxed text-lg">{user.bio}</p>
//                 </div>
//               </div>
//             )}

//             {/* Details grid */}
//             <div className="grid md:grid-cols-2 gap-6 mb-8">
//               {user.gender && (
//                 <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-300/30">
//                   <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
//                     <User className="mr-2" size={18} />
//                     Gender
//                   </h4>
//                   <p className="text-white text-lg capitalize">{user.gender}</p>
//                 </div>
//               )}

//               {user.birthday && (
//                 <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-300/30">
//                   <h4 className="font-semibold text-pink-200 mb-2 flex items-center">
//                     <Calendar className="mr-2" size={18} />
//                     Birthday
//                   </h4>
//                   <p className="text-white text-lg">
//                     {new Date(user.birthday).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Interests */}
//             {user.interests && user.interests.length > 0 && (
//               <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-300/30">
//                 <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
//                   <Heart className="mr-2 text-red-400" size={20} />
//                   Interests
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {user.interests.map((interest, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                     >
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Userdetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Calendar,
  User,
  Mail,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BaseUrl from "../utils/basUrl";

function Userdetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}api/profile/otheruser/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.Data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const nextImage = () => {
    if (user?.profileImages?.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === user.profileImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (user?.profileImages?.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? user.profileImages.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 flex justify-center items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-100 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-200 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-500">
            The profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-8 px-4">
      <div className="relative max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="relative h-96 bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200">
            <div className="absolute inset-0 bg-white/20"></div>

            <div className="relative h-full min-h-[400px]">
              {user.profileImages && user.profileImages.length > 0 ? (
                <>
                  {/* <img
                    src={user.profileImages[currentImageIndex]}
                    alt={user.name}
                    // className="max-w-[100%]  bg-center max-h-[100%] object-contain"
                    //className="w-full h-full object-cover object-center scale-90"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image";
                    }}
                  /> */}
                <div 
                //className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
                className="w-full h-full bg-gradient-to-br from-orange-300 via-blue-50 to-green-300 animate-gradient-x flex items-center justify-center"
                >
  <img
    src={user.profileImages[currentImageIndex]}
    alt={user.name}
    className="max-w-[200%] max-h-[100%] object-contain rounded-lg shadow-lg"
    onError={(e) => {
      e.target.src =
        "https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image";
    }}
  />
</div>
                 
                  {user.profileImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/60 text-gray-700 p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/60 text-gray-700 p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  {user.profileImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {user.profileImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-white shadow-lg"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="text-center text-gray-600">
                    <User size={80} className="mx-auto mb-4 opacity-40" />
                    <p className="text-lg">No Profile Image</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent p-8">
                <div className="flex items-end space-x-6">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                      {user.name}
                      <Sparkles className="ml-3 text-yellow-500" size={28} />
                    </h1>
                    <div className="flex items-center text-gray-700 mb-2">
                      <Mail size={16} className="mr-2" />
                      {user.email || "Email not provided"}
                    </div>
                    {user.age && (
                      <div className="text-pink-700 font-medium">
                        {user.age} years old
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {user.bio && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="mr-2 text-purple-700" size={20} />
                    About Me
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {user.bio}
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {user.gender && (
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <User className="mr-2" size={18} />
                    Gender
                  </h4>
                  <p className="text-gray-800 text-lg capitalize">
                    {user.gender}
                  </p>
                </div>
              )}

              {user.birthday && (
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 border border-pink-200">
                  <h4 className="font-semibold text-pink-700 mb-2 flex items-center">
                    <Calendar className="mr-2" size={18} />
                    Birthday
                  </h4>
                  <p className="text-gray-800 text-lg">
                    {new Date(user.birthday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {user.interests && user.interests.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-indigo-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Heart className="mr-2 text-red-400" size={20} />
                  Interests
                </h3>
               <div className="flex flex-wrap gap-3">
  {user.interests.map((interest, index) => {
    const colorfulGradients = [
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
      "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500", 
      "bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500",
      "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500",
      "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
      "bg-gradient-to-r from-teal-500 via-green-500 to-lime-500",
      "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500",
      "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500",
      "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
    ];
    
    return (
      <span
        key={index}
        className={`px-4 py-2 ${colorfulGradients[index % colorfulGradients.length]} text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
      >
        {interest}
      </span>
    );
  })}
</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userdetails;
