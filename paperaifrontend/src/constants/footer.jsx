"use client";

import React from 'react';
import locationimage from '../assets/image.png'
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const categories = [
    { name: 'Graphics', count: 25 },
    { name: 'Backgrounds', count: 12 },
    { name: 'Fonts', count: 8 },
    { name: 'Music', count: 3 },
    { name: 'Photography', count: 3 },
    { name: 'Themes', count: 3 },
  ];

  return (
    <footer className="bg-white py-16 px-6 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">
              <span className="text-neutral-900">Paper</span>
              <span className="text-teal-400">Ai</span>
            </h3>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
              Lorem Ipsum proin gravida nibh vel velit aucsollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-teal-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Brand</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Ecosystem</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a href="#" className="hover:text-teal-500 transition-colors">
                    {cat.name} ({cat.count})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><a href="#" className="hover:text-teal-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Affiliate</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Where We Are Column */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Where We Are</h4>
            <div className="w-full h-32 bg-neutral-200 rounded-lg relative overflow-hidden">
              <img 
                src={locationimage}
                alt="Map Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-200 text-center">
          <p className="text-neutral-500 text-sm">
            © 2025 PaperAi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;