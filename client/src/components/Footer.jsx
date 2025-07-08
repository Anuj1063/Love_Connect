import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 text-gray-700 text-sm py-4 border-t border-pink-200">
  <div className="max-w-6xl mx-auto px-4 flex justify-center items-center text-center">
    <p>&copy; {new Date().getFullYear()} ❤️ LoveConnect. All rights reserved.</p>
  </div>
</footer>

  );
}

export default Footer;
