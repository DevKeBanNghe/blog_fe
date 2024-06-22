import { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import { Col, Layout, Row } from 'antd';
const { Content } = Layout;
import { FloatButton } from 'antd';
// import useUser from 'hooks/useUser';
// import { LOADING_STATUS, PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
// import useAuth from 'hooks/useAuth';
// import useCurrentPage from 'hooks/useCurrentPage';
// import { redirectTo } from 'common/utils/common.util';
// const { VITE_SSO_URL: SSO_URL, VITE_WEBPAGE_KEY: WEBPAGE_KEY } = import.meta.env;
const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const outlet = useOutlet();
  // const navigate = useNavigate();
  // const user = useUser();
  // const { isAllowed } = useAuth();
  // const { currentRoute } = useCurrentPage({ isPaging: false });

  // useEffect(() => {
  //   if (!currentRoute.includes(PREFIX_ADMIN_PAGE)) return () => {};
  //   if (!user.user_name && user.loading === LOADING_STATUS.IDLE)
  //     return redirectTo(`${SSO_URL}sign-in?webpage_key=${WEBPAGE_KEY}`);
  //   if (!isAllowed)
  //     return navigate('error/403', {
  //       state: {
  //         status_code: 403,
  //       },
  //     });
  // }, [user, isAllowed, currentRoute]);

  return (
    <>
      <FloatButton.BackTop />
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout hasSider>
        <Layout style={{ margin: '0', minHeight: '89vh' }}>
          <Content style={{ margin: '0', overflow: 'initial' }}>
            <Row>
              <Col span={3}></Col>
              <Col span={18}>{outlet}</Col>
              <Col span={3}></Col>
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
