import { useQuery } from '@tanstack/react-query';
import useCurrentPage from 'hooks/useCurrentPage';
import useQueryKeys from 'hooks/useQueryKeys';
import { getBlogDetailForUser } from '../service';
import CTMarkdown from 'components/shared/CTMarkdown';
import BlogTags from '../components/BlogTags';
import { useMemo } from 'react';
import { Col, Row } from 'antd';

export default function BlogDetail() {
  const { keyDetail } = useQueryKeys();
  const { id: currentBlogId } = useCurrentPage({ isPaging: false });

  const { data: queryGetBlogDetail = {} } = useQuery({
    queryKey: [keyDetail, currentBlogId],
    queryFn: () => getBlogDetailForUser(currentBlogId),
    enabled: currentBlogId ? true : false,
  });
  const { data: dataGetBlogDetail } = queryGetBlogDetail;
  const blog_tags = useMemo(() => {
    if (!dataGetBlogDetail) return [];
    return dataGetBlogDetail.Tag?.map((item) => item.tag_name);
  }, [dataGetBlogDetail]);

  return (
    <>
      <Row justify={'center'}>
        <Col span={20}>
          <BlogTags list={blog_tags} />
          <CTMarkdown>{dataGetBlogDetail?.blog_content}</CTMarkdown>
        </Col>
      </Row>
    </>
  );
}
