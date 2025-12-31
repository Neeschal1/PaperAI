import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      value: '2.455',
      label: 'PREMIUM RESOURCES',
      description: 'AI Research Papers'
    },
    {
      id: 2,
      value: '35.409',
      label: 'TOTAL DOWNLOAD',
      description: 'Papers Downloaded'
    },
    {
      id: 3,
      value: '15.89',
      label: 'EMAIL SUBSCRIBER',
      description: 'Active Members'
    }
  ];

  return (
    <section className="py-16 px-6 bg-teal-500 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12 leading-tight">
          Discover Our Latest News &<br />Design Trends
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white text-neutral-900 rounded-lg p-10 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-light text-teal-500 mb-3">
                {stat.value}
              </div>
              <h3 className="font-bold text-sm tracking-wide mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-neutral-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;