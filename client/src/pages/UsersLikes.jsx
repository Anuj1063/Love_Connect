

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import BaseUrl from '../utils/basUrl';

// function UsersLikes() {
//   const navigate = useNavigate();
//   const [likes, setLikes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Check premium & fetch likes
//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         // Call an endpoint to decode the user info from token (e.g., /auth/me or /auth/profile)
//         const userRes = await axios.get(`${BaseUrl}api/profile`, {
//           withCredentials: true,
//         });

//         const user =  userRes.data?.Data;

//         if ( !user?.isPremium) {
//           navigate('/update-to-premium');
//           return;
//         }

//         // ✅ User is premium, now fetch likes
//         const likesRes = await axios.get(`${BaseUrl}api/swipe/likes`, {
//           withCredentials: true,
//         });

//         setLikes(likesRes.data.data || []);
//       } catch (err) {
//         console.error('Error fetching likes or user data:', err);
//         navigate('/update-to-premium');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLikes();
//   }, [navigate]);

//   if (loading) {
//     return <div className="text-center text-white mt-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-base-100 text-base-content px-4 py-10">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <h2 className="text-3xl font-bold mb-6 text-center">❤️ People Who Liked You</h2>

//         {likes.length === 0 ? (
//           <p className="text-center text-gray-400">No likes yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {likes.map((user, index) => (
//               <div key={index} className="card bg-base-200 shadow-md">
//                 <figure>
//                   <img
//                     src={user.profileImages[0]}
//                     alt={user.name}
//                     className="w-full h-52 object-cover"
//                   />
//                 </figure>
//                 <div className="card-body">
//                   <h2 className="card-title">{user.name}, {user.age}</h2>
//                   <p>{user.gender}</p>
//                   <p className="text-sm text-gray-500">{user.email}</p>
//                   <p className="text-sm">Distance: {user.distanceInKm} km</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UsersLikes;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Mail, Sparkles } from 'lucide-react';

import BaseUrl from '../utils/basUrl';

// Beautiful Loading Component
const BeautifulLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated heart loader */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 animate-pulse flex items-center justify-center mx-auto shadow-xl">
            <Heart className="w-10 h-10 text-white animate-bounce" />
          </div>
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 opacity-30 blur-xl animate-ping mx-auto"></div>
        </div>
        
        {/* Loading text with gradient */}
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-4">
          Finding Your Admirers
        </h3>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        <p className="text-gray-600 font-medium">Loading your likes...</p>
      </div>
    </div>
  );
};

function UsersLikes() {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Check premium & fetch likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // Call an endpoint to decode the user info from token (e.g., /auth/me or /auth/profile)
        const userRes = await axios.get(`${BaseUrl}api/profile`, {
          withCredentials: true,
        });

        const user = userRes.data?.Data;

        if (!user?.isPremium) {
          navigate('/update-to-premium');
          return;
        }

        // ✅ User is premium, now fetch likes
        const likesRes = await axios.get(`${BaseUrl}api/swipe/likes`, {
          withCredentials: true,
        });

        setLikes(likesRes.data.data || []);
      } catch (err) {
        console.error('Error fetching likes or user data:', err);
        navigate('/update-to-premium');
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [navigate]);

  if (loading) {
    return <BeautifulLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4 py-10">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-pink-200/25 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Beautiful Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 rounded-full shadow-xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
         
          <p className="text-gray-600 text-lg font-medium">
            Discover who's interested in connecting with you
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="text-sm text-gray-500">{likes.length} {likes.length === 1 ? 'person likes' : 'people like'} you</span>
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
        </div>

        {likes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No likes yet</h3>
            <p className="text-gray-500 text-lg">Don't worry, your perfect match is just around the corner!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {likes.map((user, index) => (
              <div 
                key={index} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-105 border border-white/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={user.profileImages[0]}
                    alt={user.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating like indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Heart className="w-5 h-5 text-white fill-current" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative p-6 space-y-4">
                  {/* Name and Age */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
                      {user.name}, {user.age}
                    </h3>
                    <div className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
                      <span className="text-sm font-medium text-rose-600">{user.gender}</span>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-rose-500" />
                      </div>
                      <span className="text-sm font-medium truncate">{user.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className="text-sm font-medium">{user.distanceInKm} km away</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <div className="pt-4 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-rose-500 hover:via-pink-600 hover:to-purple-600">
                      <span className="flex items-center justify-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Connect</span>
                      </span>
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersLikes;

