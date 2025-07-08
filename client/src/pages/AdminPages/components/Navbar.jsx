import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-br  to-pink-700 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Side: Logo and Dashboard */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <div className="text-xl font-bold">Admin Panel</div>
          {/* Dashboard */}
          <div className="ml-4 text-lg font-semibold">Dashboard</div>
        </div>

        {/* Right Side: User Profile */}
        <div className="flex items-center space-x-2">
          {/* Profile Picture */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
          {/* Username and Role */}
          <div>
            <p className="text-sm font-medium">Liam Bennett</p>
            <p className="text-xs text-gray-300">System Administrator</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;