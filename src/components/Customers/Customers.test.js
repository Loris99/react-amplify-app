import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Customers from './Customers';

describe('<Customers />', () => {
  test('it should mount', () => {
    render(<Customers />);
    
    const customers = screen.getByTestId('Customers');

    expect(customers).toBeInTheDocument();
  });
});