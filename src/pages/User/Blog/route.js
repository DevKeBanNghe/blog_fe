import React from 'react';
import { ROOT_ROUTE } from './const';
const Blogs = React.lazy(() => import('./pages'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));

const blogsRouters = [
  {
    path: '/',
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Blogs,
    is_breadcrumb: false,
  },
  {
    path: '/blogs',
    permission: 'SYS_ANNOUNCE_VIEW',
    component: Blogs,
    is_breadcrumb: false,
  },
  {
    path: `${ROOT_ROUTE}/:id`,
    permission: 'SYS_ANNOUNCE_VIEW',
    component: BlogDetail,
  },
];

export default blogsRouters;
