import { Flex, Col, Row, Image } from 'antd';
import TabHeader from './TabHeader';
import SearchBar from './SearchBar';
import Logo from 'images/logo.png';
import { useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';
import { useRef } from 'react';
import Breadcrumb from 'layouts/Breadcrumb';
import useCurrentPage from 'hooks/useCurrentPage';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import useScroll from 'hooks/useScroll';
import Sign from './Sign';
import Events from './Events';
export default function Header() {
  const navigate = useNavigate();
  const user = useUser();
  const headerRef = useRef();
  const { currentRoute } = useCurrentPage({ isPaging: false });
  const isAccessAdminPage = currentRoute.includes(PREFIX_ADMIN_PAGE);
  const { isScroll } = useScroll();

  return (
    <>
      <Row
        ref={headerRef}
        style={{
          background: '#f5f5f5',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          paddingBottom: '10px',
          boxShadow: isScroll ? '0 0 7px 0 #9f9d9d' : '',
        }}
      >
        <Col span={8}></Col>
        <Col span={8}>
          <Flex align='center' vertical>
            <Image preview={false} style={{ cursor: 'pointer' }} width={90} src={Logo} onClick={() => navigate('/')} />
            <h2 style={{ margin: '0' }}>Dev Kể Bạn Nghe</h2>
          </Flex>
        </Col>

        <Col span={8}>
          {user.user_name ? <Events /> : <Sign />}
          <SearchBar style={{ position: 'absolute', top: '80px', right: '30px', width: '80%' }} />
        </Col>
        <Col span={2}></Col>
        {isAccessAdminPage ? <TabHeader /> : <Breadcrumb />}
      </Row>
    </>
  );
}
