import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { routers } from 'routers';
import { genRouteNameDefault } from 'common/utils/route.util';
import useCurrentPage from 'hooks/useCurrentPage';

export default function Breadcrumb({ separator = '>', ...props } = {}) {
  const navigate = useNavigate();
  const { currentRouteHasParams, queryParamsString, currentRoute } = useCurrentPage({ isPaging: false });
  const breadcrumbs = useMemo(() => {
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
    return breadcrumbs;
  }, [currentRouteHasParams]);
  return (
    <BreadcrumbAntd
      separator={separator}
      items={[
        {
          title: <HomeOutlined />,
          href: '',
          onClick: (e) => {
            e.preventDefault();
            navigate('/');
          },
        },
        ...breadcrumbs,
      ]}
      {...props}
    />
  );
}
