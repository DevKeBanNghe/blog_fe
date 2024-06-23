import React from 'react';
import { ROOT_ROUTE } from './const';
const Donates = React.lazy(() => import('./pages'));

const donatesRouters = [
  {
    path: ROOT_ROUTE,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Donates,
    is_breadcrumb: false,
  },
];

export default donatesRouters;
