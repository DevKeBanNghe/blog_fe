import { Flex, Col, Row, Image } from 'antd';
import TabHeader from './TabHeader';
import SearchBar from './SearchBar';
import Logo from 'images/logo.png';
import { useNavigate } from 'react-router-dom';
// import useUser from 'hooks/useUser';
import { useRef } from 'react';
import Breadcrumb from 'layouts/Breadcrumb';
import useCurrentPage from 'hooks/useCurrentPage';
import { PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import Socials from 'layouts/Socials';
// import Sign from './Sign';
// import Events from './Events';
export default function Header() {
  const navigate = useNavigate();
  // const user = useUser();
  const headerRef = useRef();
  const { currentRoute } = useCurrentPage({ isPaging: false });
  const isAccessAdminPage = currentRoute.includes(PREFIX_ADMIN_PAGE);
  const handleSearch = (value) => {
    console.log('🚀 ~ handleSearch ~ value:', value);
  };

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
          borderBottom: '1px solid #ccc',
        }}
      >
        <Col span={4}></Col>
        <Col span={4}>
          <Image preview={false} style={{ cursor: 'pointer' }} width={90} src={Logo} onClick={() => navigate('/')} />
          <h2 style={{ margin: '0' }}>Dev Kể Bạn Nghe</h2>
        </Col>
        <Col span={4}></Col>
        <Col span={8}>
          <Flex gap={'middle'} vertical style={{ position: 'absolute', bottom: '0', right: '0', width: '100%' }}>
            <Socials />
            <SearchBar onSearch={handleSearch} />
          </Flex>
        </Col>
        <Col span={4}></Col>
        <Col span={3}></Col>
        {/* <Col span={8}>{user.user_name ? <Events /> : <Sign />}</Col> */}
        <Col span={12}>{isAccessAdminPage ? <TabHeader /> : <Breadcrumb style={{ marginTop: '15px' }} />}</Col>
      </Row>
    </>
  );
}
