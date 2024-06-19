import React from 'react';
import { ROOT_ROUTE } from './const';
import ImageForm from './components/ImageForm';
const Images = React.lazy(() => import('./pages'));

const imagesAdminRouters = [
  {
    path: ROOT_ROUTE,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Images,
    name: 'Image list',
    is_tab: true,
  },
  {
    path: `${ROOT_ROUTE}/create`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: ImageForm,
    name: 'Image Upload',
  },
];

export default imagesAdminRouters;
