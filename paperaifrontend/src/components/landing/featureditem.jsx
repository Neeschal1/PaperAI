import React from 'react';
import { User } from 'lucide-react';
import products from '../../data/products'

const FeaturedItems = () => {

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light text-center mb-16 text-neutral-800">
          Feautured Items
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-neutral-200 aspect-300/190">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-sm font-bold mb-2 tracking-wide text-neutral-800">
                  {product.title}
                </h3>
                <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Author and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center">
                      <User size={16} className="text-neutral-600" />
                    </div>
                    <span className="text-xs text-neutral-600">
                      by {product.author}
                    </span>
                  </div>
                  <div className="bg-yellow-300 px-3 py-1 rounded text-sm font-bold text-neutral-800">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;