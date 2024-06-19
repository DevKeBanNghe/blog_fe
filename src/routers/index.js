import blogsAdminRouters from 'pages/Admin/Blog/route';
import tagRouters from 'pages/Admin/Tag/route';
import blogsRouters from 'pages/User/Blog/route';
import imageRouters from 'pages/Admin/Image/route';

export const routers = [...blogsRouters, ...blogsAdminRouters, ...tagRouters, ...imageRouters];
