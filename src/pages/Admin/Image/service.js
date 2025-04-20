import { api } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import { exportExcel } from 'common/utils/excel.util';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const getImageList = (params = {}) => api.get(`${prefix}`, { params });
const deleteImages = (params) => api.delete(`${prefix}`, { params });
const uploadImages = (data = {}) =>
  api.post(`${prefix}/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
const toggleImagesActive = (data = {}) => api.put(`${prefix}/activate-status`, data);
const exportImages = (params = {}) => exportExcel({ url: `${prefix}/export`, fileName: 'images', params });

export { getImageList, deleteImages, uploadImages, toggleImagesActive, exportImages };
