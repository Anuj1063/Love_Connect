
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import BaseUrl from '../../utils/basUrl';



// function UserAllDetails() {
//   const { userId } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) return;
    
//     const fetchUserDetails = async () => {
//       try {
//         const res = await axios.get(
         

//           `${BaseUrl}api/admin/userdetails/${userId}`, {
//     withCredentials: true,
//   }
//         );
//         console.log("✅ API Success:", res.data);
//         setUserData(res.data.data);
//       } catch (error) {
//         console.error("❌ API Error:", error?.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     console.log("📦 userId from params:", userId);
//     fetchUserDetails();
//   }, [userId]);

//   if (loading) return <div className="p-6 text-lg font-medium">Loading user details...</div>;
//   if (!userData) return <div className="p-6 text-red-500">Failed to load user data.</div>;

//   const { basicInfo, profile, preference, likedBy, matches, totalLikes, totalMatches } = userData;

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg space-y-6">
//       <h1 className="text-2xl font-bold text-pink-600">User Full Details</h1>

//       {/* Basic Info */}
//       <section>
//         <h2 className="text-xl font-semibold">Basic Info</h2>
//         <p><strong>Name:</strong> {basicInfo.name}</p>
//         <p><strong>Email:</strong> {basicInfo.email}</p>
//         <p><strong>Suspended:</strong> {basicInfo.isSuspended ? 'Yes' : 'No'}</p>
//         <p><strong>Premium:</strong> {basicInfo.isPremium ? 'Yes' : 'No'}</p>
//       </section>

//       {/* Profile Info */}
//       <section>
//         <h2 className="text-xl font-semibold">Profile</h2>
//         <p><strong>Bio:</strong> {profile.bio}</p>
//         <p><strong>Gender:</strong> {profile.gender}</p>
//         <p><strong>Age:</strong> {profile.age}</p>
//         <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
//         <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
//         {profile.profileImages.length > 0 && (
//           <img
//   src={`http://127.0.0.1:4000/uploads/profile/${profile.profileImages[0]}`}
//   alt="Profile"
//   className="w-32 h-32 rounded-full border mt-2"
// />

//         )}
//         <p><strong>Location:</strong> Lat: {profile.location.coordinates[1]}, Lng: {profile.location.coordinates[0]}</p>
//       </section>

//       {/* Preferences */}
//       <section>
//         <h2 className="text-xl font-semibold">Preference</h2>
//         <p><strong>Interested in:</strong> {preference.gender}</p>
//         <p><strong>Age Range:</strong> {preference.ageRange.min} - {preference.ageRange.max}</p>
//         <p><strong>Distance:</strong> {preference.distance} km</p>
//       </section>

//       {/* Likes */}
//       <section>
//         <h2 className="text-xl font-semibold">Likes</h2>
//         <p><strong>Total Likes:</strong> {totalLikes}</p>
//         <ul className="list-disc pl-5">
//           {likedBy.map((user, index) => (
//             <li key={index}>
//               {user.name} ({user.email}) — {new Date(user.at).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Matches */}
//       <section>
//         <h2 className="text-xl font-semibold">Matches</h2>
//         <p><strong>Total Matches:</strong> {totalMatches}</p>
//         <ul className="list-disc pl-5">
//           {matches.map((match, index) => (
//             <li key={index}>
//               {match.matchWith} ({match.email}) — {new Date(match.createdAt).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default UserAllDetails;










import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../../utils/basUrl';

function UserAllDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
        
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}api/admin/userdetails/${userId}`, {
          withCredentials: true,
        });
        console.log("✅ API Success:", res.data);
        setUserData(res.data.data);
      } catch (error) {
        console.error("❌ API Error:", error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    console.log("📦 userId from params:", userId);
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-pink-500"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Failed to load user data. Please try again.</span>
        </div>
      </div>
    );
  }

  const { basicInfo, profile, preference, likedBy, matches, totalLikes, totalMatches } = userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            User Profile Details
          </h1>
          <p className="text-gray-600">Complete overview of user information and activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="w-32 h-32 rounded-full ring ring-pink-200 ring-offset-2">
                    {profile.profileImages.length > 0 ? (
                      <img 
                        src={`http://127.0.0.1:4000/uploads/profile/${profile.profileImages[0]}`}
                        alt="Profile"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center rounded-full">
                        <span className="text-4xl text-gray-400">👤</span>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="card-title text-2xl text-gray-800">{basicInfo.name}</h2>
                <p className="text-gray-600">{basicInfo.email}</p>
                
                <div className="flex gap-2 mt-4">
                  <div className={`badge ${basicInfo.isPremium ? 'badge-warning' : 'badge-ghost'} badge-lg`}>
                    {basicInfo.isPremium ? '👑 Premium' : '🆓 Free'}
                  </div>
                  <div className={`badge ${basicInfo.isSuspended ? 'badge-error' : 'badge-success'} badge-lg`}>
                    {basicInfo.isSuspended ? '🚫 Suspended' : '✅ Active'}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="stat-figure text-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-pink-600">{totalLikes}</div>
              </div>

              <div className="stat bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="stat-figure text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="stat-title">Matches</div>
                <div className="stat-value text-purple-600">{totalMatches}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Details */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h3 className="card-title text-xl text-gray-800 mb-4">
                  <span className="text-2xl mr-2">👤</span>
                  Profile Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Gender:</span>
                      <div className="badge badge-outline">{profile.gender}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Age:</span>
                      <div className="badge badge-primary">{profile.age} years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Birthday:</span>
                      <span className="text-gray-600">{new Date(profile.birthday).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Location:</span>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 Lat: {profile.location.coordinates[1]?.toFixed(4)}, 
                        Lng: {profile.location.coordinates[0]?.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>
                
                <div>
                  <span className="font-semibold text-gray-700">Bio:</span>
                  <p className="text-gray-600 mt-2 leading-relaxed">{profile.bio || 'No bio available'}</p>
                </div>

                <div className="mt-4">
                  <span className="font-semibold text-gray-700 mb-2 block">Interests:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <div key={index} className="badge badge-secondary badge-lg">
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <h3 className="card-title text-xl text-gray-800 mb-4">
                  <span className="text-2xl mr-2">⚙️</span>
                  Dating Preferences
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                    <div className="text-2xl mb-2">💕</div>
                    <div className="font-semibold text-gray-700">Interested In</div>
                    <div className="badge badge-primary mt-2">{preference.gender}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl mb-2">🎂</div>
                    <div className="font-semibold text-gray-700">Age Range</div>
                    <div className="badge badge-secondary mt-2">
                      {preference.ageRange.min} - {preference.ageRange.max}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="font-semibold text-gray-700">Distance</div>
                    <div className="badge badge-accent mt-2">{preference.distance} km</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Likes & Matches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Likes */}
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <h3 className="card-title text-lg text-gray-800 mb-4">
                    <span className="text-xl mr-2">💖</span>
                    Recent Likes ({totalLikes})
                  </h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {likedBy.length > 0 ? (
                      likedBy.map((user, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                          <div className="avatar placeholder">
                            <div className="bg-pink-200 text-pink-800 rounded-full w-10 h-10">
                              <span className="text-sm">{user.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(user.at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">💔</div>
                        <p>No likes yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Matches */}
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <h3 className="card-title text-lg text-gray-800 mb-4">
                    <span className="text-xl mr-2">⚡</span>
                    Matches ({totalMatches})
                  </h3>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {matches.length > 0 ? (
                      matches.map((match, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                          <div className="avatar placeholder">
                            <div className="bg-purple-200 text-purple-800 rounded-full w-10 h-10">
                              <span className="text-sm">{match.matchWith.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{match.matchWith}</div>
                            <div className="text-sm text-gray-500">{match.email}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(match.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">🔍</div>
                        <p>No matches yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAllDetails;