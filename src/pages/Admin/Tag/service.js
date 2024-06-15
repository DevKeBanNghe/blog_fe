import { deleteApi, getApi, postApi, putApi } from 'common/utils/index';
import { ROOT_ROUTE } from './const';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';

const prefix = ROOT_ROUTE.replace(PREFIX_ADMIN_PAGE, '');
const createTag = (data = {}) => postApi(`${prefix}`, data);
const updateTag = (data = {}) => putApi(`${prefix}`, data);
const getTagList = (params = {}) => getApi(`${prefix}`, { params });
const getTagDetail = (id) => getApi(`${prefix}/${id}`);
const deleteTags = (params) => deleteApi(`${prefix}`, { params });
const getTagOptions = (params = {}) => getApi(`${prefix}/options`, { params });

export { createTag, updateTag, getTagList, getTagDetail, deleteTags, getTagOptions };
