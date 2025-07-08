

import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/basUrl";
import { Star } from "lucide-react";

function Reviews() {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const res = await axios.get(`${BaseUrl}api/allcoments`, {
          withCredentials: true,
        });

        const topSix = res.data?.comments?.slice(0, 6) || [];
        setComments(topSix);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchAllComments();
  }, []);

  const current = comments[currentIndex];

  const getImageUrl = (userProfileDetails) => {
    if (!userProfileDetails?.profileImages?.[0]) {
      return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    }
    return `${BaseUrl}uploads/profile/${userProfileDetails.profileImages[0]}`;
  };


  return (
    // <div className="py-10 px-4 bg-gradient-to-b from-pink-100 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    //   <h2 className="text-3xl font-bold text-center mb-8 text-pink-600 dark:text-pink-400">
    //     ❤️ What Our Users Say
    //   </h2>

    //   <div className="max-w-xl mx-auto">
    //     {current && (
    //       <div className="card shadow-xl bg-white dark:bg-gray-800 p-6">
    //         <div className="flex flex-col items-center gap-4">
    //           {/* Profile Image with fallback */}
    //           <img
    //             src={getImageUrl(current.userProfileDetails)}
    //             alt="Profile"
    //             className="w-24 h-24 rounded-full object-cover border-4 border-pink-300"
    //           />

    //           {/* Name */}
    //           <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
    //             {current.userDetails?.name || "Anonymous"}
    //           </h3>

    //           {/* Rating */}
    //           <div className="flex gap-1">
    //             {[...Array(5)].map((_, idx) => (
    //               <Star
    //                 key={idx}
    //                 size={20}
    //                 className={`${
    //                   idx < current.rating
    //                     ? "text-yellow-500"
    //                     : "text-gray-300 dark:text-gray-600"
    //                 }`}
    //                 fill={idx < current.rating ? "currentColor" : "none"}
    //               />
    //             ))}
    //           </div>

    //           {/* Comment */}
    //           <p className="text-center text-gray-600 dark:text-gray-300 italic max-w-sm">
    //             “{current.comment}”
    //           </p>
    //         </div>
    //       </div>
    //     )}

    //     {/* Dots Navigation */}
    //     <div className="flex justify-center mt-5 gap-2">
    //       {comments.map((_, idx) => (
    //         <button
    //           key={idx}
    //           onClick={() => setCurrentIndex(idx)}
    //           className={`w-3 h-3 rounded-full transition-all ${
    //             currentIndex === idx
    //               ? "bg-pink-500 w-6"
    //               : "bg-gray-300 dark:bg-gray-600"
    //           }`}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="py-14 px-6 bg-gradient-to-b from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
    <h2 className="text-4xl font-extrabold text-center mb-12 text-pink-600 dark:text-pink-400 tracking-tight">
      💕 What Our Users Say
    </h2>

    <div className="max-w-2xl mx-auto relative group">
      {current && (
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 overflow-hidden transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl">
          {/* Glowing blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-ping" />

          <div className="relative z-10 flex flex-col items-center gap-5">
            {/* Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg hover:scale-105 transition-transform duration-300">
              <img
                src={getImageUrl(current.userProfileDetails)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
              {current.userDetails?.name || "Anonymous"}
            </h3>

            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  size={22}
                  className={`transition-colors ${
                    idx < current.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill={idx < current.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-center text-gray-600 dark:text-gray-300 italic text-base leading-relaxed max-w-md">
              “{current.comment}”
            </p>
          </div>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 gap-3">
        {comments.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "bg-pink-500 w-5 shadow-md"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default Reviews;
