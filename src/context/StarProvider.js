import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const StarContext = createContext();

function StarProvider({ children }) {
  const [stars, setStars] = useState([]);
  const [filterdStars, setFilterdStars] = useState([]);

  const fetchPlants = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    data.results.map((result) => {
      const planet = result;
      delete planet.residents;
      return planet;
    });
    setStars(data.results);
    setFilterdStars(data.results);
  };
  const values = useMemo(() => ({
    stars,
    setStars,
    filterdStars,
    setFilterdStars,
  }), [stars, filterdStars]);

  useEffect(() => {
    fetchPlants();
  }, []);
  return (
    <StarContext.Provider value={ { values } }>
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
