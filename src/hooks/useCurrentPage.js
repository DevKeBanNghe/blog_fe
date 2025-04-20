import { DEFAULT_PAGINATION, PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import { isFunction } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useParams, useResolvedPath, useSearchParams } from 'react-router-dom';

export default function useCurrentPage({ keyIdParams = 'id', isPaging = true, customIdParams } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useResolvedPath();
  const isAdminPage = pathname.includes(PREFIX_ADMIN_PAGE);
  const getCurrentRootRoute = () => {
    let currentRootRouteIndex = pathname.indexOf(import.meta.env.VITE_APP_PREFIX, 1);
    if (isAdminPage) {
      currentRootRouteIndex = pathname.indexOf('/', currentRootRouteIndex + 1);
    }
    return currentRootRouteIndex >= 0 ? pathname.slice(0, currentRootRouteIndex) : pathname;
  };
  const currentRootRoute = getCurrentRootRoute();
  const params = useParams();

  const isEdit = pathname.includes('edit');
  const isCopy = pathname.includes('copy');
  const id =
    customIdParams && isFunction(customIdParams) && params[keyIdParams]
      ? customIdParams(params[keyIdParams])
      : params[keyIdParams];
  const isView = !isEdit && !isCopy && id ? true : false;
  const queryParams = useMemo(() => {
    return searchParams.entries().reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }, [searchParams]);

  const currentRouteHasParams = useMemo(() => {
    let routeHasParams = pathname;
    for (const [key, value] of Object.entries(params)) {
      routeHasParams = routeHasParams.replace(value, `:${key}`);
    }
    return routeHasParams;
  }, [params, pathname]);

  useEffect(() => {
    if (
      isPaging &&
      (!queryParams.page || !queryParams.itemPerPage || queryParams.page < 1 || queryParams.itemPerPage < 1)
    ) {
      setSearchParams(DEFAULT_PAGINATION);
    }
  }, []);

  const setQueryParams = (value) => {
    if (typeof value === 'function') {
      return setSearchParams(value(queryParams));
    }
    setSearchParams(value);
  };

  const queryParamsPagingStringDefault = useMemo(
    () =>
      Object.entries(DEFAULT_PAGINATION).reduce(
        (acc, [key, value], index) => `${acc}${index === 0 ? '' : '&'}${key}=${value}`,
        '?',
      ),
    [],
  );

  return {
    isEdit,
    isView,
    isCopy,
    isCreate: !isEdit && !isView && !isCopy,
    id,
    currentRootRoute,
    currentRouteHasParams,
    currentRoute: pathname,
    params,
    queryParamsString: `?${searchParams.toString()}`,
    queryParamsPagingStringDefault,
    queryParams,
    setQueryParams,
    isAdminPage,
  };
}
