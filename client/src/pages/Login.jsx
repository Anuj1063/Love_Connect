

////////////////////////////////


// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { addUser } from "../utils/userSlice"
// import BaseUrl from "../utils/basUrl"
// import { ToastContainer, toast } from 'react-toastify';

// function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const res = await axios.post(
//         `${BaseUrl}auth/signin`,
//         { email, password },
//         {
//           withCredentials: true,
//         },
//       )

//       if (res.data.status) {
//         const token = res.data.cryptoToken
//         const user = res.data.user

//         localStorage.setItem("token", token)
//         localStorage.setItem("user", JSON.stringify(user))
//         dispatch(addUser(user))

//         if (user.role === "admin") {
//           navigate("/admindashboard")
//         } else {
//           // Check if profile exists
//           try {
//             const profileRes = await axios.get(`${BaseUrl}api/profile`, {
//               headers: {
//                 "Content-Type": "application/json",
//                 token: token,
//               },
//             })

//             if (profileRes.status === 500) {
//               navigate("/addprofiledetails")
//             } else {
//               navigate("/dashboard")
//             }
//           } catch (profileErr) {
//             console.error("Profile check failed:", profileErr)
//             navigate("/addprofiledetails")
//           }
//         }
//       } else {
//         toast(res.data.message || "Login failed.")
//       }
//     } catch (err) {
//       console.error("Login error:", err)
//       toast("An error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <>
//     <div className="min-h-screen relative flex">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1590479664054-c75d30303991?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
//           alt="Dating app background"
//           className="w-full h-full object-cover"
//         />
//         {/* Gradient overlay for better contrast */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/60"></div>
//       </div>

//       {/* Left Side - Welcome Content */}
//       <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
//         <div className="max-w-lg text-center lg:text-left">
//           {/* Logo */}
         
          
// <div className="absolute top-4 left-10 z-55 flex items-center gap-5">
//   <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-2xl shadow-pink-500/30">
//     <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
//       <path
//         fillRule="evenodd"
//         d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//         clipRule="evenodd"
//       />
//     </svg>
//   </div>
//   <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
//     LoveConnect
//   </h1>
// </div>


//           {/* Welcome Text */}
//           <div className="space-y-6">
//             <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
//               Find Your
//               <span className="block bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
//                 Perfect Match
//               </span>
//             </h2>
//             <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
//               Connect with like-minded people, create meaningful relationships, and discover love in the most beautiful
//               way possible.
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
//               <div className="flex items-center space-x-2 text-white/80">
//                 <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
//                 <span className="text-sm">2M+ Active Users</span>
//               </div>
//               <div className="flex items-center space-x-2 text-white/80">
//                 <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
//                 <span className="text-sm">500K+ Matches Made</span>
//               </div>
//               <div className="flex items-center space-x-2 text-white/80">
//                 <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//                 <span className="text-sm">4.8★ Rating</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="relative z-10 w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Form Header */}
//           <div className="text-center mb-8">
//             <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h3>
//             <p className="text-white/80 drop-shadow">Sign in to continue your journey</p>
//           </div>

//           {/* Login Form */}
//           <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/25 border border-white/20 hover:bg-white/20 transition-all duration-500">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div className="space-y-3">
//                 <label className="text-sm font-semibold text-white/95 tracking-wide">Email Address</label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg
//                       className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     required
//                     className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-3">
//                 <label className="text-sm font-semibold text-white/95 tracking-wide">Password</label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg
//                       className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     required
//                     className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-pink-300 transition-colors"
//                   >
//                     {showPassword ? (
//                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
//                         />
//                       </svg>
//                     ) : (
//                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password */}
//               <div className="text-right">
//                 <a
//                   href="/forgot-password"
//                   className="text-sm text-pink-300 hover:text-pink-200 font-medium transition-colors hover:underline"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 {isLoading ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     <span>Signing in...</span>
//                   </div>
//                 ) : (
//                   <span className="relative z-10">Sign In</span>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-white/20"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-6 bg-white/10 text-white/80 backdrop-blur-sm rounded-full border border-white/20">
//                   or continue with
//                 </span>
//               </div>
//             </div>

//             {/* Social Login */}
//             <div className="grid grid-cols-2 gap-4">
//               <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
//                 <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
//                   Google
//                 </span>
//               </button>

//               <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
//                 <svg
//                   className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//                 <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
//                   Facebook
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center mt-8">
//             <p className="text-white/80 drop-shadow">
//               Don't have an account?{" "}
//               <a
//                 href="/register"
//                 className="text-pink-300 hover:text-pink-200 font-semibold transition-colors hover:underline"
//               >
//                 Create Account
//               </a>
//             </p>
//           </div>

//           {/* Footer Links */}
//           <div className="text-center mt-6">
//             <p className="text-xs text-white/60 drop-shadow">
//               By signing in, you agree to our{" "}
//               <a href="/terms" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
//                 Terms
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
//                 Privacy Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-rose-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
//       </div>
//     </div>
//     <ToastContainer/>
//     </>
//   )
// }

// export default Login


























"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import BaseUrl from "../utils/basUrl";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${BaseUrl}auth/signin`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.data.status) {
        const token = res.data.cryptoToken;
        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(addUser(user));

        if (user.role === "admin") {
          navigate("/admindashboard");
        } else {
          try {
            const profileRes = await axios.get(`${BaseUrl}api/profile`, {
              headers: {
                "Content-Type": "application/json",
                token: token,
              },
            });

            if (profileRes.status === 500) {
              navigate("/addprofiledetails");
            } else {
              navigate("/dashboard");
            }
          } catch (profileErr) {
            console.error("Profile check failed:", profileErr);
            navigate("/addprofiledetails");
          }
        }
      } else {
        toast(res.data.message || "Login failed.");
      }
    } catch (err) {
      console.log("Login error:", err);

      toast(err.response.data.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen relative flex flex-col lg:flex-row overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590479664054-c75d30303991?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0"
            alt="Dating app background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/60"></div>
        </div>

        {/* Left - Welcome Section */}
        <div className="relative z-10 w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-10 md:p-16 text-center lg:text-left">
          <div className="max-w-xl">
            <div className="absolute top-4 left-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                LoveConnect
              </h1>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-20 lg:mt-0 leading-tight drop-shadow-2xl">
              Find Your
              <span className="block bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h2>
            <p className="mt-4 text-white/90 text-lg sm:text-xl drop-shadow-lg">
              Connect with like-minded people and discover love in the most beautiful way possible.
            </p>

            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>2M+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>500K+ Matches Made</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>4.8★ Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
         {/* Right Side - Login Form */}
      <div className="relative z-10 w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h3>
            <p className="text-white/80 drop-shadow">Sign in to continue your journey</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-black/25 border border-white/20 hover:bg-white/20 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/95 tracking-wide">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white/60 group-focus-within:text-pink-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-300 focus:bg-white/20 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm hover:bg-white/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-pink-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-pink-300 hover:text-pink-200 font-medium transition-colors hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span className="relative z-10">Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                {/* <span className="px-6 bg-white/10 text-white/80 backdrop-blur-sm rounded-full border border-white/20">
                  or continue with
                </span> */}
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              {/* <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
                <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Google
                </span>
              </button>

              <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  Facebook
                </span>
              </button> */}
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-white/80 drop-shadow">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-pink-300 hover:text-pink-200 font-semibold transition-colors hover:underline"
              >
                Create Account
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60 drop-shadow">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-pink-300 hover:text-pink-200 transition-colors hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

        {/* Floating Gradient Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-rose-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
