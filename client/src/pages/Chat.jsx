// import React, { useEffect, useState, useRef } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import BaseUrl from "../utils/basUrl";
// import {
//   User,
//   Send,
//   Image,
//   X,
//   Smile,
//   MoreVertical,
//   UserX,
//   Flag,
//   Shield
// } from "lucide-react";

// function Chat() {
//   const { targetUserId } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showOptionsMenu, setShowOptionsMenu] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [reportReason, setReportReason] = useState("");

//   const socketRef = useRef(null);
//   const chatEndRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const emojiPickerRef = useRef(null);
//   const optionsMenuRef = useRef(null);

//   const [matches, setMatches] = useState([]);
//   const [filteredMatches, setFilteredMatches] = useState([]);

//   const reduxUser = useSelector((store) => store.user);
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const loggedInUserId = reduxUser?._id || storedUser?._id;

//   const currentChatUser = matches.find(user => user.userId === targetUserId);

//   // Common emojis for quick access
//   const commonEmojis = [
//     '😀', '😂', '🥰', '😍', '😘', '😊', '😎', '🤔',
//     '😢', '😭', '😡', '🥺', '😴', '🤤', '🙄', '😜',
//     '❤️', '💕', '💖', '💗', '💓', '💝', '🌹', '🔥',
//     '👍', '👎', '👌', '✌️', '🤞', '🙏', '💪', '👏',
//     '🎉', '🎊', '🎈', '🎂', '🍕', '☕', '🍺', '🌟'
//   ];

//   const reportReasons = [
//     "Something they messaged me on the app",
//     "Inappropriate profile content",
//     "Harassment or abusive behavior",
//     "Spam or fake profile"
//   ];

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
//         setShowEmojiPicker(false);
//       }
//       if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
//         setShowOptionsMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (!loggedInUserId) return;

//     const socket = createSocketConnection(loggedInUserId);
//     socketRef.current = socket;

//     socket.emit("joinChat", { userId: loggedInUserId, targetUserId });

//     return () => {
//       socket.disconnect();
//     };
//   }, [loggedInUserId, targetUserId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!targetUserId || !loggedInUserId) return;

//       try {
//         const res = await axios.get(`${BaseUrl}api/message/${targetUserId}`, {
//           withCredentials: true,
//         });
//         setMessages(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("❌ Error fetching messages:", err?.response?.data || err);
//         setMessages([]);
//       }
//     };

//     fetchMessages();
//   }, [targetUserId, loggedInUserId]);

//   useEffect(() => {
//     if (!socketRef.current) return;
//     const socket = socketRef.current;

//     const handleReceive = (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receive_message", handleReceive);

//     return () => {
//       socket.off("receive_message", handleReceive);
//     };
//   }, [loggedInUserId, targetUserId]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const clearImageSelection = () => {
//     setSelectedImage(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleEmojiSelect = (emoji) => {
//     setInputText(prev => prev + emoji);
//     setShowEmojiPicker(false);
//   };

//   const sendMessage = async () => {
//     const trimmedText = inputText.trim();
//     if (!trimmedText && !selectedImage) return;
//     if (!loggedInUserId) return;

//     try {
//       const formData = new FormData();

//       if (trimmedText) {
//         formData.append('text', trimmedText);
//       }

//       if (selectedImage) {
//         formData.append('image', selectedImage);
//       }

//       console.log('📤 Sending message:', {
//         hasText: !!trimmedText,
//         hasImage: !!selectedImage,
//         textLength: trimmedText.length
//       });

//       const res = await axios.post(
//         `${BaseUrl}api/message/send/${targetUserId}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         }
//       );

//       const newMessage = res.data;
//       console.log('✅ Message sent successfully:', newMessage);

//       setMessages((prev) => [...prev, newMessage]);

//       socketRef.current.emit("send_message", {
//         from: loggedInUserId,
//         to: targetUserId,
//         text: newMessage.text,
//         image: newMessage.image,
//       });

//       setInputText("");
//       clearImageSelection();
//     } catch (err) {
//       console.error("❌ Error sending message:", err);
//       console.error("❌ Error response:", err.response?.data);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleBlockUser = async () => {
//     try {
//       const res = await axios.post(
//         `${BaseUrl}api/profile/block/${targetUserId}`,
//         {},
//         { withCredentials: true }
//       );

//       console.log('✅ User blocked successfully:', res.data);
//       alert('User has been blocked successfully');
//       setShowOptionsMenu(false);
//       navigate('/messages'); // Redirect to matches page
//     } catch (err) {
//       console.error("❌ Error blocking user:", err?.response?.data || err);
//       alert('Failed to block user. Please try again.');
//     }
//   };

//   const handleUnblockUser = async () => {
//     try {
//       const res = await axios.post(
//         `${BaseUrl}api/profile/unblock/${targetUserId}`,
//         {},
//         { withCredentials: true }
//       );

//       console.log('✅ User unblocked successfully:', res.data);
//       alert('User has been unblocked successfully');
//       setShowOptionsMenu(false);
//     } catch (err) {
//       console.error("❌ Error unblocking user:", err?.response?.data || err);
//       alert('Failed to unblock user. Please try again.');
//     }
//   };

//   const handleReportUser = async () => {
//     if (!reportReason) {
//       alert('Please select a reason for reporting');
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${BaseUrl}auth/report/${targetUserId}`,
//         { reason: reportReason },
//         { withCredentials: true }
//       );

//       console.log('✅ User reported successfully:', res.data);
//       alert('User has been reported successfully. Thank you for helping keep our community safe.');
//       setShowReportModal(false);
//       setShowOptionsMenu(false);
//       setReportReason("");
//     } catch (err) {
//       console.error("❌ Error reporting user:", err?.response?.data || err);
//       alert('Failed to report user. Please try again.');
//     }
//   };

//   const getToken = () => {
//     let token = localStorage.getItem("token");
//     if (!token) {
//       const cookies = document.cookie.split(";");
//       const tokenCookie = cookies.find((cookie) =>
//         cookie.trim().startsWith("auth_token")
//       );
//       if (tokenCookie) {
//         token = decodeURIComponent(tokenCookie.split("=")[1]);
//       }
//     }
//     return token;
//   };

//   const fetchMatches = async () => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const response = await fetch(`${BaseUrl}api/match/matches`, {
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//       });

//       const data = await response.json();
//       const fetchedMatches = data.matches || data.data || [];
//       setMatches(fetchedMatches);
//       setFilteredMatches(fetchedMatches);
//     } catch (err) {
//       console.error("❌ Error fetching matches:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   return (
//     <div className="h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-50">
//       <div className="flex h-full">
//         {/* Sidebar */}
//         <div className="w-1/4 bg-white shadow-xl border-r border-gray-200">
//           <div className="p-4 text-lg font-bold text-pink-600 border-b bg-gradient-to-r from-pink-50 to-purple-50">
//             💬 Chats
//           </div>
//           <div className="overflow-y-auto h-full">
//             {matches.length > 0 ? (
//               matches.map((match) => (
//                 <Link key={match.userId} to={`/chat/${match.userId}`} className="block">
//                   <div className={`px-4 py-3 hover:bg-pink-50 cursor-pointer border-b flex items-center space-x-3 transition-all duration-200 ${
//                     match.userId === targetUserId ? "bg-pink-100 border-l-4 border-l-pink-500" : ""
//                   }`}>
//                     <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-pink-200">
//                       {match.profileImages?.length > 0 ? (
//                         <img src={match.profileImages[0]} alt={match.name} className="object-cover w-full h-full" />
//                       ) : (
//                         <div className="h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
//                           <User className="w-6 h-6 text-pink-500" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="font-semibold text-gray-900 truncate">{match.name}</div>
//                       <div className="text-xs text-gray-500 truncate">
//                         {match.interests?.length > 0 ? `Interests: ${match.interests.join(", ")}` : "No recent messages"}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <div className="px-4 py-8 text-center text-gray-500">
//                 <div className="text-6xl mb-2">💕</div>
//                 <div className="text-sm font-medium">No matches yet</div>
//                 <div className="text-xs mt-1">Keep swiping to find your perfect match!</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="w-3/4 flex flex-col">
//           <div className="px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 {currentChatUser?.profileImages?.length > 0 ? (
//                   <img
//                     src={currentChatUser.profileImages[0]}
//                     alt={currentChatUser.name}
//                     className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-300"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-full ring-2 ring-pink-300">
//                     <User className="w-6 h-6 text-pink-500" />
//                   </div>
//                 )}
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-gray-700">
//                   {currentChatUser?.name || `User ${targetUserId}`}
//                 </h2>
//                 <p className="text-xs text-green-600 font-medium">🟢 Online</p>
//               </div>
//             </div>

//             {/* Options Menu */}
//             <div className="relative" ref={optionsMenuRef}>
//               <button
//                 onClick={() => setShowOptionsMenu(!showOptionsMenu)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <MoreVertical className="w-5 h-5 text-gray-600" />
//               </button>

//               {showOptionsMenu && (
//                 <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-50">
//                   <button
//                     onClick={handleBlockUser}
//                     className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
//                   >
//                     <UserX className="w-4 h-4" />
//                     Block User
//                   </button>
//                   <button
//                     onClick={handleUnblockUser}
//                     className="w-full px-4 py-2 text-left hover:bg-green-50 flex items-center gap-2 text-green-600"
//                   >
//                     <Shield className="w-4 h-4" />
//                     Unblock User
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowReportModal(true);
//                       setShowOptionsMenu(false);
//                     }}
//                     className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2 text-orange-600"
//                   >
//                     <Flag className="w-4 h-4" />
//                     Report User
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-white via-purple-50 to-pink-50">
//             {Array.isArray(messages) &&
//               messages.map((msg, index) => (
//                 <div key={index} className={`flex ${msg.senderId === loggedInUserId ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-xs p-3 rounded-2xl shadow-md text-sm ${
//                     msg.senderId === loggedInUserId
//                       ? "bg-gradient-to-r from-blue-700 to-pink-500 text-white"
//                       : "bg-white text-gray-800 border border-gray-200"
//                   }`}>
//                     {msg.image && (
//                       <div className="mb-2">
//                         <img
//                           src={`${BaseUrl}${msg.image}`}
//                           alt="Shared image"
//                           className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
//                           onClick={() => window.open(`${BaseUrl}${msg.image}`, '_blank')}
//                           onError={(e) => {
//                             console.error('❌ Image failed to load:', `${BaseUrl}${msg.image}`);
//                             e.target.style.display = 'none';
//                           }}
//                           onLoad={() => {
//                             console.log('✅ Image loaded successfully:', `${BaseUrl}${msg.image}`);
//                           }}
//                         />
//                       </div>
//                     )}
//                     {msg.text && <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>}
//                   </div>
//                 </div>
//               ))}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Image Preview */}
//           {imagePreview && (
//             <div className="px-4 py-2 border-t bg-gray-50">
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <button
//                     onClick={clearImageSelection}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </div>
//                 <span className="text-sm text-gray-600">Image ready to send</span>
//               </div>
//             </div>
//           )}

//           {/* Emoji Picker */}
//           {showEmojiPicker && (
//             <div ref={emojiPickerRef} className="border-t bg-white p-4">
//               <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto">
//                 {commonEmojis.map((emoji, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleEmojiSelect(emoji)}
//                     className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="p-4 border-t bg-white flex gap-3 items-end">
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageSelect}
//               accept="image/*"
//               className="hidden"
//             />

//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-200 flex-shrink-0"
//               title="Send Image"
//             >
//               <Image className="w-5 h-5 text-gray-600" />
//             </button>

//             <button
//               onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-200 flex-shrink-0"
//               title="Add Emoji"
//             >
//               <Smile className="w-5 h-5 text-gray-600" />
//             </button>

//             <div className="flex-1 flex flex-col">
//               <textarea
//                 placeholder="Type your message..."
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 rows={1}
//                 className="w-full p-3 border-2 border-gray-200 rounded-2xl outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-200 resize-none"
//                 style={{ minHeight: '48px', maxHeight: '120px' }}
//               />
//             </div>

//             <button
//               onClick={sendMessage}
//               disabled={!inputText.trim() && !selectedImage}
//               className="bg-gradient-to-r from-blue-500 to-orange-400 text-white p-3 rounded-full hover:from-pink-400 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Report Modal */}
//       {showReportModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg mx-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">Report User</h3>
//               <button
//                 onClick={() => {
//                   setShowReportModal(false);
//                   setReportReason("");
//                 }}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <p className="text-sm text-gray-600 mb-4">
//               Please select a reason for reporting this user:
//             </p>

//             <div className="space-y-2 mb-6">
//               {reportReasons.map((reason, index) => (
//                 <label key={index} className="flex items-center cursor-pointer">
//                   <input
//                     type="radio"
//                     name="reportReason"
//                     value={reason}
//                     checked={reportReason === reason}
//                     onChange={(e) => setReportReason(e.target.value)}
//                     className="mr-3 text-pink-500"
//                   />
//                   <span className="text-sm text-gray-700">{reason}</span>
//                 </label>
//               ))}
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowReportModal(false);
//                   setReportReason("");
//                 }}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReportUser}
//                 className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                 disabled={!reportReason}
//               >
//                 Report
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;

/////this is working fine




import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BaseUrl from "../utils/basUrl";
import {
  User,
  Send,
  Image,
  X,
  Smile,
  MoreVertical,
  UserX,
  Flag,
  Shield,
  Sparkles,
} from "lucide-react";

function Chat() {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const socketRef = useRef(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const optionsMenuRef = useRef(null);

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  const reduxUser = useSelector((store) => store.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = reduxUser?._id || storedUser?._id;

  const currentChatUser = matches.find((user) => user.userId === targetUserId);

  // Common emojis for quick access
  const commonEmojis = [
    "😀",
    "😂",
    "🥰",
    "😍",
    "😘",
    "😊",
    "😎",
    "🤔",
    "😢",
    "😭",
    "😡",
    "🥺",
    "😴",
    "🤤",
    "🙄",
    "😜",
    "❤️",
    "💕",
    "💖",
    "💗",
    "💓",
    "💝",
    "🌹",
    "🔥",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🙏",
    "💪",
    "👏",
    "🎉",
    "🎊",
    "🎈",
    "🎂",
    "🍕",
    "☕",
    "🍺",
    "🌟",
  ];

  const reportReasons = [
    "Something they messaged me on the app",
    "Inappropriate profile content",
    "Harassment or abusive behavior",
    "Spam or fake profile",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target)
      ) {
        setShowOptionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loggedInUserId) return;

    const socket = createSocketConnection(loggedInUserId);
    socketRef.current = socket;

    socket.emit("joinChat", { userId: loggedInUserId, targetUserId });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, targetUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!targetUserId || !loggedInUserId) return;

      try {
        const res = await axios.get(`${BaseUrl}api/message/${targetUserId}`, {
          withCredentials: true,
        });
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(
          "❌ Error fetching messages:",
          err?.response?.data || err
        );
        setMessages([]);
      }
    };

    fetchMessages();
  }, [targetUserId, loggedInUserId]);

  useEffect(() => {
    if (!socketRef.current) return;
    const socket = socketRef.current;

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [loggedInUserId, targetUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //forsending jokes
  //   const handleSendJoke = async () => {
  //   try {
  //     const res = await fetch(`${BaseUrl}api/message/jokes`);
  //     const data = await res.json();

  //     if (data.success && data.joke) {
  //       // Reuse your existing sendMessage logic with joke as the text
  //       const jokeMessage = {
  //         text: data.joke,
  //         receiverId: targetUserId,
  //       };

  //       await sendMessage(jokeMessage.text);
  //     } else {
  //       console.warn("No joke found or API failed");
  //     }
  //   } catch (error) {
  //     console.error("Error sending joke:", error);
  //   }
  // };
  const handleSendJoke = async () => {
    try {
      const res = await fetch(`${BaseUrl}api/message/jokes`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && data.joke) {
        await sendMessage(`${data.joke} 🤣`);
      } else {
        console.warn("No joke found");
      }
    } catch (err) {
      console.error("❌ Failed to send joke:", err);
    }
  };

  const clearImageSelection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  
  const sendMessage = async (customText = null) => {
  const trimmedText = (typeof customText === "string" ? customText : inputText).trim();
  if (!trimmedText && !selectedImage) return;
  if (!loggedInUserId) return;

  try {
    const formData = new FormData();

    if (trimmedText) {
      formData.append("text", trimmedText);
    }

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    console.log("📤 Sending message:", {
      hasText: !!trimmedText,
      hasImage: !!selectedImage,
      textLength: trimmedText.length,
    });

    const res = await axios.post(
      `${BaseUrl}api/message/send/${targetUserId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const newMessage = res.data;
    console.log("✅ Message sent successfully:", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    socketRef.current.emit("send_message", {
      from: loggedInUserId,
      to: targetUserId,
      text: newMessage.text,
      image: newMessage.image,
    });

    setInputText("");
    clearImageSelection();
  } catch (err) {
    console.error("❌ Error sending message:", err);
    console.error("❌ Error response:", err.response?.data);
  }
};



  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
     await sendMessage();
    }
  };

  const handleBlockUser = async () => {
    try {
      const res = await axios.post(
        `${BaseUrl}api/profile/block/${targetUserId}`,
        {},
        { withCredentials: true }
      );

      console.log("✅ User blocked successfully:", res.data);
      alert("User has been blocked successfully");
      setShowOptionsMenu(false);
      navigate("/messages"); // Redirect to matches page
    } catch (err) {
      console.error("❌ Error blocking user:", err?.response?.data || err);
      alert("Failed to block user. Please try again.");
    }
  };

  const handleUnblockUser = async () => {
    try {
      const res = await axios.post(
        `${BaseUrl}api/profile/unblock/${targetUserId}`,
        {},
        { withCredentials: true }
      );

      console.log("✅ User unblocked successfully:", res.data);
      alert("User has been unblocked successfully");
      setShowOptionsMenu(false);
    } catch (err) {
      console.error("❌ Error unblocking user:", err?.response?.data || err);
      alert("Failed to unblock user. Please try again.");
    }
  };

  const handleReportUser = async () => {
    if (!reportReason) {
      alert("Please select a reason for reporting");
      return;
    }

    try {
      const res = await axios.post(
        `${BaseUrl}auth/report/${targetUserId}`,
        { reason: reportReason },
        { withCredentials: true }
      );

      console.log("✅ User reported successfully:", res.data);
      alert(
        "User has been reported successfully. Thank you for helping keep our community safe."
      );
      setShowReportModal(false);
      setShowOptionsMenu(false);
      setReportReason("");
    } catch (err) {
      console.error("❌ Error reporting user:", err?.response?.data || err);
      alert("Failed to report user. Please try again.");
    }
  };

  const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("auth_token")
      );
      if (tokenCookie) {
        token = decodeURIComponent(tokenCookie.split("=")[1]);
      }
    }
    return token;
  };

  const fetchMatches = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${BaseUrl}api/match/matches`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      const data = await response.json();
      const fetchedMatches = data.matches || data.data || [];
      setMatches(fetchedMatches);
      setFilteredMatches(fetchedMatches);
    } catch (err) {
      console.error("❌ Error fetching matches:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-50">
      <div className="flex h-full">
        {/* Sidebar */}

        <div className="w-1/4 bg-white shadow-xl border-r border-gray-200 flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 text-lg font-bold text-pink-600 border-b bg-gradient-to-r from-pink-50 to-purple-50">
            <Link
              to="/messages"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <span>💬 Chats</span>
          </div>
          <div className="overflow-y-auto flex-1">
            {matches.length > 0 ? (
              matches.map((match) => (
                <Link
                  key={match.userId}
                  to={`/chat/${match.userId}`}
                  className="block"
                >
                  <div
                    className={`px-4 py-3 hover:bg-pink-50 cursor-pointer border-b flex items-center space-x-3 transition-all duration-200 ${
                      match.userId === targetUserId
                        ? "bg-pink-100 border-l-4 border-l-pink-500"
                        : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-pink-200">
                      {match.profileImages?.length > 0 ? (
                        <img
                          src={match.profileImages[0]}
                          alt={match.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
                          <User className="w-6 h-6 text-pink-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {match.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {match.interests?.length > 0
                          ? `Interests: ${match.interests.join(", ")}`
                          : "No recent messages"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-6xl mb-2">💕</div>
                <div className="text-sm font-medium">No matches yet</div>
                <div className="text-xs mt-1">
                  Keep swiping to find your perfect match!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col relative">
          <div className="px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {currentChatUser?.profileImages?.length > 0 ? (
                  <img
                    src={currentChatUser.profileImages[0]}
                    alt={currentChatUser.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-300"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 rounded-full ring-2 ring-pink-300">
                    <User className="w-6 h-6 text-pink-500" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  {currentChatUser?.name || `User ${targetUserId}`}
                </h2>
                <p className="text-xs text-green-600 font-medium">🟢 Online</p>
              </div>
            </div>

            {/* Options Menu */}
            <div className="relative" ref={optionsMenuRef}>
              <button
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {showOptionsMenu && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-50">
                  <button
                    onClick={handleBlockUser}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
                  >
                    <UserX className="w-4 h-4" />
                    Block User
                  </button>
                  <button
                    onClick={handleUnblockUser}
                    className="w-full px-4 py-2 text-left hover:bg-green-50 flex items-center gap-2 text-green-600"
                  >
                    <Shield className="w-4 h-4" />
                    Unblock User
                  </button>
                  <button
                    onClick={() => {
                      setShowReportModal(true);
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2 text-orange-600"
                  >
                    <Flag className="w-4 h-4" />
                    Report User
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none px-6 py-4 space-y-4 bg-gradient-to-b from-white via-purple-50 to-pink-50">
            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === loggedInUserId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl shadow-md text-sm ${
                      msg.senderId === loggedInUserId
                        ? "bg-gradient-to-r from-blue-600 to-pink-500 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {msg.image && (
                      <div className="mb-2">
                        <img
                          src={`${BaseUrl}${msg.image}`}
                          alt="Shared image"
                          className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() =>
                            window.open(`${BaseUrl}${msg.image}`, "_blank")
                          }
                          onError={(e) => {
                            console.error(
                              "❌ Image failed to load:",
                              `${BaseUrl}${msg.image}`
                            );
                            e.target.style.display = "none";
                          }}
                          onLoad={() => {
                            console.log(
                              "✅ Image loaded successfully:",
                              `${BaseUrl}${msg.image}`
                            );
                          }}
                        />
                      </div>
                    )}
                    {msg.text && <div className="break-words">{msg.text}</div>}
                  </div>
                </div>
              ))}
            <div ref={chatEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="px-4 py-2 border-t bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    onClick={clearImageSelection}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Image ready to send
                </span>
              </div>
            </div>
          )}

          

          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-20 right-4 bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 w-80 z-50"
            >
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-3 mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  😊 Choose an emoji
                </h4>
                <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-gray-100">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                     
                      className="text-5xl p-2 hover:bg-pink-100 hover:scale-110 rounded-xl transition-all duration-200"
                     style={{ fontSize: '2rem' }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowEmojiPicker(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="p-4 border-t bg-white flex gap-3 items-end">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-200 flex-shrink-0"
              title="Send Image"
            >
              <Image className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-200 flex-shrink-0"
              title="Add Emoji"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex-1 flex flex-col">
              <textarea
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
                className="w-full p-3 border-2 border-gray-200 rounded-2xl outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-200 resize-none"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!inputText.trim() && !selectedImage}
              className="bg-gradient-to-r from-blue-500 to-orange-400 text-white p-3 rounded-full hover:from-pink-400 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>

            <button
              onClick={handleSendJoke}
              className="bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full transition-all duration-200 flex-shrink-0"
              title="Send a Random Joke"
            >
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal - Light Pink Theme */}
      {showReportModal && (
        <div className="fixed inset-0 bg-pink-100 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 w-96 max-w-lg mx-4 shadow-2xl border border-pink-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-200 to-rose-200 p-2 rounded-full">
                  <Flag className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Report User</h3>
              </div>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
                }}
                className="text-gray-400 hover:text-gray-600 hover:bg-pink-100 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700 font-medium">
                🛡️ Help us keep our community safe by reporting inappropriate
                behavior:
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {reportReasons.map((reason, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        reportReason === reason
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300 group-hover:border-pink-300"
                      }`}
                    >
                      {reportReason === reason && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span className="ml-4 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {reason}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReportUser}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!reportReason}
              >
                🚩 Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
