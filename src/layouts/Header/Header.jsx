import { Flex, Col, Row, Image } from 'antd';
import TabHeader from './TabHeader';
import SearchBar from './SearchBar';
import Logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
// import useUser from 'hooks/useUser';
import { useEffect, useRef } from 'react';
import useCurrentPage from 'hooks/useCurrentPage';
import { PERSONAL_BRAND, PREFIX_ADMIN_PAGE } from 'common/consts/constants.const';
import Socials from 'layouts/Socials';
import { Controller, useForm } from 'react-hook-form';
// import Sign from './Sign';
// import Events from './Events';
export default function Header() {
  const navigate = useNavigate();
  // const user = useUser();
  const { control, setValue } = useForm();
  const headerRef = useRef();
  const { currentRoute, queryParamsString, setQueryParams, queryParams } = useCurrentPage({ isPaging: false });
  const isAccessAdminPage = currentRoute.includes(PREFIX_ADMIN_PAGE);
  const handleSearch = (value) => {
    setQueryParams((prev) => ({ ...prev, search: value }));
  };

  useEffect(() => {
    if (queryParams.search) {
      setValue('search', queryParams.search);
    }
  }, [queryParams]);

  const handlePageReset = () => {
    navigate(`/${queryParamsString}`);
    handleSearch('');
    setValue('search', '');
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
      >
        <Col span={4}></Col>
        <Col span={4}>
          <Flex>
            <Image preview={false} style={{ cursor: 'pointer' }} width={75} src={Logo} onClick={handlePageReset} />
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
          </Flex>
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
            <Col span={2}></Col>
            <Col span={10} style={{ display: 'flex' }}>
              <Flex gap={'middle'} style={{ width: '100%' }} align='center' justify='space-around'>
                <Socials />
                <Controller
                  name='search'
                  control={control}
                  render={({ field }) => <SearchBar {...field} onSearch={handleSearch} />}
                />
              </Flex>
            </Col>
            <Col span={4}></Col>
            {/* <Col span={8}>{user.user_name ? <Events /> : <Sign />}</Col> */}
          </>
        )}
      </Row>
    </>
  );
}
