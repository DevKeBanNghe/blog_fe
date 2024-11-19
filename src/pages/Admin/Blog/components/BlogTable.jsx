import CTTable from 'components/shared/CTTable';
import useQueryKeys from 'hooks/useQueryKeys';
import { deleteBlogs, getBlogList } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { useNavigate } from 'react-router-dom';
import useCurrentPage from 'hooks/useCurrentPage';
import { STALE_TIME_GET_LIST } from 'common/consts/react-query.const';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { Typography } from 'antd';
import { DEFAULT_PAGINATION } from 'common/consts/constants.const';
import { useState } from 'react';
const { Text } = Typography;
function BlogTable() {
  const navigate = useNavigate();
  const { keyList: keyBlogList } = useQueryKeys({ prefix: 'blogList' });
  const queryClient = useQueryClient();
  const { currentRoute } = useCurrentPage({ isPaging: false });
  const [blogListParams, setBlogListParams] = useState(DEFAULT_PAGINATION);

  const columns = [
    {
      title: 'Blog Title',
      width: 50,
      dataIndex: 'blog_title',
      key: 'blog_title',
      fixed: 'left',
    },
    {
      title: 'Blog Publish Status',
      width: 50,
      dataIndex: 'blog_is_publish',
      key: 'blog_is_publish',
      render: (is_publish) => {
        const textProps = {
          type: 'success',
          content: 'Publish',
        };
        if (!is_publish) {
          textProps.type = 'danger';
          textProps.content = 'Unpublish';
        }
        return (
          <Text strong type={textProps.type}>
            {textProps.content}
          </Text>
        );
      },
    },
    {
      title: 'Blog Description',
      width: 50,
      dataIndex: 'blog_description',
      key: 'blog_description',
      render: (value) => {
        return <CTTextTruncate>{value}</CTTextTruncate>;
      },
    },
  ];

  const mutationDeleteBlogs = useMutation({
    mutationFn: deleteBlogs,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({
        queryKey: [`${keyBlogList}`, blogListParams],
      });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteBlogs.mutate({ ids });
  };

  const { data: queryGetBlogListData = {} } = useQuery({
    queryKey: [`${keyBlogList}`, blogListParams],
    queryFn: () => getBlogList(blogListParams),
    staleTime: STALE_TIME_GET_LIST,
  });
  const { data, errors } = queryGetBlogListData;
  if (errors) toast.error(errors);
  const { totalItems, itemPerPage, list, page } = data ?? {};

  return (
    <>
      <CTTable
        rowKey={'blog_id'}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        columns={columns}
        onChange={({ current: page }) => setBlogListParams((prev) => ({ ...prev, page }))}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        globalActions={[
          {
            content: 'Create',
            onClick: () => navigate(`${currentRoute}/create`),
          },
        ]}
        onSearch={(value) => setBlogListParams((prev) => ({ ...prev, search: value }))}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: [`${keyBlogList}`] })}
      />
    </>
  );
}

export default BlogTable;
