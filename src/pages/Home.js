import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import { StarContext } from '../context/StarProvider';
import orderStars from '../utils/orderPlanets';

const filterArraysForUse = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function Home() {
  const [filter, setFilter] = useState('');
  const { values: { stars: worlds = [], setStars,
    setFilterdStars, filterdStars } = {} } = useContext(StarContext);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [arrayOfColumns, setArrayOfColumns] = useState(filterArraysForUse);
  const [valueFilter, setValueFilter] = useState(0);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [sortDropDown, setSortDropDown] = useState('population');
  const [radioValue, setRadioValue] = useState('ASC');

  useEffect(() => {
    const filteredPlanets = worlds.filter(({ name }) => name.includes(filter));
    setFilterdStars(filteredPlanets);
  }, [filter, worlds, setFilterdStars]);
  useEffect(() => {
    const filteredValue = filterdStars.filter((planet) => {
      const arrayOfBool = arrayOfFilters.map((currFilter) => {
        const splitStatment = currFilter.split(' ');
        const valueFromApi = planet[splitStatment[0]];
        const valueFromStatment = splitStatment[3];
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
      return arrayOfBool.every((bool) => bool);
    });
    setFilterdStars(filteredValue);
  }, [arrayOfFilters, setFilterdStars, setFilterdStars]);
  const clickingFilterButton = () => {
    const newItem = `${columnFilter} ${comparisonFilter} ${valueFilter}`;
    setArrayOfFilters([...arrayOfFilters, newItem]);
  };

  return (
    <div>
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
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {arrayOfColumns.map((column) => (
            <option
              value={ column }
              data-testid="options"
              key={ column }
            >
              {column}

            </option>
          ))}
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
          onClick={ () => {
            clickingFilterButton();
            const newArrayOfColumns = arrayOfColumns.filter(
              (column) => column !== columnFilter,
            );
            setColumnFilter(newArrayOfColumns[0]);
            setArrayOfColumns(newArrayOfColumns);
          } }
        >
          Filtrar

        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setArrayOfFilters([]);
            setColumnFilter(filterArraysForUse[0]);
            setArrayOfColumns(filterArraysForUse);
            setFilterdStars(worlds);
          } }
        >
          Remover Filtros

        </button>
        {arrayOfFilters.map((filterInfo) => (
          <p
            key={ filterInfo }
            data-testid="filter"
          >
            {filterInfo}
            <button
              onClick={ () => {
                const splitingInfo = filterInfo.split(' ');
                const excludingCurrFilter = arrayOfFilters.filter(
                  (filtering) => filtering !== filterInfo,
                );
                setArrayOfColumns([...arrayOfColumns, splitingInfo[0]]);
                setArrayOfFilters(excludingCurrFilter);
                setFilterdStars(worlds);
              } }
            >
              X
            </button>
          </p>))}
      </div>
      <div>
        <select
          onChange={ ({ target }) => setSortDropDown(target.value) }
          data-testid="column-sort"
        >
          {filterArraysForUse.map((information, i) => (
            <option value={ information } key={ i }>{information}</option>
          ))}
        </select>
        <input
          type="radio"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ radioValue === 'ASC' }
          onClick={ ({ target }) => setRadioValue(target.value) }
        />
        crescente
        <input
          type="radio"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ radioValue === 'DESC' }
          onClick={ ({ target }) => setRadioValue(target.value) }
        />
        decrecente
        <button
          data-testid="column-sort-button"
          onClick={ () => {
            orderStars(radioValue, sortDropDown, worlds, setStars);
          } }
        >
          Ordenar

        </button>
      </div>
      <Table />

    </div>
  );
}
