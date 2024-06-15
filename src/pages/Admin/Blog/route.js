import React from 'react';
import { ROOT_ROUTE } from './const';
import BlogForm from './components/BlogForm';
const Blogs = React.lazy(() => import('./pages'));

const blogsAdminRouters = [
  {
    path: ROOT_ROUTE,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Blogs,
    name: 'Blog list',
    is_tab: true,
  },
  {
    path: `${ROOT_ROUTE}/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: BlogForm,
    name: 'Blog detail',
  },
  {
    path: `${ROOT_ROUTE}/create`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: BlogForm,
    name: 'Blog create',
  },
  {
    path: `${ROOT_ROUTE}/edit/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: BlogForm,
    name: 'Blog edit',
  },
  {
    path: `${ROOT_ROUTE}/copy/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: BlogForm,
    name: 'Blog copy',
  },
];

export default blogsAdminRouters;
