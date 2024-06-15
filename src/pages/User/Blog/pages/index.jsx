import { Col, Row } from 'antd';
import BlogItem from '../components/BlogItem';
import CTList from 'components/shared/CTList';
import { toast } from 'common/utils';
import useCurrentPage from 'hooks/useCurrentPage';
import { useQuery } from '@tanstack/react-query';
import useQueryKeys from 'hooks/useQueryKeys';
import { STALE_TIME_GET_LIST } from 'common/consts/react-query.const';
import { getBlogListForUser } from '../service';

const Blogs = () => {
  const { keyList } = useQueryKeys();
  const { queryParams, setQueryParams } = useCurrentPage();

  const { data: queryGetBlogListData = {} } = useQuery({
    queryKey: [`${keyList}-${queryParams.page}`],
    queryFn: () => getBlogListForUser(queryParams),
    staleTime: STALE_TIME_GET_LIST,
  });
  const { data, errors } = queryGetBlogListData;
  if (errors) toast.error(errors);
  const { totalItems, itemPerPage, list = [], page: currentPage } = data ?? {};

  return (
    <Row justify={'center'}>
      <Col span={16}>
        <CTList
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
