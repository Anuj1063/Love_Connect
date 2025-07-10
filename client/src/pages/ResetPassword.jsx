

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BaseUrl from "../utils/basUrl"
import { motion } from "framer-motion"

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.password || !form.confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${BaseUrl}auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: form.password,
          confirmPassword: form.confirmPassword,
        }),
      })

      const data = await res.json()
      setLoading(false)

      if (res.ok) {
        toast.success("Password reset successfully")
        setTimeout(() => navigate("/login"), 2000)
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (err) {
      setLoading(false)
      toast.error("Server error. Please try again.")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-end pr-8 md:pr-16 lg:pr-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1718859040397-0de9f5b19c8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF1dGhpbmNhdGlvbiUyMGluJTIwZGF0aW5nJTIwYXBwfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Enhanced background overlay for better contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/60 backdrop-blur-[0.5px]"></div>

      {/* Additional overlay for the right side where the form is */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent"></div>

      {/* Floating decorative elements - adjusted for better visibility */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 rounded-full blur-md animate-pulse delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Enhanced Glassmorphism container */}
        <div className="backdrop-blur-2xl bg-white/15 border border-white/30 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/15 to-white/5 rounded-3xl"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-2xl mb-4 border border-white/40 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                Reset Password
              </h2>
              <p className="text-white/80 text-sm font-medium drop-shadow-sm">
                Create a new secure password for your account
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/95 mb-2 drop-shadow-sm">New Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/60 transition-all duration-300 group-hover:bg-white/20 shadow-lg"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white/95 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/95 mb-2 drop-shadow-sm">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/60 transition-all duration-300 group-hover:bg-white/20 shadow-lg"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white/95 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {form.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/25 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className={`h-full transition-all duration-500 ${
                          form.password.length < 6
                            ? "w-1/3 bg-red-400"
                            : form.password.length < 8
                              ? "w-2/3 bg-yellow-400"
                              : "w-full bg-green-400"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-white/80 font-medium drop-shadow-sm">
                      {form.password.length < 6 ? "Weak" : form.password.length < 8 ? "Medium" : "Strong"}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 relative overflow-hidden group shadow-xl ${
                  loading
                    ? "bg-gray-500/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-purple-700/90 hover:from-purple-700/95 hover:via-pink-700/95 hover:to-purple-800/95 hover:shadow-2xl"
                }`}
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2 drop-shadow-sm">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-white/70 text-sm drop-shadow-sm">
                Remember your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-200 hover:text-purple-100 font-semibold transition-colors underline decoration-purple-200/60 hover:decoration-purple-100/60"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "white",
        }}
      />
    </div>
  )
}

export default ResetPassword





// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"

// function ResetPassword() {
//   const [form, setForm] = useState({
//     password: "",
//     confirmPassword: "",
//   })
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm({ ...form, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!form.password || !form.confirmPassword) {
//       alert("Please fill in all fields")
//       return
//     }

//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match")
//       return
//     }

//     setLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false)
//       alert("Password reset successfully!")
//     }, 2000)
//   }

//   const getPasswordStrength = () => {
//     const password = form.password
//     if (password.length === 0) return { strength: 0, label: "", color: "" }
//     if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-red-500" }
//     if (password.length < 8) return { strength: 60, label: "Fair", color: "bg-orange-500" }
//     if (password.length < 12) return { strength: 80, label: "Good", color: "bg-blue-500" }
//     return { strength: 100, label: "Strong", color: "bg-green-500" }
//   }

//   const passwordStrength = getPasswordStrength()

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
//         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent"></div>
//       </div>

//       {/* Floating orbs */}
//       <motion.div
//         animate={{ 
//           y: [0, -20, 0],
//           rotate: [0, 360],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{ 
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-xl"
//       />
//       <motion.div
//         animate={{ 
//           y: [0, 30, 0],
//           rotate: [360, 0],
//           scale: [1, 0.8, 1]
//         }}
//         transition={{ 
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2
//         }}
//         className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-lg"
//       />
//       <motion.div
//         animate={{ 
//           y: [0, -15, 0],
//           x: [0, 10, 0],
//           scale: [1, 1.2, 1]
//         }}
//         transition={{ 
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 4
//         }}
//         className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-400/30 to-red-500/30 rounded-full blur-md"
//       />

//       {/* Main content */}
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 50, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="w-full max-w-md relative"
//         >
//           {/* Ultra-transparent glass card */}
//           <div className="relative backdrop-blur-md bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden">
//             {/* Ultra-subtle gradient overlay */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent rounded-3xl"></div>
            
//             {/* Noise texture overlay */}
//             <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
//               <div 
//                 className="w-full h-full"
//                 style={{
//                   backgroundImage: `url("https://plus.unsplash.com/premium_photo-1718859040397-0de9f5b19c8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGF1dGhpbmNhdGlvbiUyMGluJTIwZGF0aW5nJTIwYXBwfGVufDB8fDB8fHww")`,
//                 }}
//               />
//             </div>

//             <div className="relative z-10 p-8">
//               {/* Header with modern icon */}
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="text-center mb-8"
//               >
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/[0.08] shadow-lg">
//                   <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-3">
//                   Reset Password
//                 </h1>
//                 <p className="text-white/70 text-sm leading-relaxed">
//                   Enter your new password to secure your account
//                 </p>
//               </motion.div>

//               {/* Form */}
//               <motion.form
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 onSubmit={handleSubmit}
//                 className="space-y-6"
//               >
//                 {/* New Password Field */}
//                 <div className="space-y-3">
//                   <label className="block text-sm font-medium text-white/90">
//                     New Password
//                   </label>
//                   <div className="relative group">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       className="w-full px-5 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
//                       placeholder="Enter new password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
//                     >
//                       {showPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>

//                   {/* Password Strength Indicator */}
//                   {form.password && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="space-y-2"
//                     >
//                       <div className="flex items-center justify-between text-xs">
//                         <span className="text-white/70">Password strength</span>
//                         <span className={`font-medium ${
//                           passwordStrength.strength >= 80 ? 'text-green-400' :
//                           passwordStrength.strength >= 60 ? 'text-blue-400' :
//                           passwordStrength.strength >= 25 ? 'text-orange-400' : 'text-red-400'
//                         }`}>
//                           {passwordStrength.label}
//                         </span>
//                       </div>
//                       <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden backdrop-blur-sm">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${passwordStrength.strength}%` }}
//                           transition={{ duration: 0.5, ease: "easeOut" }}
//                           className={`h-full ${passwordStrength.color} transition-all duration-500`}
//                         />
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div className="space-y-3">
//                   <label className="block text-sm font-medium text-white/90">
//                     Confirm Password
//                   </label>
//                   <div className="relative group">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full px-5 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
//                       placeholder="Confirm new password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
//                     >
//                       {showConfirmPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>

//                   {/* Password Match Indicator */}
//                   {form.confirmPassword && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center gap-2 text-xs"
//                     >
//                       {form.password === form.confirmPassword ? (
//                         <>
//                           <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           <span className="text-green-400">Passwords match</span>
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                           </svg>
//                           <span className="text-red-400">Passwords don't match</span>
//                         </>
//                       )}
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
//                     loading
//                       ? "bg-white/[0.08] cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-indigo-600/40 hover:from-blue-500/50 hover:via-purple-500/50 hover:to-indigo-500/50 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/[0.08]"
//                   }`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                   <span className="relative flex items-center justify-center gap-2">
//                     {loading ? (
//                       <>
//                         <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Updating Password...
//                       </>
//                     ) : (
//                       <>
//                         Reset Password
//                         <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                         </svg>
//                       </>
//                     )}
//                   </span>
//                 </motion.button>
//               </motion.form>

//               {/* Footer */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className="mt-8 text-center"
//               >
//                 <p className="text-white/60 text-sm">
//                   Remember your password?{" "}
//                   <button className="text-blue-300 hover:text-blue-200 font-medium transition-colors underline decoration-blue-300/50 hover:decoration-blue-200/50 underline-offset-2">
//                     Sign In
//                   </button>
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default ResetPassword