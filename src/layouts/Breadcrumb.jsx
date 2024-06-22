import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { routers } from 'routers';
import { genRouteNameDefault } from 'common/utils/route.util';
import useCurrentPage from 'hooks/useCurrentPage';
import usePageRedirect from 'hooks/usePageRedirect';
const APP_PREFIX = import.meta.env.VITE_APP_PREFIX;
export default function Breadcrumb({ separator = '>', ...props } = {}) {
  const navigate = useNavigate();
  const { currentRouteHasParams, queryParamsString, currentRoute } = useCurrentPage({ isPaging: false });
  const { goToHomePage } = usePageRedirect();
  const items = useMemo(() => {
    if (currentRoute === APP_PREFIX) return [];
    const breadcrumbs = [];
    for (const route of routers) {
      if (!(currentRouteHasParams.includes(route.path) && (route.is_breadcrumb ?? true))) continue;
      breadcrumbs.push({
        title: route.name ?? genRouteNameDefault(route.path),
        href: '',
        onClick: (e) => {
          e.preventDefault();
          navigate(`${currentRoute}${queryParamsString}`);
        },
      });
    }

    return [
      {
        title: <HomeOutlined />,
        href: '',
        onClick: (e) => {
          e.preventDefault();
          goToHomePage();
        },
      },
      ...breadcrumbs,
    ];
  }, [currentRouteHasParams]);
  return <BreadcrumbAntd separator={separator} items={items} {...props} />;
}
