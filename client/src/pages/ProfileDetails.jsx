

import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Camera,
  MessageCircle,
  X,
  Edit3,
  Settings,
  Share2,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import BaseUrl from "../utils/basUrl"
function ProfileDetails() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const getToken = () => {
    // First try localStorage
    let token = localStorage.getItem("token");

    // If not found, try cookies
    if (!token) {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("token=")
      );
      if (tokenCookie) {
        token = tokenCookie.split("=")[1];
      }
    }

    return token;
  };

  const fetchProfile = async () => {
    try {
      const token = getToken();

      console.log("Token found:", token ? "Yes" : "No");

      if (!token) {
        throw new Error(
          "No authentication token found in localStorage or cookies"
        );
      }



      const response = await fetch(`${BaseUrl}api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      const user = data.Data;

      if (user) {
        setProfile(user);
        console.log("Profile set successfully:", user);
      } else {
        throw new Error("No user data received from API");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageIndex = 0) => {
    if (!profile?.profileImages?.[imageIndex]) {
      return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    }
    return profile.profileImages[imageIndex];
  };

  const getAllImages = () => {
    if (!profile?.profileImages || profile.profileImages.length === 0) {
      return [
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      ];
    }
    return profile.profileImages;
  };

  const openPhotoModal = (index) => {
    setSelectedPhotoIndex(index);
    setShowPhotoModal(true);
  };

  const nextPhoto = () => {
    const allImages = getAllImages();
    setSelectedPhotoIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    const allImages = getAllImages();
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl animate-pulse mx-auto mb-6 shadow-2xl"></div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 rounded-3xl animate-ping mx-auto opacity-75"></div>
          </div>
          <p className="text-xl text-gray-700 font-semibold animate-pulse">
            Crafting your amazing profile...
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-200/50">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={fetchProfile}
              className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600 font-medium">
            No profile data available
          </p>
        </div>
      </div>
    );
  }

  const allImages = getAllImages();
  const userAge = calculateAge(profile.birthday);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
      {/* Enhanced Header with Glass Effect */}
      <div className="bg-white/60 backdrop-blur-xl border-b border-white/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section with Advanced Design */}
        <div className="bg-rose-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden mb-8 border border-white/20 relative">
          <div className="relative">
            {/* Main Photo */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden bg-rose-300 flex items-center justify-center">
              <img
                src={getImageUrl(0)}
                alt={profile.name || "Profile"}
                className="mt-70 max-w-[350%] max-h-[200%] object-contain cursor-pointer hover:scale-105 transition-transform duration-700 ease-out"
                onClick={() => openPhotoModal(0)}
                onError={(e) => {
                  e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Profile Info Overlay - Responsive */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-white text-right">
              <div className="flex items-center justify-end space-x-2 mb-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current animate-pulse" />
                <span
                  className={`text-xs sm:text-sm backdrop-blur-sm px-3 py-1 rounded-full border ${
                    profile.isPremium
                      ? "bg-yellow-500/40 border-yellow-300/20 text-yellow-100"
                      : "bg-gray-500/40 border-gray-300/20 text-gray-200"
                  }`}
                >
                  {profile.isPremium ? "Premium" : "Standard"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                {profile.name || "User"}
              </h1>
              <div className="flex items-center justify-end space-x-3 sm:space-x-4 text-sm sm:text-lg">
                {userAge && (
                  <span className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    {userAge} years old
                  </span>
                )}
                {/* <div className="flex items-center bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  <span>Location</span>
                  
                   
                </div> */}

                <div className="flex items-center bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  {/* falls back to empty string if placeName is missing */}
                  <span>
                    {profile.location?.placeName?.split(",")[0] ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid - Enhanced Responsive Design */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section - Enhanced */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full mr-4 shadow-lg"></div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  About Me
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {profile.bio ||
                  "Hello! I'm excited to meet new people and create meaningful connections. Let's chat and see where it goes!"}
              </p>
            </div>

            {/* Interests - Enhanced */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-fuchsia-500 via-cyan-500 to-violet-500 rounded-full mr-4 shadow-lg"></div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  My Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(
                  profile.interests || [
                    "Music",
                    "Travel",
                    "Food",
                    "Movies",
                    "Sports",
                  ]
                ).map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 text-violet-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:from-violet-100 hover:via-fuchsia-100 hover:to-cyan-100 transition-all duration-300 hover:scale-105 shadow-lg border border-violet-200/50 backdrop-blur-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo Gallery - Enhanced Responsive */}
            {allImages.length > 1 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full mr-4 shadow-lg"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    More Photos
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {allImages.slice(1).map((photo, index) => (
                    <div
                      key={index + 1}
                      className="relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl"
                      onClick={() => openPhotoModal(index + 1)}
                    >
                      <img
                        src={photo}
                        alt={`Photo ${index + 2}`}
                        className="w-full h-36 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500 shadow-xl"
                        onError={(e) => {
                          e.target.src =
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                        }}
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 group-hover:from-black/20 via-transparent to-transparent transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 group-hover:from-violet-500/10 to-cyan-500/0 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Enhanced Responsive */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Info - Enhanced */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Details
              </h3>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-200/30 hover:shadow-lg transition-all duration-300">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500 mr-3 sm:mr-4" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Software Developer
                  </span>
                </div>
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-fuchsia-50 to-cyan-50 rounded-2xl border border-fuchsia-200/30 hover:shadow-lg transition-all duration-300">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-500 mr-3 sm:mr-4" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Computer Science
                  </span>
                </div>
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-cyan-50 to-violet-50 rounded-2xl border border-cyan-200/30 hover:shadow-lg transition-all duration-300">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 mr-3 sm:mr-4" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {profile.gender || "Not specified"}
                  </span>
                </div>
                {profile.email && (
                  <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/30 hover:shadow-lg transition-all duration-300">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 mr-3 sm:mr-4" />
                    <span className="text-gray-700 font-medium text-xs sm:text-sm break-all">
                      {profile.email}
                    </span>
                  </div>
                )}
                {profile.birthday && (
                  <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/30 hover:shadow-lg transition-all duration-300">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 mr-3 sm:mr-4" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      {new Date(profile.birthday).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Enhanced Responsive */}
            <div className="space-y-4 sm:space-y-5">
              <Link to="/updateprofile" className="w-full block">
                <button className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center backdrop-blur-sm">
                  <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Edit Profile
                </button>
              </Link>

              <Link to="/settings" className="w-full block">
                <button
                  //className="w-full bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 text-white py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center backdrop-blur-sm"

                  className="w-full bg-white/90 backdrop-blur-sm border-2 border-violet-300/50 text-violet-600 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg hover:bg-violet-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center"
                >
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Settings
                </button>
              </Link>
            </div>

            {/* Profile Stats - Enhanced */}
            {/* <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Profile Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/30 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold">95%</div>
                  <div className="text-xs sm:text-sm opacity-90">Complete</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/30 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold">{allImages.length}</div>
                  <div className="text-xs sm:text-sm opacity-90">Photos</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Enhanced Photo Modal */}
        {showPhotoModal && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full w-full">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <img
                src={allImages[selectedPhotoIndex]}
                alt={`Photo ${selectedPhotoIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl sm:rounded-3xl shadow-2xl mx-auto"
                onError={(e) => {
                  e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
                crossOrigin="anonymous"
              />

              {allImages.length > 1 && (
                <>
                  <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center">
                    <button
                      onClick={prevPhoto}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center">
                    <button
                      onClick={nextPhoto}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhotoIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === selectedPhotoIndex
                            ? "bg-white scale-125"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
