import React, { lazy, Suspense } from 'react';

const LazyDeliveries = lazy(() => import('./Deliveries'));

const Deliveries = props => (
  <Suspense fallback={null}>
    <LazyDeliveries {...props} />
  </Suspense>
);

export default Deliveries;
