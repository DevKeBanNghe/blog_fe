import { useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import { Col, Layout, Row } from 'antd';
import { FloatButton } from 'antd';
import useUser from 'hooks/useUser';
import useAuth from 'hooks/useAuth';
import useCurrentPage from 'hooks/useCurrentPage';
import { redirectTo } from 'common/utils/common.util';
const { Content } = Layout;
const { VITE_SSO_URL: SSO_URL, VITE_WEBPAGE_KEY: WEBPAGE_KEY } = import.meta.env;

const OutletGridBase = ({ md, mdOutlet }) => {
  const outlet = useOutlet();
  return (
    <Row justify={'center'}>
      <Col xs={0} md={md}></Col>
      <Col xs={24} md={mdOutlet}>
        {outlet}
      </Col>
      <Col xs={0} md={md}></Col>
    </Row>
  );
};

const OutletGridUser = () => <OutletGridBase md={3} mdOutlet={18} />;

const OutletGridAdmin = () => <OutletGridBase md={1} mdOutlet={22} />;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const { isAllowed } = useAuth();
  const { currentRoute, currentRootRoute, isAdminPage } = useCurrentPage({ isPaging: false });

  useEffect(() => {
    if (user.loading) return;
    if (currentRootRoute === '/') return;
    if (!isAllowed) {
      if (!user.user_name) return redirectTo(`${SSO_URL}sign-in?webpage_key=${WEBPAGE_KEY}`);
      navigate('error', {
        state: {
          status_code: 403,
        },
      });
    }
  }, [user, isAllowed, currentRoute]);

  return (
    <>
      <FloatButton.BackTop />
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ margin: '0', minHeight: '89.35vh' }}>
        <Content style={{ margin: '10px 0 0 0', overflow: 'initial' }}>
          {isAdminPage ? <OutletGridAdmin /> : <OutletGridUser />}
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default HomePage;
