import React from 'react';
const LazyHome: React.LazyExoticComponent<React.FC> = React.lazy(() => import('./LandingPage'));

export default LazyHome;
