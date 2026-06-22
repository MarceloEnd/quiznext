// data/puzzleData.js
import Schlosspferde from '../Wimmelbilder/1.png';
import Grashüpfer from '../Wimmelbilder/2.png';

export const PUZZLE_DATA = {
  1: {
    name: "Schlosspferde",
    image: Schlosspferde,
    differences: [
      { id: 1, x: 11.6, y: 30.0, r: 5 },
      { id: 2, x: 27.1, y: 27.7, r: 5 },
      { id: 3, x: 16.1, y: 64.9, r: 5 },
      { id: 4, x: 27.7, y: 74.8, r: 5 },
      { id: 5, x: 72.3, y: 50.5, r: 5 },
      { id: 6, x: 91.6, y: 75.9, r: 5 }
    ]
  },
   2: {
     name: "Grashüpfer",
     image: Grashüpfer,
     differences: [
       { id: 1, x: 63, y: 59.0, r: 4 },
     ]
   },
};
