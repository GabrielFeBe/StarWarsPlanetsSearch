import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import StarProvider from '../context/StarProvider';
import userEvent from '@testing-library/user-event';
import { mockedApi } from './mockedApi';

test('I am your test', async () => {
  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedApi),})
  render(
    <StarProvider>
    <App />
    </StarProvider>
  );
  const tatoo = await waitFor(()=>  screen.findByText(/Tatooine/i ))
  expect(tatoo).toBeInTheDocument()
  const descRadio = screen.getByDisplayValue(/desc/i)
  const orderButton = screen.getByRole('button', { name: /ordenar/i })
  const filterButton = screen.getByRole('button', { name: /filtrar/i })
  const columnFilter = screen.getByTestId('column-filter')
  const orderFilter = screen.getByTestId('comparison-filter')
  const writingFilter = screen.getByTestId('name-filter')
  const valueFilter = screen.getByTestId('value-filter')
  const removeFilterButton = screen.getByRole('button', { name: /REMOVER/i })

  userEvent.type(writingFilter, 'aa');
  expect(screen.queryByText(/Tatooine/i)).not.toBeInTheDocument();
  const alderaanRow = screen.getByRole('row', { name: /alderaan/i });
  const planetNameCell = alderaanRow.querySelector('[data-testid="planet-name"]');
  expect(planetNameCell).toHaveTextContent(/Alderaan/i);
  userEvent.clear(writingFilter);
  await waitFor(()=>  expect(screen.getByText(/Hoth/i)).toBeInTheDocument())
  userEvent.selectOptions(columnFilter,'orbital_period')
  userEvent.selectOptions(orderFilter, 'maior que')
  userEvent.type(valueFilter, '350')
  userEvent.click(filterButton)
  expect(screen.queryByText(/naboo/i)).not.toBeInTheDocument();
  userEvent.clear(valueFilter)
  userEvent.selectOptions(columnFilter, 'population')
  userEvent.selectOptions(orderFilter, 'menor que')
  userEvent.type(valueFilter, '10000000000')
  userEvent.click(filterButton)
  expect(screen.queryByText(/Coruscan/i)).not.toBeInTheDocument();
  userEvent.clear(valueFilter)
  userEvent.selectOptions(columnFilter, 'diameter')
  userEvent.selectOptions(orderFilter, 'igual a')  
  userEvent.type(valueFilter,'12500')
  userEvent.click(filterButton)
  expect(screen.queryByText(/Yavin IV/i)).not.toBeInTheDocument();
  userEvent.click(removeFilterButton)
  await waitFor(()=>  expect(screen.getByText(/Bespin/i)).toBeInTheDocument())
  screen.logTestingPlaygroundURL();
  
});

