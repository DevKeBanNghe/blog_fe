import { getApi, patchApi } from 'common/utils/index';
import { ROOT_ROUTE } from './const';

const getBlogListForUser = (params = {}) => getApi(`${ROOT_ROUTE}/for-user`, { params });
const getBlogDetailForUser = (id) => getApi(`${ROOT_ROUTE}/${id}/for-user`);
const updateBlogTrackingInfo = ({ blog_id, ...data } = {}) => patchApi(`${ROOT_ROUTE}/tracking/${blog_id}`, data);

export { getBlogListForUser, getBlogDetailForUser, updateBlogTrackingInfo };
