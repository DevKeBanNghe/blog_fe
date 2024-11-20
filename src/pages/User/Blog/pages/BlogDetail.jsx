import { useMutation, useQuery } from '@tanstack/react-query';
import useCurrentPage from 'hooks/useCurrentPage';
import useQueryKeys from 'hooks/useQueryKeys';
import { getBlogDetailForUser, updateBlogTrackingInfo } from '../service';
import CTMarkdown from 'components/shared/CTMarkdown';
import BlogTags from '../components/BlogTags';
import { useEffect, useMemo } from 'react';
import { Col, Row } from 'antd';
import { toast } from 'common/utils';
import { styled } from 'styled-components';
import usePageRedirect from 'hooks/usePageRedirect';

const RowStyled = styled(Row)`
  * :not(h1, h2) {
    font-size: large;
  }
`;

export default function BlogDetail() {
  const { keyDetail } = useQueryKeys();
  const { id: currentBlogId } = useCurrentPage({
    isPaging: false,
    customIdParams: (id) => {
      const indexLastDash = id.lastIndexOf('-');
      if (indexLastDash < 0) return id;
      return id.slice(indexLastDash + 1);
    },
  });

  const { data: queryGetBlogDetail = {}, isFetched } = useQuery({
    queryKey: [keyDetail, currentBlogId],
    queryFn: () => getBlogDetailForUser(currentBlogId),
    enabled: currentBlogId ? true : false,
  });
  const { data: dataGetBlogDetail } = queryGetBlogDetail;
  const blog_tags = useMemo(() => {
    if (!dataGetBlogDetail) return [];
    return dataGetBlogDetail.Tag?.map((item) => item.tag_name);
  }, [dataGetBlogDetail]);

  const mutationUpdateBlogTrackingInfo = useMutation({
    mutationFn: updateBlogTrackingInfo,
    onSuccess: ({ errors }) => {
      if (errors) return toast.error(errors);
    },
  });

  const { goToHomePage } = usePageRedirect();
  useEffect(() => {
    if (!isFetched) return;
    if (!dataGetBlogDetail?.blog_is_publish) return goToHomePage();
    mutationUpdateBlogTrackingInfo.mutate({ blog_id: currentBlogId });
  }, [dataGetBlogDetail]);

  return (
    <>
      <RowStyled justify={'center'}>
        <Col span={20}>
          <BlogTags list={blog_tags} />
          <CTMarkdown>{dataGetBlogDetail?.blog_content}</CTMarkdown>
        </Col>
      </RowStyled>
    </>
  );
}
