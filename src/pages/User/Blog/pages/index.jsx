import { Col, Row } from 'antd';
import BlogItem from '../components/BlogItem';
import CTList from 'components/shared/CTList';
import useCurrentPage from 'hooks/useCurrentPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBlogList } from 'common/reducers/blog/blog.action';
import useBlogList from '../hooks/useBlogList';
import { LOADING_STATUS } from 'common/consts/constants.const';

const Blogs = () => {
  const { queryParams, setQueryParams } = useCurrentPage();
  const dispatch = useDispatch();
  const { totalItems, itemPerPage, list = [], page: currentPage, loading } = useBlogList();
  const isLoading = loading === LOADING_STATUS.PENDING;

  useEffect(() => {
    dispatch(getBlogList(queryParams));
  }, [queryParams]);

  return (
    <Row justify={'center'}>
      <Col span={16}>
        <CTList
          loading={isLoading}
          itemLayout='vertical'
          size='large'
          pagination={{
            align: 'center',
            onChange: (page) => {
              setQueryParams((prev) => ({ ...prev, page }));
            },
            pageSize: itemPerPage,
            total: totalItems,
            current: currentPage,
            showQuickJumper: true,
          }}
          list={list}
          bordered={false}
          renderItem={(item) => <BlogItem {...item} />}
        />
      </Col>
    </Row>
  );
};
export default Blogs;
