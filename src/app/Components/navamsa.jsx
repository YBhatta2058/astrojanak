// NavamsaChart.js
import React from 'react';

const NavamsaChart = ({ data }) => {
  // Initialize the houses array with 12 empty arrays
  const houses = Array(12).fill(null).map(() => []);

  // Populate the houses with planets
  Object.values(data).forEach(planet => {
    houses[planet.current_sign - 1].push(planet);
  });

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 transform rotate-45">
        {houses.map((house, index) => (
          <div key={index} className="relative border border-red-500 w-full h-full flex items-center justify-center">
            <div className="transform -rotate-45 text-center">
              <div className="font-bold">House {index + 1}</div>
              {house.map((planet, i) => (
                <div key={i}>
                  {planet.name} {planet.isRetro === 'true' && '(R)'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-1/2 h-1/2 border-l-4 border-t-4 border-red-500"></div>
        <div className="w-1/2 h-1/2 border-r-4 border-b-4 border-red-500"></div>
      </div>
    </div>
  );
};

export default NavamsaChart;
