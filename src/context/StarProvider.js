import { createContext, useState } from 'react';

export const StarContext = createContext();

function StarProvider({ children }) {
  const [stars, setStars] = useState([]);
  const fetchPlants = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    data.results.map((result) => {
      const planet = result;
      delete planet.residents;
      return planet;
    });
    setStars(data.results);
  };
  fetchPlants();
  const values = {
    stars,
  };
  return (
    <StarContext.Provider value={ { values } }>
      {children}
    </StarContext.Provider>
  );
}

export default StarProvider;
