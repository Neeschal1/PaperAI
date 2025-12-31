"use client";

import React, { useState, useEffect } from 'react';
import Header from '../constants/header';
import Hero from '../components/landing/hero';
import FeaturedItems from '../components/landing/featureditem';
import HappyCustomers from '../components/landing/happycustomers'
import PopularCategories from '../components/landing/categories';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white items-center">
      <Header scrolled={scrolled} />
      <Hero />
      <FeaturedItems />
      <HappyCustomers />
      <PopularCategories />
    </div>
  );
};

export default Landing;