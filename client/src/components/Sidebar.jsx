// import {
//   HomeIcon,
//   ChatBubbleLeftRightIcon,
//   UserIcon,
//   SunIcon,
//   MoonIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from "react-hot-toast";

// function Sidebar() {
//   const [isDark, setIsDark] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

// /////
//   ////
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         let token = Cookies.get("authToken");
//         if (!token) {
//           console.log("No token in cookies. Checking localStorage...");
//           token = localStorage.getItem("token");
//         }

//         if (!token) {
//           console.log("No token found in cookies or localStorage!");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get("http://127.0.0.1:4000/api/profile", {
//           headers: { token },
//         });

//         console.log("API Response:", response.data);
//         const user = response.data.Data;
//         setUserData(user);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();

//     const current = document.querySelector("html").getAttribute("data-theme");
//     setIsDark(current === "dark");
//   }, []);

//   const toggleTheme = () => {
//     const html = document.querySelector("html");
//     const current = html.getAttribute("data-theme");
//     const newTheme = current === "dark" ? "light" : "dark";
//     html.setAttribute("data-theme", newTheme);
//     setIsDark(newTheme === "dark");
//   };

//   const handleLogout = () => {
//     Cookies.remove("authToken");
//     localStorage.removeItem("auth");
//     localStorage.removeItem("token");
//     toast.success("Logout successful");
//     navigate("/login");
//   };

//   const getImageUrl = () => {
//     if (!userData?.profileImages?.[0]) {
//       return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//     }
//     return userData.profileImages[0];
//   };

//   return (
//     // <div className="h-screen w-20 md:w-64 bg-gradient-to-b from-neutral to-base-200 text-neutral-content flex flex-col justify-between shadow-2xl font-mono rounded-tr-3xl rounded-br-3xl">
//     //   {/* Top section */}
//     //   <div className="p-4">
//     //     <h1 className="text-xl md:text-2xl font-retro mb-10 tracking-wider text-accent">
//     //       🔥 Tinder
//     //     </h1>

//     //     <ul className="space-y-6 text-lg">
//     //       <li className="flex items-center gap-3 hover:text-accent transition cursor-pointer">
//     //         <HomeIcon className="w-6 h-6" />
//     //         <span className="hidden md:inline">Home</span>
//     //       </li>
//     //       <li className="flex items-center gap-3 hover:text-accent transition cursor-pointer">
//     //         <ChatBubbleLeftRightIcon className="w-6 h-6" />
//     //         <span className="hidden md:inline">Messages</span>
//     //       </li>
//     //       <li className="hover:text-accent transition cursor-pointer">
//     //         <Link to="/profile" className="flex items-center gap-3 focus:outline-none">
//     //           <UserIcon className="w-6 h-6" />
//     //           <span className="hidden md:inline">Profile</span>
//     //         </Link>
//     //       </li>
//     //       <li onClick={handleLogout} className="hover:text-error transition cursor-pointer flex items-center gap-3">
//     //         <ArrowRightOnRectangleIcon className="w-6 h-6" />
//     //         <span className="hidden md:inline">Logout</span>
//     //       </li>
//     //     </ul>
//     //   </div>

//     //   {/* Bottom section */}
//     //   <div className="p-4 space-y-4 border-t border-base-300">
//     //     <div className="flex items-center gap-4">
//     //       <div className="avatar">
//     //         <div className="w-12 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
//     //           {loading ? (
//     //             <div className="w-12 h-12 bg-base-300 rounded-full animate-pulse"></div>
//     //           ) : (
//     //             <img
//     //               src={getImageUrl()}
//     //               alt="Avatar"
//     //               onError={(e) => {
//     //                 e.target.src =
//     //                   "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//     //               }}
//     //               onLoad={(e) => {
//     //                 console.log("Image loaded successfully:", e.target.src);
//     //               }}
//     //               crossOrigin="anonymous"
//     //             />
//     //           )}
//     //         </div>
//     //       </div>
//     //       <div className="hidden md:block">
//     //         <p className="text-md font-bold tracking-wide text-accent">
//     //           {userData?.name || "Loading..."}
//     //         </p>
//     //       </div>
//     //     </div>

//     //     <button
//     //       onClick={toggleTheme}
//     //       className="btn btn-sm btn-outline btn-accent w-full hidden md:flex items-center gap-2 justify-center"
//     //     >
//     //       {isDark ? (
//     //         <SunIcon className="w-4 h-4" />
//     //       ) : (
//     //         <MoonIcon className="w-4 h-4" />
//     //       )}
//     //       <span>{isDark ? "Light" : "Dark"} Mode</span>
//     //     </button>
//     //   </div>
//     // </div>

//     <div
//     className="h-screen w-20 md:w-64 bg-gradient-to-br from-rose-600 via-pink-600 to-amber-500 text-white flex flex-col justify-between shadow-2xl font-mono rounded-tr-3xl rounded-br-3xl relative overflow-hidden"
// >
//   {/* Animated background overlay */}
//   <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-500/30 to-red-500/20 animate-pulse"></div>

//   {/* Decorative elements */}
//   <div className="absolute top-10 right-5 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-30 blur-xl"></div>
//   <div className="absolute bottom-20 left-3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 blur-lg"></div>

//   {/* Content with higher z-index */}
//   <div className="relative z-10">
//     {/* Top section */}
//     <div className="p-4">
//       <h1 className="text-xl md:text-2xl font-retro mb-10 tracking-wider text-yellow-300 drop-shadow-lg">
//         🔥 Tinder
//       </h1>

//       <ul className="space-y-6 text-lg">
//         <li className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//           <HomeIcon className="w-6 h-6 text-yellow-400" />
//           <span className="hidden md:inline font-semibold">Home</span>
//         </li>
//         <li className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//           <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-300" />
//           <span className="hidden md:inline font-semibold">Messages</span>
//         </li>
//         <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//           <Link to="/profile" className="flex items-center gap-3 focus:outline-none">
//             <UserIcon className="w-6 h-6 text-green-300" />
//             <span className="hidden md:inline font-semibold">Profile</span>
//           </Link>
//         </li>
//         <li onClick={handleLogout} className="hover:text-red-200 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-3 backdrop-blur-sm">
//           <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300" />
//           <span className="hidden md:inline font-semibold">Logout</span>
//         </li>
//       </ul>
//     </div>

//     {/* Bottom section */}
//     <div className="p-4 space-y-4 border-t border-white/20 backdrop-blur-sm">
//       <div className="flex items-center gap-4">
//         <div className="avatar">
//           <div className="w-12 rounded-full ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent shadow-lg">
//             {loading ? (
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
//             ) : (
//               <img
//                 src={getImageUrl()}
//                 alt="Avatar"
//                 onError={(e) => {
//                   e.target.src =
//                     "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//                 }}
//                 onLoad={(e) => {
//                   console.log("Image loaded successfully:", e.target.src);
//                 }}
//                 crossOrigin="anonymous"
//                 className="rounded-full"
//               />
//             )}
//           </div>
//         </div>
//         <div className="hidden md:block">
//           <p className="text-md font-bold tracking-wide text-yellow-200 drop-shadow">
//             {userData?.name || "Loading..."}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={toggleTheme}
//         className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:from-purple-600 hover:to-pink-600 w-full hidden md:flex items-center gap-2 justify-center shadow-lg transform hover:scale-105 transition-all duration-200"
//       >
//         {isDark ? (
//           <SunIcon className="w-4 h-4 text-yellow-300" />
//         ) : (
//           <MoonIcon className="w-4 h-4 text-blue-200" />
//         )}
//         <span className="font-semibold">{isDark ? "Light" : "Dark"} Mode</span>
//       </button>
//     </div>
//   </div>
// </div>
//   );
// }

// export default Sidebar;

// import {
//   HomeIcon,
//   ChatBubbleLeftRightIcon,
//   UserIcon,
//   SunIcon,
//   MoonIcon,
//   ArrowRightOnRectangleIcon,
//   IdentificationIcon,
//   ChartBarIcon,

// } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// function Sidebar() {
//   const [isDark, setIsDark] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Function to get user data from localStorage
//   const getUserDataFromStorage = () => {
//     try {
//       // Get user data from localStorage
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           console.log("Found user data in localStorage:", userData);
//           return {
//             name: userData.name || "User",
//             email: userData.email || "",
//             id: userData._id || userData.id || "",
//             profileImages: userData.profileImages || [],
//           };
//         } catch (parseError) {
//           console.log("Error parsing user data from localStorage:", parseError);
//         }
//       }

//       // Also try to get from 'auth' key as fallback
//       const storedAuth = localStorage.getItem("auth");
//       if (storedAuth) {
//         try {
//           const authData = JSON.parse(storedAuth);
//           if (authData.user || authData.name || authData.email) {
//             console.log("Found user data in localStorage auth");
//             return {
//               name: authData.user?.name || authData.name || "User",
//               email: authData.user?.email || authData.email || "",
//               id: authData.user?._id || authData.user?.id || authData.id || "",
//               profileImages: authData.user?.profileImages || [],
//             };
//           }
//         } catch (e) {
//           console.log("Error parsing localStorage auth data");
//         }
//       }

//       return null;
//     } catch (error) {
//       console.error("Error getting user data from storage:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         let token = Cookies.get("authToken");
//         if (!token) {
//           console.log("No token in cookies. Checking localStorage...");
//           token = localStorage.getItem("token");
//         }

//         if (!token) {
//           console.log("No token found in cookies or localStorage!");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get("http://127.0.0.1:4000/api/profile", {
//           headers: { token },
//         });

//         console.log("API Response:", response.data);
//         const user = response.data.Data;

//         // If API response is null or empty, get user data from localStorage
//         if (!user || Object.keys(user).length === 0) {
//           console.log(
//             "API returned null/empty data. Getting user data from localStorage..."
//           );
//           const localUserData = getUserDataFromStorage();
//           if (localUserData) {
//             setUserData(localUserData);
//           }
//         } else {
//           setUserData(user);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);

//         // On API error, try to get data from localStorage
//         console.log("API failed. Getting user data from localStorage...");
//         const localUserData = getUserDataFromStorage();
//         if (localUserData) {
//           setUserData(localUserData);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();

//     const current = document.querySelector("html").getAttribute("data-theme");
//     setIsDark(current === "dark");
//   }, []);

//   const toggleTheme = () => {
//     const html = document.querySelector("html");
//     const current = html.getAttribute("data-theme");
//     const newTheme = current === "dark" ? "light" : "dark";
//     html.setAttribute("data-theme", newTheme);
//     setIsDark(newTheme === "dark");
//   };

//   const handleLogout = () => {
//     Cookies.remove("authToken");
//     localStorage.removeItem("auth");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logout successful");
//     navigate("/login");
//   };

//   const getImageUrl = () => {
//     if (!userData?.profileImages?.[0]) {
//       return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//     }
//     return userData.profileImages[0];
//   };

//   return (
//     <div
//       className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-white flex flex-col justify-between shadow-2xl font-mono rounded-tr-3xl rounded-br-3xl z-50"
//       //className="fixed top-0 left-0 h-screen w-16 md:w-52 text-sm bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-white flex flex-col justify-between shadow-2xl font-sans rounded-tr-2xl rounded-br-2xl z-50"
//     >
//       {/* Animated background overlay */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-500/30 to-red-500/20 animate-pulse"></div>

//       {/* Decorative elements */}
//       <div className="absolute top-10 right-5 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-30 blur-xl"></div>
//       <div className="absolute bottom-20 left-3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 blur-lg"></div>

//       {/* Content with higher z-index */}
//       <div className="relative z-10">
//         {/* Top section */}
//         <div className="p-4">
//           {/* <h1 className="text-xl md:text-2xl font-retro mb-10 tracking-wider text-yellow-300 drop-shadow-lg">
//         🔥 Tinder
//       </h1> */}
//         <h1 className="text-lg md:text-xl font-bold mb-10 tracking-wide text-yellow-300 drop-shadow-lg">
//   🔥 LoveConnect
// </h1>

// <ul className="space-y-6 text-sm">
//   <li className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//      <ChartBarIcon className="w-6 h-6 text-yellow-400" />
//     {/* <CompassIcon className="w-6 h-6 text-yellow-400" /> */}
//     <Link to="/dashboard" className="hidden md:inline font-semibold">Explore</Link>
//   </li>

//   <Link to="/messages" className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//     <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-300" />
//     <span className="hidden md:inline font-semibold">Messages</span>
//   </Link>

//   <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//     <Link to="/updateprofile" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-lg">
//       <IdentificationIcon className="w-6 h-6 text-green-300" />
//       <span className="hidden md:inline font-semibold">ProfileUpdate</span>
//     </Link>
//   </li>

//   <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//     <Link to="/profile" className="flex items-center gap-3 focus:outline-none">
//       <UserIcon className="w-6 h-6 text-green-300" />
//       <span className="hidden md:inline font-semibold">Profile</span>
//     </Link>
//   </li>

//   <li onClick={handleLogout} className="hover:text-red-200 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-3 backdrop-blur-sm">
//     <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300" />
//     <span className="hidden md:inline font-semibold">Logout</span>
//   </li>
// </ul>

//         </div>

//         {/* Bottom section */}
//         <div className="p-4 space-y-4 border-t border-white/20 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <div className="avatar">
//               <div className="w-12 rounded-full ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent shadow-lg">
//                 {loading ? (
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
//                 ) : (
//                   <img
//                     src={getImageUrl()}
//                     alt="Avatar"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//                     }}
//                     onLoad={(e) => {
//                       console.log("Image loaded successfully:", e.target.src);
//                     }}
//                     crossOrigin="anonymous"
//                     className="rounded-full"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <p className="text-md font-bold tracking-wide text-yellow-200 drop-shadow">
//                 {userData?.name || "Loading..."}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={toggleTheme}
//             className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:from-purple-600 hover:to-pink-600 w-full hidden md:flex items-center gap-2 justify-center shadow-lg transform hover:scale-105 transition-all duration-200"
//           >
//             {isDark ? (
//               <SunIcon className="w-4 h-4 text-yellow-300" />
//             ) : (
//               <MoonIcon className="w-4 h-4 text-blue-200" />
//             )}
//             <span className="font-semibold">
//               {isDark ? "Light" : "Dark"} Mode
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
//////////////////////////////////////////////////////////






import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
  ChartBarIcon,
  
} from "@heroicons/react/24/outline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import  BaseUrl from "../utils/basUrl"
import RateUsPopup from "./RateUsPopup";

function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRatePopup, setShowRatePopup] = useState(false);

  const navigate = useNavigate();


  // Function to get user data from localStorage
  const getUserDataFromStorage = () => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          //console.log("Found user data in localStorage:", userData);
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
           // console.log("Found user data in localStorage auth");
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
          //console.log("No token in cookies. Checking localStorage...");
          token = localStorage.getItem("token");
        }

        if (!token) {
          console.log("No token found in cookies or localStorage!");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BaseUrl}api/profile`, {
          headers: { token },
        });

        //console.log("API Response:", response.data);
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

    toast.info("🚧 Coming Soon!", {
  icon: "🎉",
  style: {
    borderRadius: "12px",
    background: "#1e293b", // slate-800
    color: "#facc15",      // yellow-400
    fontWeight: "500",
    padding: "16px",
    fontSize: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
});


  };

//////


const handleLogoutClick = async () => {
  try {
    const res = await axios.get(`${BaseUrl}api/has-commented`, {
      withCredentials: true,
    });
    if (res.data.hasCommented) {
      handleLogout();
    } else {
      setShowRatePopup(true);
    }
  } catch (err) {
    console.error("Error checking comment status:", err);
    handleLogout(); // fallback logout
  }
};


///////
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
//     <div
//       className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-white flex flex-col justify-between shadow-2xl font-inter rounded-tr-3xl rounded-br-3xl z-50"
//       style={{
//         fontFamily:
//           "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
//       }}
//     >
//       {/* Animated background overlay */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-500/30 to-red-500/20 animate-pulse"></div>

//       {/* Decorative elements */}
//       <div className="absolute top-10 right-5 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-30 blur-xl"></div>
//       <div className="absolute bottom-20 left-3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 blur-lg"></div>

//       {/* Content with higher z-index */}
//       <div className="relative z-10">
//         {/* Top section */}
//         <div className="p-4">
//           <h1 className="text-lg md:text-xl font-bold mb-10 tracking-wide text-yellow-300 drop-shadow-lg">
//             🔥 LoveConnect
//           </h1>

//           <ul className="space-y-6 text-sm">
//             <li className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//               <ChartBarIcon className="w-6 h-6 text-yellow-400" />
//               <Link to="/dashboard" className="hidden md:inline font-semibold">
//                 Explore
//               </Link>
//             </li>

//             {/* <Link
//               to="/messages"
//               className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
//             >
//               <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-300" />
//               <span className="hidden md:inline font-semibold">Messages</span>
//             </Link> */}
//             <Link
//   to="/messages"
//   className="flex items-center gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
// >
//   <UserIcon className="w-6 h-6 text-pink-300" />
//   <span className="hidden md:inline font-semibold">Matches</span>
// </Link>

//             <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//               <Link
//                 to="/updateprofile"
//                 className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-lg"
//               >
//                 <IdentificationIcon className="w-6 h-6 text-green-300" />
//                 <span className="hidden md:inline font-semibold">
//                   ProfileUpdate
//                 </span>
//               </Link>
//             </li>

//             <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-3 focus:outline-none"
//               >
//                 <UserIcon className="w-6 h-6  text-blue-300" />
//                 <span className="hidden md:inline font-semibold">Profile</span>
//               </Link>
//             </li>

//             <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
//               <Link
//                 to="/settings"
//                 className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-lg"
//               >
//                 <Cog6ToothIcon className="w-6 h-6 text-yellow-400" />
//                 <span className="hidden md:inline font-semibold">Settings</span>
//               </Link>
//             </li>

//             <li
//               onClick={handleLogout}
//               className="hover:text-red-200 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-3 backdrop-blur-sm"
//             >
//               <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300" />
//               <span className="hidden md:inline font-semibold">Logout</span>
//             </li>
//           </ul>
//         </div>

//         {/* Bottom section */}
//         <div className="p-4 space-y-4 border-t border-white/20 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <div className="avatar">
//               <div className="w-12 rounded-full ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent shadow-lg">
//                 {loading ? (
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
//                 ) : (
//                   <img
//                     src={getImageUrl()}
//                     alt="Avatar"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
//                     }}
//                     onLoad={(e) => {
//                       console.log("Image loaded successfully:", e.target.src);
//                     }}
//                     crossOrigin="anonymous"
//                     className="rounded-full"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <p className="text-md font-bold tracking-wide text-yellow-200 drop-shadow">
//                 {userData?.name || "Loading..."}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={toggleTheme}
//             className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:from-purple-600 hover:to-pink-600 w-full hidden md:flex items-center gap-2 justify-center shadow-lg transform hover:scale-105 transition-all duration-200"
//           >
//             {isDark ? (
//               <SunIcon className="w-4 h-4 text-yellow-300" />
//             ) : (
//               <MoonIcon className="w-4 h-4 text-blue-200" />
//             )}
//             <span className="font-semibold">
//               {isDark ? "Light" : "Dark"} Mode
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
<div
  className="fixed top-0 left-0 h-screen w-16 md:w-64 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-white flex flex-col justify-between shadow-2xl font-inter rounded-tr-3xl rounded-br-3xl z-50 transition-all duration-300"
  style={{
    fontFamily:
      "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
  }}
>
  {/* Animated Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-500/30 to-red-500/20 animate-pulse"></div>

  {/* Decorative Glow */}
  <div className="absolute top-10 right-5 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-30 blur-xl"></div>
  <div className="absolute bottom-20 left-3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 blur-lg"></div>

  {/* Sidebar Content */}
  <div className="relative z-10 flex-1 flex flex-col justify-between">
    {/* Logo and Menu */}
    <div className="p-4 space-y-6">
      {/* Logo */}
      <h1 className="text-lg md:text-xl font-bold mb-6 text-yellow-300 drop-shadow-lg text-center md:text-left">
        🔥
        <span className="hidden md:inline">LoveConnect</span>
      </h1>

      {/* Navigation */}
      <ul className="space-y-4 text-sm">
        <li className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
         
          <Link to="/dashboard" 
          //className="flex items-center justify-center md:justify-start gap-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          className="flex items-center justify-center md:justify-start gap-3 focus:outline-none"
          >
           <ChartBarIcon className="w-6 h-6 text-yellow-400" />
            <span className="hidden md:inline font-semibold">Explore</span>  
          </Link>
        </li>

        <li className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
          
          <Link to="/messages" 
          //className="flex items-center justify-center md:justify-start gap-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          className="flex items-center justify-center md:justify-start gap-3 focus:outline-none"
          >
          <UserIcon className="w-6 h-6 text-pink-300" />
            <span className="hidden md:inline font-semibold">Matches</span> 
          </Link>
        </li>

        <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
          <Link
            to="/updateprofile"
            className="flex items-center justify-center md:justify-start gap-3 focus:outline-none"
            //className="flex items-center justify-center md:justify-start gap-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <IdentificationIcon className="w-6 h-6 text-green-300" />
            <span className="hidden md:inline font-semibold">ProfileUpdate</span>
          </Link>
        </li>

        <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
          <Link
            to="/profile"
            className="flex items-center justify-center md:justify-start gap-3 focus:outline-none"
          >
            <UserIcon className="w-6 h-6 text-blue-300" />
            <span className="hidden md:inline font-semibold">Profile</span>
          </Link>
        </li>

        <li className="hover:text-yellow-300 hover:bg-white/10 p-2 rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm">
          <Link
            to="/settings"
           // className="flex items-center justify-center md:justify-start gap-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
           className="flex items-center justify-center md:justify-start gap-3 focus:outline-none"
          >
            <Cog6ToothIcon className="w-6 h-6 text-yellow-400" />
            <span className="hidden md:inline font-semibold">Settings</span>
          </Link>
        </li>


        <li
          onClick={handleLogoutClick}
          className="hover:text-red-200 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-3 backdrop-blur-sm"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-300" />
          <span className="hidden md:inline font-semibold">Logout</span>
        </li>
      </ul>
    </div>

    {/* Bottom Section */}
    {/* <div className="p-4 space-y-4 border-t border-white/20 backdrop-blur-sm">
  
  <div className="flex items-center gap-4">
    <div className="avatar">
      <div className="w-12 rounded-full ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent shadow-lg">
        {loading ? (
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
        ) : (
          <img
            src={getImageUrl()}
            alt="Avatar"
            onError={(e) => {
              e.target.src =
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
            }}
            crossOrigin="anonymous"
            className="rounded-full"
          />
        )}
      </div>
    </div>
    <div className="hidden md:block">
      <p className="text-md font-bold tracking-wide text-yellow-200 drop-shadow">
        {userData?.name || "Loading..."}
      </p>
    </div>
  </div>

  
  <div className="h-10 hidden md:block"></div>
</div> */}

     <div className="p-4 space-y-4 border-t border-white/20 backdrop-blur-sm">
     
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent shadow-lg">
            {loading ? (
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            ) : (
              <img
                src={getImageUrl()}
                alt="Avatar"
                onError={(e) => {
                  e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
                crossOrigin="anonymous"
                className="rounded-full"
              />
            )}
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-md font-bold tracking-wide text-yellow-200 drop-shadow">
            {userData?.name || "Loading..."}
          </p>
        </div>
      </div>

      
       {/* <button
        onClick={toggleTheme}
        className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:from-purple-600 hover:to-pink-600 w-full hidden md:flex items-center gap-2 justify-center shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {isDark ? (
          <SunIcon className="w-4 h-4 text-yellow-300" />
        ) : (
          <MoonIcon className="w-4 h-4 text-blue-200" />
        )}
        <span className="font-semibold">{isDark ? "Light" : "Dark"} Mode</span>
      </button> */}
     
    </div> 
  </div>

  {showRatePopup && (
  <RateUsPopup
    onClose={() => setShowRatePopup(false)}
    onSuccess={() => {
      setShowRatePopup(false);
      handleLogout();
    }}
  />
)}
<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  toastClassName="rounded-xl backdrop-blur-md shadow-lg"
/>
</div>




  );
}

export default Sidebar;
