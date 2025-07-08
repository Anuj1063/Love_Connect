// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import notFound from '../assets/page-not-found.svg'

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleBackHome = () => {
//     navigate('/');
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center vh-100"
//       style={{
//         background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
//       }}
//     >
//       <motion.div
//         className="text-center p-4 bg-white rounded-4 shadow-lg"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//       >
//         <motion.img 
//           src={notFound} 
//           alt="404 Not Found" 
//           className="img-fluid mb-4"
//           style={{ maxWidth: '400px' }}
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         />
//         <h1 className="display-4 fw-bold text-primary">Page Not Found</h1>
//         <p className="lead text-muted mb-4">
//           Sorry, we couldn’t find the page you’re looking for.
//         </p>
//         <motion.button
//           className="btn btn-outline-primary btn-lg"
//           onClick={handleBackHome}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Back to Home
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default NotFound;




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
