import CTTable from 'components/shared/CTTable';
import { deleteBlogs, exportBlogs, getBlogList, toggleBlogsActive } from '../service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { useNavigate } from 'react-router-dom';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { Typography } from 'antd';
import useGetList from 'hooks/useGetList';
import useCurrentPage from 'hooks/useCurrentPage';
const { Text } = Typography;
function BlogTable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentRoute } = useCurrentPage({ isPaging: false });

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

  const {
    data: { totalItems, itemPerPage, list, page },
    queryKey: queryKeyGetBlogList,
    isLoading,
  } = useGetList({ func: getBlogList });

  const mutationDeleteBlogs = useMutation({
    mutationFn: deleteBlogs,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({
        queryKey: queryKeyGetBlogList,
      });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteBlogs.mutate({ ids });
  };

  const mutationToggleBlogsActive = useMutation({
    mutationFn: toggleBlogsActive,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      toast.success('Update activate status success!');
      await queryClient.invalidateQueries({
        queryKey: queryKeyGetBlogList,
      });
    },
  });
  const handleToggleBlogsActive = async ({ ids = [], is_active }) =>
    mutationToggleBlogsActive.mutate({ blog_ids: ids, is_active });

  const handleExportExcel = async (ids = []) => exportBlogs({ ids });

  return (
    <>
      <CTTable
        loading={isLoading}
        rowKey={'blog_id'}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        columns={columns}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        onGlobalExport={handleExportExcel}
        onGlobalToggleActive={handleToggleBlogsActive}
        globalActions={[
          {
            content: 'Create',
            onClick: () => navigate(`${currentRoute}/create`),
          },
        ]}
      />
    </>
  );
}

export default BlogTable;
