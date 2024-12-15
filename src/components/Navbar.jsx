import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-10 px-8 flex justify-between items-center">
      <h2 className="text-lg font-bold">Blog Website</h2>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-8 text-yellow-200" : "mr-8 hover:text-gray-400"
          }
        >
          All Blogs
        </NavLink>
        <NavLink
          to="/new-post"
          className={({ isActive }) =>
            isActive ? "text-yellow-200 bg-blue-500 rounded-full py-2 px-4" : " hover:bg-blue-500 hover:border-none rounded-full border-2 border-white py-2 px-4"
          }
        >
          Add New Blog
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
