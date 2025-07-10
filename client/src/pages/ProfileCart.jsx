

// import { useEffect, useState } from "react";
// import axios from "axios";
// import BaseUrl from "../utils/basUrl";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// function ProfileCart() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         //console.log("Fetching profiles from:", `${BaseUrl}api/profile/discover`)
//         const res = await axios.get(`${BaseUrl}api/profile/discover`, {
//           withCredentials: true,
//         });
//         // console.log("API Response:", res.data)
//         setUsers(res.data.data || []);
//       } catch (err) {
//         console.error("No Near By Users login after some times",);
//         setError("No Near By Users login after some times");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfiles();
//   }, []);

//   const handleSwipe = async (userId, type) => {
//     try {
//       await axios.post(
//         `${BaseUrl}api/swipe/${userId}`,
//         { type },
//         { withCredentials: true }
//       );
//       setCurrentIndex((prev) => prev + 1);
//       setActiveImageIndex(0);
//     } catch (err) {
//       console.error(`Swipe ${type} failed:`, err);
//     }
//   };

//   const handleDragEnd = (event, info, userId) => {
//     if (info.offset.x > 100) {
//       handleSwipe(userId, "like");
//     } else if (info.offset.x < -100) {
//       handleSwipe(userId, "dislike");
//     }
//   };

//   const handleImageChange = (dir, length) => {
//     setActiveImageIndex((prev) => {
//       if (dir === "next") return prev === length - 1 ? 0 : prev + 1;
//       return prev === 0 ? length - 1 : prev - 1;
//     });
//   };

//   // Debug logging
//   //console.log("Component state:", { users, loading, currentIndex, error })

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-200 via-pink-200 to-yellow-200">
//         <motion.div
//           className="relative"
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 2,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//         >
//           <div className="w-16 h-16 border-4 border-transparent border-t-pink-500 border-r-purple-500 rounded-full"></div>
//           <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-cyan-500 border-l-rose-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-4 w-8 h-8 border-4 border-transparent border-t-orange-500 border-l-yellow-500 rounded-full animate-spin"></div>
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-br from-red-200 via-purple-200 to-indigo-200">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl border-2 border-gradient-to-r from-red-300 to-pink-300">
//           <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full flex items-center justify-center">
//             <span className="text-white text-2xl">⚠️</span>
//           </div>
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
//             Error Loading Profiles
//           </h2>
//           <p className="text-gray-600 text-sm mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//           >
//             ✨ Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const user = users[currentIndex];
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-br from-indigo-200 via-pink-200 to-yellow-200 relative overflow-hidden">
//         {/* Enhanced background decorations */}
//         <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-300/40 to-orange-300/40 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-br from-green-300/40 to-emerald-300/40 rounded-full blur-xl animate-pulse"></div>

//         <motion.div
//           className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl border-2 border-white/50"
//           initial={{ opacity: 0, y: 50, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.div
//             className="w-24 h-24 mx-auto mb-6 relative"
//             animate={{ y: [0, -10, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
//             <div className="relative w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-3xl">🎭</span>
//             </div>
//           </motion.div>

//           <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
//             No More Profiles
//           </h2>
//           <p className="text-gray-600 text-base mb-8 leading-relaxed">
//             You've viewed all the available profiles. Check back later for new
//             connections! 🌟
//           </p>

//           <motion.button
//             onClick={() => window.location.reload()}
//             className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//             <span className="relative">🌈 Refresh Profiles</span>
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   const images = user.profile?.profileImages || [];

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4 relative overflow-hidden bg-gradient-to-br from-rose-100  via-cyan-100 to-emerald-100">
//       {/* Enhanced background decorative elements */}
//       <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-2xl animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-2xl animate-pulse"></div>
//       <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-violet-300/30 to-indigo-300/30 rounded-full blur-xl animate-pulse"></div>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={user.userId}
//           className="relative w-96 rounded-3xl shadow-2xl overflow-hidden cursor-pointer backdrop-blur-xl"
//           style={{
//             height: "38rem",
//             background:
//               "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
//             boxShadow:
//               "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3)",
//           }}
//           initial={{ x: 300, opacity: 0, scale: 0.9, rotateY: 15 }}
//           animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
//           exit={{ x: -300, opacity: 0, scale: 0.9, rotateY: -15 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           dragElastic={0.7}
//           onDragEnd={(e, info) => handleDragEnd(e, info, user.userId)}
//           onClick={() => navigate(`/userdetails/${user.userId}`)}
//           whileHover={{ y: -5 }}
//         >
//           {/* Image Carousel */}
//           <div className="relative h-[30rem] rounded-t-3xl overflow-hidden">
//             {images.length > 0 && (
//               <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
//                 {images.map((_, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex-1 h-1.5 rounded-full overflow-hidden bg-black/20"
//                     initial={{ scale: 0.8 }}
//                     animate={{ scale: index <= activeImageIndex ? 1 : 0.8 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <motion.div
//                       className="h-full bg-white rounded-full shadow-sm"
//                       initial={{ width: "0%" }}
//                       animate={{
//                         width: index <= activeImageIndex ? "100%" : "0%",
//                       }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//             {/* Main image */}
//             {images.length > 0 ? (
//               <motion.img
//                 key={activeImageIndex}
//                 src={images[activeImageIndex]}
//                 alt={user.name}
//                 className="w-full h-[27rem] object-cover object-center"
//                 initial={{ opacity: 0, scale: 1.1 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleImageChange("next", images.length);
//                 }}
//               />
//             ) : (
//               <div className="w-full h-[27rem] bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-6xl mb-2">🎨</div>
//                   <span className="text-gray-600 text-lg font-medium">
//                     No Image
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Image navigation overlay */}
//             {images.length > 1 && (
//               <div className="absolute inset-0 flex">
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleImageChange("prev", images.length);
//                   }}
//                   className="w-1/2 cursor-pointer"
//                 />
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleImageChange("next", images.length);
//                   }}
//                   className="w-1/2 cursor-pointer"
//                 />
//               </div>
//             )}

//             {/* Enhanced gradient overlay */}
//             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
//           </div>

//           {/* Enhanced Profile Info Section */}
//           <div className="absolute bottom-0 w-full px-6 pt-8 pb-6 rounded-3xl bg-gradient-to-t from-white via-white/98 to-white/90 backdrop-blur-xl">
//             {/* Enhanced decorative elements */}
//             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-300/30 via-purple-300/20 to-transparent rounded-full -translate-y-12 translate-x-12 animate-pulse"></div>
//             <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-300/30 via-blue-300/20 to-transparent rounded-full translate-y-8 -translate-x-8 animate-pulse"></div>
//             <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full animate-pulse"></div>

//             {/* Enhanced status indicator */}
//             <motion.div
//               className="flex items-center gap-2 mb-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="relative">
//                 <motion.div
//                   className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 shadow-lg shadow-green-500/40"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//                 <motion.div
//                   className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-75"
//                   animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//               </div>
//               <span className="text-sm font-semibold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                 Recently Active
//               </span>
//               <motion.span
//                 className="text-xl"
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{
//                   duration: 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   delay: 1,
//                 }}
//               >
//                 🌟
//               </motion.span>
//             </motion.div>

//             {/* Enhanced name and age */}
//             <motion.div
//               className="flex items-center justify-between mb-3"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 via-pink-700 to-orange-700 bg-clip-text text-transparent">
//                 {user.name}
//               </h2>
//               {/* <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
//                 <span className="relative text-base font-bold bg-gradient-to-r from-white to-gray-50 backdrop-blur px-4 py-2 rounded-2xl border-2 border-gradient-to-r shadow-lg text-gray-800 hover:shadow-xl transition-shadow">
//                   {user.profile?.age || "N/A"} 🎂
//                 </span>
//               </div> */}

//               <div className="relative group inline-block max-w-full">
//                 {/* Gradient Background Blur */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500 rounded-2xl blur-md opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>

//                 {/* Age Text Badge */}
//                 <span className="relative text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-white to-gray-50 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-200 shadow-lg text-gray-800 hover:shadow-xl transition-all duration-300 whitespace-nowrap">
//                   {user.profile?.age || "N/A"} 🎂
//                 </span>
//               </div>
//             </motion.div>

//             {/* Enhanced location */}
//             <motion.div
//               className="flex items-center gap-2 mb-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 flex items-center justify-center shadow-lg">
//                 <span className="text-white text-xs">📍</span>
//               </div>
//               <p className="text-sm text-gray-700 font-medium">
//                 {user.distance || "Nearby"}
//               </p>
//             </motion.div>

//             {/* Enhanced interests */}
//             <motion.div
//               className="space-y-3"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <div className="flex items-center gap-2">
//                 <motion.div
//                   className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg"
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{
//                     duration: 2,
//                     repeat: Number.POSITIVE_INFINITY,
//                     delay: 0.5,
//                   }}
//                 >
//                   <span className="text-white text-xs">💝</span>
//                 </motion.div>
//                 <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   Interests
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {(user.profile?.interests || [])
//                   .slice(0, 4)
//                   .map((interest, idx) => {
//                     const colors = [
//                       {
//                         bg: "from-amber-200 via-yellow-200 to-orange-200",
//                         border: "border-amber-300",
//                         text: "text-amber-900",
//                         emoji: "🌟",
//                       },
//                       {
//                         bg: "from-purple-200 via-violet-200 to-indigo-200",
//                         border: "border-purple-300",
//                         text: "text-purple-900",
//                         emoji: "💜",
//                       },
//                       {
//                         bg: "from-pink-200 via-rose-200 to-red-200",
//                         border: "border-pink-300",
//                         text: "text-pink-900",
//                         emoji: "🌸",
//                       },
//                       {
//                         bg: "from-emerald-200 via-green-200 to-teal-200",
//                         border: "border-emerald-300",
//                         text: "text-emerald-900",
//                         emoji: "🍃",
//                       },
//                     ];
//                     const colorScheme = colors[idx % 4];

//                     return (
//                       <motion.span
//                         key={idx}
//                         className={`group relative overflow-hidden px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer bg-gradient-to-r ${colorScheme.bg} border-2 ${colorScheme.border} ${colorScheme.text} hover:shadow-lg hover:scale-105 flex items-center gap-1`}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.6 + idx * 0.1 }}
//                         whileHover={{ y: -2 }}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                         <span className="relative text-xs">
//                           {colorScheme.emoji}
//                         </span>
//                         <span className="relative">{interest}</span>
//                       </motion.span>
//                     );
//                   })}

//                 {(user.profile?.interests || []).length > 4 && (
//                   <motion.div
//                     className="relative group cursor-pointer"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 1 }}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
//                     <span className="relative px-4 py-2 rounded-2xl text-xs font-semibold bg-gradient-to-r from-white to-gray-50 backdrop-blur border-2 border-gradient-to-r text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1">
//                       <span className="text-base">🎨</span>+
//                       {user.profile.interests.length - 4} more
//                     </span>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Enhanced Action Buttons */}
//       <motion.div
//         className="absolute bottom-8 w-full flex justify-center gap-6"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8 }}
//       >
//         {/* Enhanced Dislike Button */}
//         <motion.button
//           className="relative w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center overflow-hidden group"
//           style={{
//             background: "linear-gradient(135deg, #ff6b6b, #ff4757, #ff3742)",
//             boxShadow:
//               "0 15px 35px rgba(255, 99, 99, 0.5), 0 5px 15px rgba(255, 99, 99, 0.3)",
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleSwipe(user.userId, "dislike");
//           }}
//           whileHover={{ scale: 1.15, y: -5 }}
//           whileTap={{ scale: 0.9 }}
//           transition={{ type: "spring", stiffness: 400, damping: 17 }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//           <motion.span
//             className="relative z-10"
//             animate={{ rotate: [0, -10, 10, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: 1,
//             }}
//           >
//             ❌
//           </motion.span>
//         </motion.button>

//         {/* Enhanced Super Like Button */}
//         <motion.button
//           className="relative w-14 h-14 rounded-full text-white text-xl flex items-center justify-center overflow-hidden group"
//           style={{
//             background: "linear-gradient(135deg, #4facfe, #00f2fe, #43e97b)",
//             boxShadow:
//               "0 12px 28px rgba(79, 172, 254, 0.5), 0 4px 12px rgba(79, 172, 254, 0.3)",
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             alert("Super Like");
//           }}
//           whileHover={{ scale: 1.15, y: -5 }}
//           whileTap={{ scale: 0.9 }}
//           transition={{ type: "spring", stiffness: 400, damping: 17 }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//           <motion.span
//             className="relative z-10"
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: 0.5,
//             }}
//           >
//             ⭐
//           </motion.span>
//         </motion.button>

//         {/* Enhanced Like Button */}
//         <motion.button
//           className="relative w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center overflow-hidden group"
//           style={{
//             background:
//               "linear-gradient(135deg, #ff9a9e, #fecfef, #fad0c4, #a8edea)",
//             boxShadow:
//               "0 15px 35px rgba(255, 154, 158, 0.5), 0 5px 15px rgba(255, 154, 158, 0.3)",
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleSwipe(user.userId, "like");
//           }}
//           whileHover={{ scale: 1.15, y: -5 }}
//           whileTap={{ scale: 0.9 }}
//           transition={{ type: "spring", stiffness: 400, damping: 17 }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//           <motion.span
//             className="relative z-10"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//           >
//             💖
//           </motion.span>
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// export default ProfileCart;



// src/components/ProfileCart.js
import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/basUrl";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfileCart() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${BaseUrl}api/profile/discover`, {
          withCredentials: true,
        });
        setUsers(res.data.data || []);
      } catch (err) {
        setError("No Nearby Users. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSwipe = async (userId, type) => {
    try {
      await axios.post(
        `${BaseUrl}api/swipe/${userId}`,
        { type },
        { withCredentials: true }
      );
      setCurrentIndex((prev) => prev + 1);
      setActiveImageIndex(0);
    } catch (err) {
      console.error(`Swipe ${type} failed:`, err);
    }
  };

  const handleDragEnd = (event, info, userId) => {
    if (info.offset.x > 100) {
      handleSwipe(userId, "like");
    } else if (info.offset.x < -100) {
      handleSwipe(userId, "dislike");
    }
  };

  const handleImageChange = (dir, length) => {
    setActiveImageIndex((prev) =>
      dir === "next" ? (prev + 1) % length : (prev - 1 + length) % length
    );
  };

  const user = users[currentIndex];
  const images = user?.profile?.profileImages || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-200 via-pink-200 to-yellow-200">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-16 h-16 border-4 border-transparent border-t-pink-500 border-r-purple-500 rounded-full"></div>
          <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-cyan-500 border-l-rose-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 w-8 h-8 border-4 border-transparent border-t-orange-500 border-l-yellow-500 rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-br from-red-200 via-purple-200 to-indigo-200">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 w-full max-w-sm shadow-2xl border-2 border-pink-300">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3">
            Error Loading Profiles
          </h2>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-pink-200 to-yellow-200 px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-sm w-full text-center shadow-xl">
          <div className="text-4xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            No More Profiles
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            You've viewed all profiles. Check back later!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-2 sm:px-4 py-8 bg-gradient-to-br from-rose-100 via-cyan-100 to-emerald-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={user.userId}
          className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white/90 rounded-3xl shadow-xl overflow-hidden cursor-pointer"
          initial={{ x: 300, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(e, info) => handleDragEnd(e, info, user.userId)}
          onClick={() => navigate(`/userdetails/${user.userId}`)}
        >
          {/* Image Section */}
          <div className="relative h-[22rem] sm:h-[26rem] bg-gray-100 overflow-hidden">
            {images.length > 0 ? (
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt="profile"
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0.8, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute inset-0 flex">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange("prev", images.length);
                  }}
                  className="w-1/2 cursor-pointer"
                />
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange("next", images.length);
                  }}
                  className="w-1/2 cursor-pointer"
                />
              </div>
            )}
            <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-black/50 via-black/30 to-transparent z-10" />
          </div>

          {/* Info Section */}
          <div className="p-4 sm:p-6 bg-white/95 z-20">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {user.name}
              </h2>
              <span className="text-sm sm:text-base bg-gray-100 rounded-full px-3 py-1">
                🎂 {user.profile?.age || "N/A"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              📍 {user.distance || "Nearby"}
            </p>
            {user.profile?.interests?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.profile.interests.slice(0, 4).map((int, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-pink-100 text-pink-800 px-3 py-1 rounded-full"
                  >
                    {int}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="absolute bottom-4 sm:bottom-8 w-full flex justify-center gap-4 sm:gap-6">
        <button
          className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl text-white bg-red-500 rounded-full shadow-md hover:scale-110 transition"
          onClick={() => handleSwipe(user.userId, "dislike")}
        >
          ❌
        </button>
        <button
          className="w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl text-white bg-blue-400 rounded-full shadow-md hover:scale-110 transition"
          onClick={() => alert("Super Like")}
        >
          ⭐
        </button>
        <button
          className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl text-white bg-pink-400 rounded-full shadow-md hover:scale-110 transition"
          onClick={() => handleSwipe(user.userId, "like")}
        >
          💖
        </button>
      </div>
    </div>
  );
}

export default ProfileCart;
