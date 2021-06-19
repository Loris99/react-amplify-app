import React, { lazy, Suspense } from 'react';

const LazyCustomers = lazy(() => import('./Customers'));

const Customers = props => (
  <Suspense fallback={null}>
    <LazyCustomers {...props} />
  </Suspense>
);

export default Customers;
