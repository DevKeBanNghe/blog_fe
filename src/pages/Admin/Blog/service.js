import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import { exportExcel } from 'common/utils/excel.util';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const createBlog = (data = {}) => api.post(`${prefix}`, data);
const updateBlog = (data = {}) => api.put(`${prefix}`, data);
const getBlogList = (params = {}) => api.get(`${prefix}`, { params });
const getBlogDetail = (id) => api.get(`${prefix}/${id}`);
const deleteBlogs = (params) => api.delete(`${prefix}`, { params });
const updatePublishBlogStatus = (data = {}) => api.patch(`${prefix}/publish`, data);
const toggleBlogsActive = (data = {}) => api.put(`${prefix}/activate-status`, data);
const exportBlogs = (params = {}) => exportExcel({ url: `${prefix}/export`, fileName: 'blogs', params });

export {
  createBlog,
  updateBlog,
  getBlogList,
  getBlogDetail,
  deleteBlogs,
  updatePublishBlogStatus,
  toggleBlogsActive,
  exportBlogs,
};
