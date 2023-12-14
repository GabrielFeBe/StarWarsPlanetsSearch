import React, { useContext } from 'react';
import { StarContext } from '../context/StarProvider';

export default function Table() {
  const { values: { filterdStars } = {} } = useContext(StarContext);

  return (
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
        { filterdStars.map((planet, i) => {
          const { climate, created, diameter, edited, films, gravity, name,
            orbital_period: orbitalPeriod, population,
            rotation_period: rotationPeriod,
            surface_water: surfaceWater, terrain, url } = planet;

          return (
            <tr key={ i }>
              <td data-testid="planet-name">{name}</td>
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
  );
}
