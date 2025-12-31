"use client";

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-24 w-full bg-neutral-700 text-white overflow-hidden" style={{ minHeight: '580px' }}>
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[450px] lg:text-[600px] font-bold leading-none text-white opacity-[0.15] select-none whitespace-nowrap">
          AI&LIB
        </span>
      </div>
      
      {/* Hero content */}
      <div className="relative max-w-6xl mx-auto px-6 w-full text-center pt-16">
        <h1 className="text-5xl md:text-6xl lg:text-[64px] font-light mb-12 leading-tight tracking-wide">
          Explore the World's Largest<br />AI E-Library
        </h1>
        
        {/* Search bar */}
        <div className="flex max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl mb-8">
          <div className="flex items-center px-6 border-r border-neutral-200 bg-white">
            <select className="text-neutral-700 bg-transparent outline-none cursor-pointer appearance-none text-base font-medium pr-1">
              <option>All Categories</option>
              <option>AI Research</option>
              <option>Machine Learning</option>
              <option>Neural Networks</option>
              <option>Data Science</option>
              <option>Computer Vision</option>
            </select>
            <ChevronDown size={18} className="text-neutral-500 ml-1" />
          </div>
          <input 
            type="text" 
            placeholder="Search for books, papers, courses..."
            className="flex-1 px-6 py-5 text-neutral-700 outline-none bg-white placeholder:text-neutral-400 text-base"
          />
          <button className="bg-yellow-300 px-14 hover:bg-yellow-400 transition-colors flex items-center justify-center">
            <Search size={24} className="text-white" />
          </button>
        </div>

        {/* Trending searches */}
        <p className="text-base text-white">
          Trending Searches: Deep Learning,{" "}
          <span className="underline cursor-pointer hover:text-blue-300 transition-colors font-medium">
             GPT Models
          </span>
          ,  Transformers, Neural Networks
        </p>
      </div>
    </section>
  );
};

export default Hero;