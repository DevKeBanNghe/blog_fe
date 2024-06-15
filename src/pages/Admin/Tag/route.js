import React from 'react';
import { ROOT_ROUTE } from './const';
import TagForm from './components/TagForm';
const Tags = React.lazy(() => import('./pages'));

const tagsAdminRouters = [
  {
    path: ROOT_ROUTE,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Tags,
    name: 'Tag list',
    is_tab: true,
  },
  {
    path: `${ROOT_ROUTE}/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: TagForm,
    name: 'Tag detail',
  },
  {
    path: `${ROOT_ROUTE}/create`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: TagForm,
    name: 'Tag create',
  },
  {
    path: `${ROOT_ROUTE}/edit/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: TagForm,
    name: 'Tag edit',
  },
  {
    path: `${ROOT_ROUTE}/copy/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: TagForm,
    name: 'Tag copy',
  },
];

export default tagsAdminRouters;
