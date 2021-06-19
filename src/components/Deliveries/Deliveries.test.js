import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Deliveries from './Deliveries';

describe('<Deliveries />', () => {
  test('it should mount', () => {
    render(<Deliveries />);
    
    const deliveries = screen.getByTestId('Deliveries');

    expect(deliveries).toBeInTheDocument();
  });
});