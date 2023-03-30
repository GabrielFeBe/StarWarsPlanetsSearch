import React, { useContext, useEffect, useState } from 'react';
import { StarContext } from '../context/StarProvider';

export default function Table() {
  const [filter, setFilter] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [columnFilteredArray, setColumnFilteredArray] = useState([]);
  const { values: { stars: worlds } } = useContext(StarContext);
  useEffect(() => {
    const filteredPlanets = worlds.filter(({ name }) => name.includes(filter));
    setFilteredArray(filteredPlanets);
  }, [filter, worlds]);
  useEffect(() => {
    const filteredValue = filteredArray.filter((planet) => {
      const arrayOfBool = arrayOfFilters.map((currFilter) => {
        const splitStatment = currFilter.split(' ');
        const valueFromApi = planet[splitStatment[0]];
        const valueFromStatment = splitStatment[3];
        console.log(valueFromApi);
        switch (splitStatment[1]) {
        case 'menor':
          return +valueFromApi < +valueFromStatment;
        case 'maior':
          return +valueFromApi > +valueFromStatment;
        case 'igual':
          return +valueFromApi === +valueFromStatment;
        default:
          return false;
        }
      });
      console.log(arrayOfBool);
      return arrayOfBool.every((bool) => bool);
    });
    console.log(filteredValue);
    setColumnFilteredArray(filteredValue);
  }, [arrayOfFilters, filteredArray]);
  const clickingFilterButton = () => {
    const newItem = `${columnFilter} ${comparisonFilter} ${valueFilter}`;
    setArrayOfFilters([...arrayOfFilters, newItem]);
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ filter }
        onChange={ ({ target }) => setFilter(target.value) }
      />
      <div>
        <select
          name="filterType"
          value={ columnFilter }
          id="filterType"
          data-testid="column-filter"
          onClick={ ({ target }) => setColumnFilter(target.value) }
        >
          <option value="population" data-testid="options">population</option>
          <option value="orbital_period" data-testid="options">orbital_period</option>
          <option value="diameter" data-testid="options">diameter</option>
          <option value="rotation_period" data-testid="options">rotation_period</option>
          <option value="surface_water" data-testid="options">surface_water</option>
        </select>
        <select
          name=""
          data-testid="comparison-filter"
          id=""
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="text"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ clickingFilterButton }
        >
          Filtrar

        </button>
        {arrayOfFilters.map((filterInfo) => <p key={ filterInfo }>{filterInfo}</p>)}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {arrayOfFilters.length < 1 ? filteredArray.map((planet, i) => {
            const { climate, created, diameter, edited, films, gravity, name,
              orbital_period: orbitalPeriod, population,
              rotation_period: rotationPeriod,
              surface_water: surfaceWater, terrain, url } = planet;

            return (
              <tr key={ i }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films.map((film) => film)}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            );
          })
            : columnFilteredArray.map((planet, i) => {
              const { climate, created, diameter, edited, films, gravity, name,
                orbital_period: orbitalPeriod, population,
                rotation_period: rotationPeriod,
                surface_water: surfaceWater, terrain, url } = planet;

              return (
                <tr key={ i }>
                  <td>{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films.map((film) => film)}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
