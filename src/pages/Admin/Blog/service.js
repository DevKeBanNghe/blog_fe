import { deleteApi, getApi, postApi, putApi } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const createBlog = (data = {}) => postApi(`${prefix}`, data);
const updateBlog = (data = {}) => putApi(`${prefix}`, data);
const getBlogList = (params = {}) => getApi(`${prefix}`, { params });
const getBlogDetail = (id) => getApi(`${prefix}/${id}`);
const deleteBlogs = (params) => deleteApi(`${prefix}`, { params });

export { createBlog, updateBlog, getBlogList, getBlogDetail, deleteBlogs };
