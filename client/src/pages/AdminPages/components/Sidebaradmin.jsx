





import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
  ChartBarIcon,
  HeartIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Sidebaradmin() {
  const [isDark, setIsDark] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  // Function to get user data from localStorage
  const getUserDataFromStorage = () => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("Found user data in localStorage:", userData);
          return {
            name: userData.name || "User",
            email: userData.email || "",
            id: userData._id || userData.id || "",
            profileImages: userData.profileImages || [],
          };
        } catch (parseError) {
          console.log("Error parsing user data from localStorage:", parseError);
        }
      }

      // Also try to get from 'auth' key as fallback
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth);
          if (authData.user || authData.name || authData.email) {
            console.log("Found user data in localStorage auth");
            return {
              name: authData.user?.name || authData.name || "User",
              email: authData.user?.email || authData.email || "",
              id: authData.user?._id || authData.user?.id || authData.id || "",
              profileImages: authData.user?.profileImages || [],
            };
          }
        } catch (e) {
          console.log("Error parsing localStorage auth data");
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting user data from storage:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let token = Cookies.get("authToken");
        if (!token) {
          console.log("No token in cookies. Checking localStorage...");
          token = localStorage.getItem("token");
        }

        if (!token) {
          console.log("No token found in cookies or localStorage!");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:4000/api/profile", {
          headers: { token },
        });

        console.log("API Response:", response.data);
        const user = response.data.Data;

        // If API response is null or empty, get user data from localStorage
        if (!user || Object.keys(user).length === 0) {
          console.log(
            "API returned null/empty data. Getting user data from localStorage..."
          );
          const localUserData = getUserDataFromStorage();
          if (localUserData) {
            setUserData(localUserData);
          }
        } else {
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        // On API error, try to get data from localStorage
        console.log("API failed. Getting user data from localStorage...");
        const localUserData = getUserDataFromStorage();
        if (localUserData) {
          setUserData(localUserData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const current = document.querySelector("html").getAttribute("data-theme");
    setIsDark(current === "dark");
  }, []);

  const toggleTheme = () => {
    const html = document.querySelector("html");
    const current = html.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successful");
    navigate("/login");
  };

  const getImageUrl = () => {
    if (!userData?.profileImages?.[0]) {
      return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    }
    return userData.profileImages[0];
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 w-20 md:w-64 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white flex flex-col justify-between shadow-2xl z-50 rounded-tr-3xl rounded-br-3xl overflow-hidden`}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-10 w-32 h-32 bg-gradient-to-br from-blue-600/15 to-indigo-600/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 right-5 w-36 h-36 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/30 via-gray-800/40 to-zinc-800/30 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <HeartIcon className="w-8 h-8 text-red-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full animate-ping"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent tracking-wider">
                  LoveConnect
                </h1>
                <p className="text-xs text-gray-400 opacity-80">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <div className="w-5 h-5 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-3">
          {/* Dashboard */}
          <Link to="/admindashboard" className="group">
            <div className="flex items-center gap-3 hover:text-amber-300 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <ChartBarIcon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 text-blue-400 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
              </div>
              <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Manage All Users */}
          <Link to="/manageallusers" className="group">
            <div className="flex items-center gap-3 hover:text-amber-300 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <UsersIcon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 text-emerald-400 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
                  <UsersIcon className="w-6 h-6" />
                </div>
              </div>
              <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
                Manage All Users
              </span>
            </div>
          </Link>

          {/* Past Users */}
          <Link to="/pastusers" className="group">
            <div
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 
                  hover:scale-105 hover:shadow-lg hover:bg-white/10 backdrop-blur-sm"
            >
              <div className="relative">
                {/* Single Red User Icon */}
                <UserIcon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
                  <UserIcon className="w-6 h-6" />
                </div>
              </div>

              {/* Label */}
              <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
                Past Users
              </span>
            </div>
          </Link>

         <Link to="/managecommnets" className="group">
  <div className="flex items-center gap-3 hover:text-purple-300 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-lg">
    <div className="relative">
      <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 text-purple-400 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </div>
    </div>
    <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
      Manage Comments
    </span>
  </div>
</Link>


          {/* Reported Users */}
          <Link to="/reportedusers" className="group">
            <div className="flex items-center gap-3 hover:text-amber-300 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <ExclamationTriangleIcon className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 text-amber-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
                  <ExclamationTriangleIcon className="w-6 h-6" />
                </div>
              </div>
              <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
                Reported Users
              </span>
            </div>
          </Link>

          {/* Logout */}
          <div onClick={handleLogout} className="group">
            <div className="flex items-center gap-3 hover:text-red-300 hover:bg-red-600/20 p-3 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-500 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
                <div className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300">
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                </div>
              </div>
              <span className="hidden md:inline font-semibold group-hover:text-white transition-colors duration-300">
                Logout
              </span>
            </div>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 mt-6 border-t border-white/20 backdrop-blur-sm space-y-6">
          {/* User profile */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="relative">
              <div className="w-12 h-12 rounded-full ring-2 ring-amber-500/50 ring-offset-2 ring-offset-transparent overflow-hidden shadow-lg">
                {loading ? (
                  <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 animate-pulse"></div>
                ) : (
                  <img
                    src={getImageUrl()}
                    alt="Admin Avatar"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src =
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                    }}
                    onLoad={(e) => {
                      console.log("Image loaded successfully:", e.target.src);
                    }}
                    crossOrigin="anonymous"
                  />
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>

            <div className="hidden md:block flex-1 min-w-0">
              <p className="text-md font-bold tracking-wide text-amber-300 drop-shadow truncate">
                {userData?.name || "Loading..."}
              </p>
              <p className="text-sm text-gray-400 opacity-80 truncate">
                System Administrator
              </p>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full  items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-700/50 to-gray-700/50 border border-white/20 text-white hover:from-slate-600/60 hover:to-gray-600/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group hidden md:flex"
          >
            <div className="relative">
              {isDark ? (
                <SunIcon className="w-5 h-5 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-slate-300 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>
            <span className="font-semibold">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebaradmin;
