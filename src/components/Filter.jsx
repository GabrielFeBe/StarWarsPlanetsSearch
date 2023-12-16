import React, { useState, useEffect, useContext } from 'react';
import orderStars from '../utils/orderPlanets';
import { StarContext } from '../context/StarProvider';

const filterArraysForUse = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function Filter() {
  const { values: { stars: worlds = [], setStars,
    setFilterdStars, filterdStars } = {} } = useContext(StarContext);
  const [sortDropDown, setSortDropDown] = useState('population');
  const [radioValue, setRadioValue] = useState('ASC');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [arrayOfColumns, setArrayOfColumns] = useState(filterArraysForUse);
  const [valueFilter, setValueFilter] = useState(0);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);

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
    <div className="flex gap-[40px] justify-center items-center mb-[63px]">
      <label
        htmlFor="filterType"
        className="w-[134px] h-[49px]"
      >
        Coluna
        <select
          className=" w-full  bg-transparent text-white "
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
      </label>
      <label htmlFor="" className="w-[118px] h-[49px] ">
        Operador
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
      </label>

      <input
        type="text"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ ({ target }) => setValueFilter(target.value) }
        className="w-[91px] h-[42px] bg-transparent text-white border-[1px] border-white
        pl-[14px] pr-[24px] font-bold text-sm rounded-md"
      />
      <button
        className="border-[#FAE60A] text-[#FAE60A] w-[91px] h-[85px] rounded-md
        bg-transparent flex items-center justify-center font-bold text-sm border-[1px]"
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
        FILTRAR

      </button>

      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          setArrayOfFilters([]);
          setColumnFilter(filterArraysForUse[0]);
          setArrayOfColumns(filterArraysForUse);
          setFilterdStars(worlds);
        } }
        className="border-[#FAE60A] text-[#FAE60A] w-[91px] h-[85px] rounded-md
        bg-transparent flex items-center justify-center font-bold text-sm border-[1px]"
      >
        REMOVER

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
      <label htmlFor="" className="w-[135px] h-[49px]">
        Ordenar
        <select
          onChange={ ({ target }) => setSortDropDown(target.value) }
          data-testid="column-sort"
        >
          {filterArraysForUse.map((information, i) => (
            <option value={ information } key={ i }>{information}</option>
          ))}
        </select>
      </label>
      <section className="flex flex-col gap-[17px]  justify-center">
        <label htmlFor="" className="font-bold text-white text-sm">

          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            className="mr-[11px]"
            checked={ radioValue === 'ASC' }
            onClick={ ({ target }) => setRadioValue(target.value) }
          />
          Ascendente
        </label>
        <label htmlFor="" className="font-bold text-white text-sm">

          <input
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            className="mr-[11px]"
            checked={ radioValue === 'DESC' }
            onClick={ ({ target }) => setRadioValue(target.value) }
          />
          Descendente
        </label>

      </section>

      <button
        data-testid="column-sort-button"
        onClick={ () => {
          orderStars(radioValue, sortDropDown, worlds, setStars);
        } }
        className="border-[#FAE60A] text-[#FAE60A] w-[98px] h-[85px] rounded-md
        bg-transparent flex items-center justify-center font-bold text-sm border-[1px]"
      >
        ORDENAR
      </button>
    </div>
  );
}
