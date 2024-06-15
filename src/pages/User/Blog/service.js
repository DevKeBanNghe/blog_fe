import { getApi } from 'common/utils/index';
import { ROOT_ROUTE } from './const';

const getBlogListForUser = (params = {}) => getApi(`${ROOT_ROUTE}/for-user`, { params });
const getBlogDetailForUser = (id) => getApi(`${ROOT_ROUTE}/${id}`);

export { getBlogListForUser, getBlogDetailForUser };
