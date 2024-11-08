import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Logo from './Logo';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDashboardMenu = () => setIsDashboardMenuOpen(!isDashboardMenuOpen);

  const { logout, isLoggedIn } = useFirebase();

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLink className={({isActive}) => `${isActive ? "text-black" : "text-gray-500"} hover:text-black text-sm  `} to="/">Home</NavLink>
            <NavLink className={({isActive}) => `${isActive ? "text-black" : "text-gray-500"} hover:text-black text-sm  `} to="/all-blog">All Blog</NavLink>
            {isLoggedIn && <NavLink className={({isActive}) => `${isActive ? "text-black" : "text-gray-500"} hover:text-black text-sm me-5`} to="/add-blog">Add Blog</NavLink>}
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? ( 
              <>
              <NavLink className="hidden sm:flex rounded bg-black px-5 py-2.5 text-sm ms-5 font-medium text-white shadow" to="/login">Login</NavLink>
              <NavLink className="hidden sm:flex rounded bg-gray-200 px-5 py-2.5 text-sm font-medium text-black shadow" to="/register">Register</NavLink>
              </>
            ) : (
              <div className="relative mt-1">
                <button onClick={toggleDashboardMenu} className="rounded-full border border-gray-300">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    alt="User profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </button>
                {isDashboardMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">My Profile</NavLink>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button onClick={toggleMenu} className="block md:hidden p-2 text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 max-w-sm p-8 bg-white rounded-lg shadow-lg">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-4">
              <NavLink onClick={toggleMenu} className="text-gray-500 hover:text-black" to="/">Home</NavLink>
              <NavLink onClick={toggleMenu} className="text-gray-500 hover:text-black" to="/all-blog">All Blog</NavLink>
              {isLoggedIn && <NavLink onClick={toggleMenu} className="text-gray-500 hover:text-black" to="/add-blog">Add Blog</NavLink>}
              {!isLoggedIn && (
                <>
                  <NavLink onClick={toggleMenu} className="text-gray-500 hover:text-black" to="/login">Login</NavLink>
                  <NavLink onClick={toggleMenu} className="text-gray-500 hover:text-black" to="/register">Register</NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
