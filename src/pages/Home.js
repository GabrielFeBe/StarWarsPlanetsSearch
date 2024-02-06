import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import { StarContext } from '../context/StarProvider';
import grafismo from '../images/grafismo.svg';
import logo from '../images/logo.svg';
import Filter from '../components/Filter';

export default function Home() {
  const [filter, setFilter] = useState('');
  const { values: { stars: worlds = [],
    setFilterdStars } = {} } = useContext(StarContext);

  useEffect(() => {
    const filteredPlanets = worlds.filter(({ name }) => name.includes(filter));
    setFilterdStars(filteredPlanets);
  }, [filter, worlds, setFilterdStars]);

  return (
    <>
      <h1
        className="relative w-[695.06px] h-[695.06px]"
        style={ {
          backgroundImage: `url(${grafismo})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } }
      >

        <img
          src={ logo }
          alt=""
          className="absolute top-[165px] left-[50%]
         transform translate-x-[-50%]"
        />

      </h1>
      <section
        className="w-[1400px] h-[750px] border-[1px] border-white rounded-[20px] flex
        justify-end flex-col pb-[20px]"
      >

        <input
          type="text"
          data-testid="name-filter"
          placeholder="Letter filter"
          className="w-[671px] h-[42px] m-auto rounded-[5px] pl-[16px] pr-[16px]
          bg-transparent border-[1px] border-white text-white"
          value={ filter }
          onChange={ ({ target }) => setFilter(target.value) }
        />
        <Filter />
        <Table />
      </section>

    </>
  );
}
