import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';

const getBlogListForUser = (params = {}) => api.get(`${ROOT_ROUTE}/for-user`, { params });
const getBlogDetailForUser = (id) => api.get(`${ROOT_ROUTE}/${id}/for-user`);
const updateBlogTrackingInfo = ({ blog_id, ...data } = {}) => api.patch(`${ROOT_ROUTE}/tracking/${blog_id}`, data);
const subscribeToBlogs = (data = {}) => api.post(`${ROOT_ROUTE}/subscribe`, data);

export { getBlogListForUser, getBlogDetailForUser, updateBlogTrackingInfo, subscribeToBlogs };
