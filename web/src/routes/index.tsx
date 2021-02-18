import React from 'react';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return signed ? 
  <OtherRoutes />
  : <SignRoutes/>;
  // return (
  //   <><OtherRoutes />
  //     <SignRoutes /></>
  // )
}

export default Routes;