
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = document.querySelector("html").getAttribute("data-theme");
    setIsDark(currentTheme === "dark");
  }, []);



  return (
    <div className="navbar bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white shadow-xl px-6 py-3">


     <div className="flex-1">
  <a
    className="text-3xl font-extrabold tracking-wide text-white hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
  >
    <svg
      className="w-6 h-6 text-red-600 hover:text-pink-400 animate-pulse transition-colors duration-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
      4.5 2.09C13.09 3.81 14.76 3 16.5 3 
      19.58 3 22 5.42 22 8.5c0 3.78-3.4 
      6.86-8.55 11.54L12 21.35z" />
    </svg>
    LoveConnect
  </a>
</div>



      {/* Right Side Buttons */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Login Button */}
        <Link to={'/login'}>
        <button className="btn btn-outline btn-sm md:btn-md text-current border-current hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full px-4 normal-case">
          Login
        </button>
        </Link>

        {/* Register / Join Today Button */}
        <Link  to={'/register'}>
        <button className="btn btn-sm md:btn-md bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary hover:text-white shadow-lg transition-all duration-300 rounded-full px-5 py-2 normal-case">
          Join Today
        </button>
        </Link>

   
      </div>
    </div>
  );
}

export default Navbar;