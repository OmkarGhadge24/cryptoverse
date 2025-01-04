import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = ({ onSearch, searchQuery }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar bg-zinc-800 shadow-md font-[poppins] text-white">
      <div className="flex justify-between items-center px-4 py-4 lg:px-10">
        {/* Logo */}
        <div className="logo flex items-center text-3xl gap-1">
          <h1 className="font-semibold">CryptoVerse</h1>
          <FaEthereum className="text-orange-400 text-2xl" />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-20 text-lg">
          <Link
            to="/"
            className="hover:text-orange-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/coins"
            className="hover:text-orange-400 transition-colors duration-300"
          >
            Coins
          </Link>
          {location.pathname === '/coins' && (
            <input
              type="text"
              value={searchQuery}
              onChange={onSearch}
              placeholder="Search for a Coin"
              className="px-4 py-2 rounded-md text-black"
            />
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-700 text-white p-4">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="block py-2 hover:text-orange-400"
          >
            Home
          </Link>
          <Link
            to="/coins"
            onClick={toggleMobileMenu}
            className="block py-2 hover:text-orange-400"
          >
            Coins
          </Link>
          {location.pathname === '/coins' && (
            <input
              type="text"
              value={searchQuery}
              onChange={onSearch}
              placeholder="Search for a Coin"
              className="w-full px-4 py-2 mt-2 rounded-md text-black"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
