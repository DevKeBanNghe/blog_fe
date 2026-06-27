// import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import { exportExcel } from 'common/utils/excel.util';
import { db } from '../../../db';
import { paginate } from '../../../db/pagination.helper';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
// const createBlog = (data = {}) => api.post(`${prefix}`, data);
const createBlog = async (data = {}) => {
  const result = await db.blog.add(data);
  return { data: result };
};
// const updateBlog = (data = {}) => api.put(`${prefix}`, data);

const updateBlog = async (data = {}) => {
  const blog_id = data.blog_id;
  const { data: blog } = await getBlogDetail(blog_id);
  const result = await db.blog.update({ blog_id }, { ...blog, ...data });
  return { data: result };
};
// const getBlogList = (params = {}) => api.get(`${prefix}`, { params });
const getBlogList = async (params = {}) => {
  const data = await paginate(db.blog, params);
  return { data };
};
// const getBlogDetail = (id) => api.get(`${prefix}/${id}`);
const getBlogDetail = async (id) => {
  const data = await db.blog.get({ blog_id: id });
  return { data };
};
// const deleteBlogs = (params) => api.delete(`${prefix}`, { params });
const deleteBlogs = async (params) => {
  const data = await db.blog.where('blog_id').anyOf(params.ids).delete();
  return { data };
};
// const updatePublishBlogStatus = (data = {}) => api.patch(`${prefix}/publish`, data);
const updatePublishBlogStatus = async (data = {}) => {
  const blog_id = data.blog_id;
  const { data: blog } = await getBlogDetail(blog_id);
  const result = await db.blog.update({ blog_id }, { ...blog, ...data });
  return { data: result };
};
// const toggleBlogsActive = (data = {}) => api.put(`${prefix}/activate-status`, data);
const toggleBlogsActive = async (data = {}) => {
  const result = await db.blog.where('blog_id').anyOf(data.blog_ids).modify({
    is_active: data.is_active,
  });
  return { data: result };
};
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
