import { deleteApi, getApi, postApi } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const getImageList = (params = {}) => getApi(`${prefix}`, { params });
const deleteImages = (params) => deleteApi(`${prefix}`, { params });
const uploadImages = (data = {}) =>
  postApi(`${prefix}/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export { getImageList, deleteImages, uploadImages };
