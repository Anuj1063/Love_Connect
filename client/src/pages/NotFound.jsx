




import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import notFound from "../assets/page-not-found.png"; // Ensure this SVG exists

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-lg w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.img
          src={notFound}
          alt="404"
          className="w-full max-w-xs mx-auto mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <motion.button
          onClick={() => navigate("/")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⬅️ Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
