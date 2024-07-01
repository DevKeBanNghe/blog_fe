import { Flex, Col, Row, Image } from 'antd';
import TabHeader from './TabHeader';
import SearchBar from './SearchBar';
import Logo from '/logo.png';
// import useUser from 'hooks/useUser';
import { useEffect, useRef } from 'react';
import useCurrentPage from 'hooks/useCurrentPage';
import { PERSONAL_BRAND, PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import Socials from 'layouts/Socials';
import { Controller, useForm } from 'react-hook-form';
import usePageRedirect from 'hooks/usePageRedirect';
// import Sign from './Sign';
// import Events from './Events';
export default function Header() {
  // const user = useUser();
  const { control, setValue } = useForm();
  const headerRef = useRef();
  const { currentRoute, setQueryParams, queryParams } = useCurrentPage({ isPaging: false });
  const isAccessAdminPage = currentRoute.includes(PREFIX_ADMIN_PAGE);
  const { goToHomePage } = usePageRedirect();
  const handleSearch = (value = '') => {
    setQueryParams((prev) => ({ ...prev, search: value }));
  };

  useEffect(() => {
    setValue('search', queryParams.search);
  }, [queryParams]);

  const handlePageReset = () => {
    goToHomePage();
    handleSearch();
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
          borderBottom: '1px solid #ccc',
        }}
        justify={'center'}
        align='middle'
      >
        <Col xs={0} span={4}></Col>
        <Col xs={3} md={1}>
          <Image preview={false} style={{ cursor: 'pointer' }} width={75} src={Logo} onClick={handlePageReset} />
        </Col>
        <Col xs={12} md={3}>
          <h2
            onClick={handlePageReset}
            style={{
              margin: '0',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {PERSONAL_BRAND}
          </h2>
        </Col>

        {isAccessAdminPage ? (
          <>
            <Col span={16}></Col>
            <Col span={24}>
              <Flex align='center' justify='center'>
                <TabHeader />
              </Flex>
            </Col>
          </>
        ) : (
          <>
            <Col span={1}></Col>
            <Col xs={0} md={4}>
              <Socials />
            </Col>
            <Col xs={16} md={5}>
              <Controller
                name='search'
                control={control}
                render={({ field }) => <SearchBar {...field} onSearch={handleSearch} />}
              />
            </Col>

            <Col xs={0} span={4}></Col>
            {/* <Col span={8}>{user.user_name ? <Events /> : <Sign />}</Col> */}
          </>
        )}
      </Row>
    </>
  );
}
