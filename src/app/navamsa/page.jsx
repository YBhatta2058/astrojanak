// App.js
import React from 'react';
import NavamsaChart from '../Components/navamsa'

const data = {
  "0": { "name": "Ascendant", "isRetro": "false", "current_sign": 7 },
  "1": { "name": "Sun", "isRetro": "false", "current_sign": 7 },
  "2": { "name": "Moon", "isRetro": "false", "current_sign": 5 },
  "3": { "name": "Mars", "isRetro": "false", "current_sign": 9 },
  "4": { "name": "Mercury", "isRetro": "false", "current_sign": 10 },
  "5": { "name": "Jupiter", "isRetro": "false", "current_sign": 11 },
  "6": { "name": "Venus", "isRetro": "false", "current_sign": 6 },
  "7": { "name": "Saturn", "isRetro": "false", "current_sign": 9 },
  "8": { "name": "Rahu", "isRetro": "true", "current_sign": 4 },
  "9": { "name": "Ketu", "isRetro": "true", "current_sign": 10 },
  "10": { "name": "Uranus", "isRetro": "false", "current_sign": 7 },
  "11": { "name": "Neptune", "isRetro": "false", "current_sign": 4 },
  "12": { "name": "Pluto", "isRetro": "false", "current_sign": 11 }
};

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Navamsa Chart</h1>
      <NavamsaChart data={data} />
    </div>
  );
}

export default App;
