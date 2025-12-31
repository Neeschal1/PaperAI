"use client";

import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';

const Header = ({ scrolled }) => {
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-neutral-800'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className={`text-2xl font-bold ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
          <div className='flex flex-row'>
            <h2 className='text-2xl font-bold text-white'>Paper</h2>
            <h2 className='text-2xl font-bold text-teal-400'>Ai</h2>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          {['HOME', 'ABOUT US', 'PAGES', 'BLOG', 'SHOP', 'CONTACT US'].map((item, idx) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium tracking-wide transition-colors ${
                idx === 0 
                  ? 'text-blue-400' 
                  : scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white hover:text-blue-400'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button className={`${scrolled ? 'text-neutral-700' : 'text-white'} hover:opacity-80 transition-opacity`}>
            <Search size={20} />
          </button>
          <button className={`relative ${scrolled ? 'text-neutral-700' : 'text-white'} hover:opacity-80 transition-opacity`}>
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-teal-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>
          <button className="bg-teal-500 text-white px-6 py-2.5 rounded hover:bg-teal-600 transition-colors text-sm font-semibold tracking-wide">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;