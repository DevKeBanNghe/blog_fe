import CTTable from 'components/shared/CTTable';
import { deleteTags, exportTags, getTagList, toggleTagsActive } from '../service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { forwardRef, useImperativeHandle } from 'react';
import useGetList from 'hooks/useGetList';

function TagTableRef(props, ref) {
  const queryClient = useQueryClient();

  const {
    data: { totalItems, itemPerPage, list, page },
    queryKey: queryKeyGetTagList,
    isLoading,
  } = useGetList({ func: getTagList });

  useImperativeHandle(ref, () => ({
    queryKey: queryKeyGetTagList,
  }));

  const mutationDeleteTags = useMutation({
    mutationFn: deleteTags,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({
        queryKey: queryKeyGetTagList,
      });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteTags.mutate({ ids });
  };

  const mutationToggleTagsActive = useMutation({
    mutationFn: toggleTagsActive,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      toast.success('Update activate status success!');
      await queryClient.invalidateQueries({
        queryKey: queryKeyGetTagList,
      });
    },
  });
  const handleToggleTagsActive = async ({ ids = [], is_active }) =>
    mutationToggleTagsActive.mutate({ tag_ids: ids, is_active });

  const handleExportExcel = async (ids = []) => exportTags({ ids });

  return (
    <>
      <CTTable
        rowKey={'tag_id'}
        loading={isLoading}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        onGlobalExport={handleExportExcel}
        onGlobalToggleActive={handleToggleTagsActive}
      />
    </>
  );
}

const TagTable = forwardRef(TagTableRef);

export default TagTable;
