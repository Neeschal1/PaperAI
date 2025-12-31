import React from 'react';
import category from '../../data/categoriesoptions'

const PopularCategories = () => {

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-light text-center mb-16 text-neutral-800">
          Popular Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {category.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
              style={{ aspectRatio: '180/110' }}
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 transition-all duration-300 group-hover:from-black/80">
                <h3 className="text-white text-sm font-semibold mb-1 leading-tight">
                  {category.name}
                </h3>
                <p className="text-white/80 text-xs">
                  {category.count} Papers
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;