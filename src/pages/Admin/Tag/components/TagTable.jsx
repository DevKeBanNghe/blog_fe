import CTTable from 'components/shared/CTTable';
import useQueryKeys from 'hooks/useQueryKeys';
import { deleteTags, getTagList } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { useNavigate } from 'react-router-dom';
import useCurrentPage from 'hooks/useCurrentPage';
import { STALE_TIME_GET_LIST } from 'common/consts/react-query.const';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { DEFAULT_PAGINATION } from 'common/consts/constants.const';
import { useState } from 'react';

function TagTable() {
  const navigate = useNavigate();
  const { keyTagList: keyTagList } = useQueryKeys({ prefix: 'tagList' });
  const queryClient = useQueryClient();
  const { currentRoute } = useCurrentPage({ isPaging: false });
  const [tagListParams, setTagListParams] = useState(DEFAULT_PAGINATION);

  const columns = [
    {
      title: 'Tag Name',
      width: 50,
      dataIndex: 'tag_name',
      key: 'tag_name',
      fixed: 'left',
    },
    {
      title: 'Tag Description',
      width: 50,
      dataIndex: 'tag_description',
      key: 'tag_description',
      render: (value) => {
        return <CTTextTruncate>{value}</CTTextTruncate>;
      },
    },
  ];

  const mutationDeleteTags = useMutation({
    mutationFn: deleteTags,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({
        queryKey: [`${keyTagList}`, tagListParams],
      });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteTags.mutate({ ids });
  };

  const { data: queryGetTagListData = {} } = useQuery({
    queryKey: [`${keyTagList}`, tagListParams],
    queryFn: () => getTagList(tagListParams),
    staleTime: STALE_TIME_GET_LIST,
  });
  const { data, errors } = queryGetTagListData;
  if (errors) toast.error(errors);
  const { totalItems, itemPerPage, list, page } = data ?? {};

  return (
    <>
      <CTTable
        rowKey={'tag_id'}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        columns={columns}
        onChange={({ current: page }) => {
          setTagListParams((prev) => ({ ...prev, page }));
        }}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        globalActions={[
          {
            content: 'Create',
            onClick: () => navigate(`${currentRoute}/create`),
          },
        ]}
        onSearch={(value) => setTagListParams((prev) => ({ ...prev, page: 1, search: value }))}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: [`${keyTagList}`] })}
      />
    </>
  );
}

export default TagTable;
