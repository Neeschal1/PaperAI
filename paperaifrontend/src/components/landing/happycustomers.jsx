"use client";

import { useState, useEffect } from 'react';
import testimonials from '../../data/testimonials';

const HappyCustomers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000); // 5 seconds delay

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-light text-center mb-16 text-neutral-800">
          Happy Customers
        </h2>

        {/* Testimonials Slider */}
        <div className="mb-12 relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 33.33}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-2"
              >
                {testimonials
                  .slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                  .map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="bg-white rounded-lg p-8 shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow duration-300"
                    >
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-2 border-neutral-200"
                      />
                      
                      <p className="text-neutral-600 text-base mb-8 leading-relaxed italic">
                        {testimonial.text}
                      </p>
                      
                      <div>
                        <h4 className="text-sm font-bold text-neutral-800 mb-1 tracking-wide">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-neutral-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-teal-500 w-8 h-3' 
                  : 'bg-neutral-300 hover:bg-neutral-400 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;