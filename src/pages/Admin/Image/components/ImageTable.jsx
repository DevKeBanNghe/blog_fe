import CTTable from 'components/shared/CTTable';
import { deleteImages, exportImages, getImageList, toggleImagesActive } from '../service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { Image } from 'antd';
import useGetList from 'hooks/useGetList';
import { forwardRef, useImperativeHandle } from 'react';

function ImageTableRef(props, ref) {
  const queryClient = useQueryClient();
  const columns = [
    {
      title: 'Image Picture',
      dataIndex: 'image_picture',
      key: 'image_picture',
      isViewDefault: true,
      render: (value, record) => {
        return <Image width={120} src={record.image_url} />;
      },
    },
  ];

  const {
    data: { totalItems, itemPerPage, list, page },
    queryKey: queryKeyGetImageList,
    isLoading,
  } = useGetList({ func: getImageList });

  useImperativeHandle(ref, () => ({
    queryKey: queryKeyGetImageList,
  }));

  const mutationDeleteImages = useMutation({
    mutationFn: deleteImages,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({ queryKey: queryKeyGetImageList });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteImages.mutate({ ids });
  };

  const mutationToggleImagesActive = useMutation({
    mutationFn: toggleImagesActive,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      toast.success('Update activate status success!');
      await queryClient.invalidateQueries({
        queryKey: queryKeyGetImageList,
      });
    },
  });
  const handleToggleImagesActive = async ({ ids = [], is_active }) =>
    mutationToggleImagesActive.mutate({ image_ids: ids, is_active });

  const handleExportExcel = async (ids = []) => exportImages({ ids });

  return (
    <>
      <CTTable
        rowKey={'image_id'}
        loading={isLoading}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        columns={columns}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        onGlobalExport={handleExportExcel}
        onGlobalToggleActive={handleToggleImagesActive}
        actions={[
          { type: 'copy', hidden: true },
          { type: 'view', hidden: true },
          { type: 'edit', hidden: true },
        ]}
      />
    </>
  );
}

const ImageTable = forwardRef(ImageTableRef);

export default ImageTable;
