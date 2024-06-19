import { Tabs } from 'antd';
import { genRouteNameDefault } from 'common/utils/route.util';
import useCurrentPage from 'hooks/useCurrentPage';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from 'routers';

const items = routers
  .filter((route) => route.is_tab)
  .map((route) => ({
    key: route.path,
    label: route.name ?? genRouteNameDefault(route.path),
  }));
const TabHeader = (props = {}) => {
  const { currentRoute } = useCurrentPage({ isPaging: false });

  const defaultActiveKey = useMemo(() => items.find((item) => currentRoute.includes(item.key))?.key, [items]);

  const navigate = useNavigate();
  const onChange = (key) => {
    navigate(key);
  };
  return <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} {...props} />;
};
export default TabHeader;
