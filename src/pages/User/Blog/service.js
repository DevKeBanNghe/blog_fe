import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { paginate } from '../../../db/pagination.helper';
import { db } from '../../../db';

// const getBlogListForUser = (params = {}) => api.get(`${ROOT_ROUTE}/for-user`, { params });
// const getBlogDetailForUser = (id) => api.get(`${ROOT_ROUTE}/${id}/for-user`);
// const updateBlogTrackingInfo = ({ blog_id, ...data } = {}) => api.patch(`${ROOT_ROUTE}/tracking/${blog_id}`, data);
const getBlogListForUser = async (params = {}) => {
  const data = await paginate(db.blog, { ...params, where: { blog_is_publish: 1 } });
  return { data };
};
const getBlogDetailForUser = async (id) => {
  const data = await db.blog.get({ blog_id: id });
  return { data: data.blog_is_publish ? data : {} };
};
const updateBlogTrackingInfo = async ({ blog_id } = {}) => {
  const data = await db.blog.where({ blog_id }).modify((blog) => {
    blog.blog_view = (blog.blog_view ?? 0) + 1;
  });
  console.log('>>> check', data);
  return { data };
};
const subscribeToBlogs = (data = {}) => api.post(`${ROOT_ROUTE}/subscribe`, data);

export { getBlogListForUser, getBlogDetailForUser, updateBlogTrackingInfo, subscribeToBlogs };
