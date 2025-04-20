import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import { exportExcel } from 'common/utils/excel.util';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const createTag = (data = {}) => api.post(`${prefix}`, data);
const updateTag = (data = {}) => api.put(`${prefix}`, data);
const getTagList = (params = {}) => api.get(`${prefix}`, { params });
const getTagDetail = (id) => api.get(`${prefix}/${id}`);
const deleteTags = (params) => api.delete(`${prefix}`, { params });
const getTagOptions = (params = {}) => api.get(`${prefix}/options`, { params });
const toggleTagsActive = (data = {}) => api.put(`${prefix}/activate-status`, data);
const exportTags = (params = {}) => exportExcel({ url: `${prefix}/export`, fileName: 'tags', params });
const importUrl = `${prefix}/import`;

export {
  createTag,
  updateTag,
  getTagList,
  getTagDetail,
  deleteTags,
  getTagOptions,
  toggleTagsActive,
  exportTags,
  importUrl,
};
