// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import BaseUrl from "../utils/basUrl";

// function RateUsPopup({ onClose, onSuccess }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!comment || rating < 1 || rating > 5) {
//       toast.error("Please provide a comment and valid rating.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Send JSON body using withCredentials
//       await axios.post(
//         `${BaseUrl}api/comment`,
//         { comment, rating },
//         { withCredentials: true }
//       );

//       toast.success("Thank you for your feedback!");
//       onSuccess(); // Trigger logout after success
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to submit feedback.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//       <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4 text-gray-800">
//         <h2 className="text-xl font-semibold text-center">Rate Us</h2>
//         <textarea
//           className="w-full p-2 border rounded"
//           placeholder="Leave a comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <input
//           type="number"
//           className="w-full p-2 border rounded"
//           placeholder="Rating (1 to 5)"
//           value={rating}
//           min={1}
//           max={5}
//           onChange={(e) => setRating(Number(e.target.value))}
//         />
//         <div className="flex justify-end gap-2">
//           <button
//             className="px-4 py-2 bg-gray-300 rounded"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RateUsPopup;


////////////////////////////////



// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import BaseUrl from "../utils/basUrl";

// function RateUsPopup({ onClose, onSuccess }) {
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!comment || rating < 1 || rating > 5) {
//       toast.error("Please provide a comment and valid rating.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Send JSON body using withCredentials
//       await axios.post(
//         `${BaseUrl}api/comment`,
//         { comment, rating },
//         { withCredentials: true }
//       );

//       toast.success("Thank you for your feedback!");
//       onSuccess(); // Trigger logout after success
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to submit feedback.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStarClick = (starRating) => {
//     setRating(starRating);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="card bg-base-100 shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
//         <div className="card-body p-8">
//           {/* Header */}
//           <div className="text-center mb-6">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               Rate Your Experience
//             </h2>
//             <p className="text-base-content/60 mt-2">
//               We'd love to hear your feedback!
//             </p>
//           </div>

//           {/* Star Rating */}
//           <div className="form-control mb-6">
//             <label className="label">
//               <span className="label-text font-semibold">Your Rating</span>
//             </label>
//             <div className="flex justify-center gap-2 p-4 bg-base-200 rounded-2xl">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => handleStarClick(star)}
//                   className={`btn btn-ghost btn-sm p-1 transition-all duration-200 hover:scale-110 ${
//                     star <= rating
//                       ? "text-warning hover:text-warning"
//                       : "text-gray-300 hover:text-warning/50"
//                   }`}
//                   disabled={loading}
//                 >
//                   <svg
//                     className="w-8 h-8"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 </button>
//               ))}
//             </div>
//             <div className="text-center mt-2">
//               <span className="text-sm text-base-content/60">
//                 {rating === 1 && "Poor"}
//                 {rating === 2 && "Fair"}
//                 {rating === 3 && "Good"}
//                 {rating === 4 && "Very Good"}
//                 {rating === 5 && "Excellent"}
//                 {" - " + rating} star{rating !== 1 ? "s" : ""}
//               </span>
//             </div>
//           </div>

//           {/* Comment Section */}
//           <div className="form-control mb-6">
//             <label className="label">
//               <span className="label-text font-semibold">Your Comments</span>
//               <span className="label-text-alt text-base-content/40">
//                 Required
//               </span>
//             </label>
//             <textarea
//               className="textarea textarea-bordered textarea-lg resize-none focus:textarea-primary transition-all duration-200"
//               placeholder="Tell us about your experience..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={4}
//               disabled={loading}
//             />
//             <label className="label">
//               <span className="label-text-alt text-base-content/40">
//                 {comment.length}/500
//               </span>
//             </label>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 mt-4">
//             <button
//               className="btn btn-outline flex-1 hover:btn-error transition-all duration-200"
//               onClick={onClose}
//               disabled={loading}
//             >
//               <svg
//                 className="w-4 h-4 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary flex-1 transition-all duration-200 hover:scale-105"
//               onClick={handleSubmit}
//               disabled={loading || !comment.trim()}
//             >
//               {loading ? (
//                 <>
//                   <span className="loading loading-spinner loading-sm mr-2"></span>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-4 h-4 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                     />
//                   </svg>
//                   Submit Feedback
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RateUsPopup;











import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BaseUrl from "../utils/basUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function RateUsPopup({ onClose, onSuccess }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!comment || rating < 1 || rating > 5) {
      toast.error("Please provide a comment and valid rating.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${BaseUrl}api/comment`,
        { comment, rating },
        { withCredentials: true }
      );

      toast.success("Thank you for your feedback!");
      onSuccess(); // e.g., logout or redirect
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSkip = () => {
    //  toast("Skipped for now");
    
    //  onSuccess(); // logout logic

    Cookies.remove("authToken");
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logout successful");

  // Redirect to login
  navigate("/login");
  };

  const getRatingText = () => {
    const ratings = {
      1: { text: "Poor", emoji: "😞", color: "text-red-500" },
      2: { text: "Fair", emoji: "😐", color: "text-orange-500" },
      3: { text: "Good", emoji: "🙂", color: "text-blue-500" },
      4: { text: "Very Good", emoji: "😊", color: "text-green-500" },
      5: { text: "Excellent", emoji: "🤩", color: "text-green-600" }
    };
    return ratings[rating];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl">
        <div className="p-8">
          {/* Header with Icon */}
          <div className="text-center mb-6">
            <div className="avatar mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-primary-content"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rate Your Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Your feedback helps us improve our service
            </p>
          </div>

          {/* Interactive Rating Section */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold text-base mb-3">
              How was your experience?
            </label>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    disabled={loading}
                    className={`text-4xl transition-all duration-200 hover:scale-125 active:scale-110 ${
                      star <= rating 
                        ? "text-yellow-400 drop-shadow-lg hover:text-yellow-300" 
                        : "text-gray-300 dark:text-gray-500 hover:text-yellow-200"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <span className={`text-lg font-bold ${getRatingText().color}`}>
                  {getRatingText().emoji} {getRatingText().text}
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {rating} out of 5 stars
                </div>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
              <span>Tell us more (optional)</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 float-right">{comment.length}/500</span>
            </label>
            <textarea
              className="w-full h-24 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Share your thoughts, suggestions, or experiences..."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
              disabled={loading}
            />
          </div>

          {/* Skip Link */}
          {/* Skip Button */}
<button
  onClick={handleSkip}
  disabled={loading}
  className="w-full mb-5 py-2 text-sm font-medium text-gray-500 hover:text-primary transition duration-200"
>
  ⏭️ Skip for now
</button>

{/* Action Buttons */}
<div className="flex gap-3">
  <button
    className="flex-1 btn btn-outline hover:border-red-500 hover:text-red-500 transition duration-200"
    onClick={onClose}
    disabled={loading}
  >
    ❌ Cancel
  </button>
  <button
    className="flex-1 btn btn-primary hover:scale-105 transition-transform duration-200"
    onClick={handleSubmit}
    disabled={loading || !comment.trim()}
  >
    {loading ? (
      <>
        <span className="loading loading-spinner loading-sm mr-2"></span>
        Submitting...
      </>
    ) : (
      <>
        🚀 Submit
      </>
    )}
  </button>
</div>

          
          
        </div>
      </div>
    </div>
  );
}

export default RateUsPopup;