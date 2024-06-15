import CTTable from 'components/shared/CTTable';
import useQueryKeys from 'hooks/useQueryKeys';
import { deleteTags, getTagList } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { useNavigate } from 'react-router-dom';
import useCurrentPage from 'hooks/useCurrentPage';
import { STALE_TIME_GET_LIST } from 'common/consts/react-query.const';
import CTTextTruncate from 'components/shared/CTTextTruncate';

function TagTable() {
  const navigate = useNavigate();
  const { keyList } = useQueryKeys();
  const queryClient = useQueryClient();
  const { id: currentTagId, queryParams, setQueryParams, queryParamsString, currentRoute } = useCurrentPage();

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
    onSuccess: async ({ errors }, { ids }) => {
      if (errors) return toast.error(errors);
      toast.success('Delete success');
      if (ids.includes(parseInt(currentTagId))) {
        return navigate(`${currentRoute}${queryParamsString}`);
      }
      await queryClient.fetchQuery({
        queryKey: [`${keyList}-${queryParams.page}`],
      });
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteTags.mutate({ ids });
  };

  const { data: queryGetTagListData = {} } = useQuery({
    queryKey: [`${keyList}-${queryParams.page}`],
    queryFn: () => getTagList(queryParams),
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
          setQueryParams((prev) => ({ ...prev, page }));
        }}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        onView={({ tag_id }) => navigate(`${currentRoute}/${tag_id}${queryParamsString}`)}
        onEdit={({ tag_id }) => navigate(`${currentRoute}/edit/${tag_id}${queryParamsString}`)}
        onCopy={({ tag_id }) => navigate(`${currentRoute}/copy/${tag_id}${queryParamsString}`)}
        onDelete={({ tag_id }) => handleDeleteAll([tag_id])}
        onCreateGlobal={() => navigate(`${currentRoute}/create`)}
      />
    </>
  );
}

export default TagTable;
