import CTTable from 'components/shared/CTTable';
import useQueryKeys from 'hooks/useQueryKeys';
import { deleteImages, getImageList } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'common/utils';
import { useNavigate } from 'react-router-dom';
import useCurrentPage from 'hooks/useCurrentPage';
import { STALE_TIME_GET_LIST } from 'common/consts/react-query.const';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { Image } from 'antd';
import { DEFAULT_PAGINATION } from 'common/consts/constants.const';
import { useState } from 'react';

function ImageTable() {
  const navigate = useNavigate();
  const { keyImageList: keyImageList } = useQueryKeys({ prefix: 'imageList' });
  const queryClient = useQueryClient();
  const { currentRoute } = useCurrentPage({ isPaging: false });
  const [imageListParams, setImageListParams] = useState(DEFAULT_PAGINATION);

  const columns = [
    {
      title: 'Image Name',
      width: 50,
      dataIndex: 'image_name',
      key: 'image_name',
      fixed: 'left',
    },
    {
      title: 'Image Url',
      width: 50,
      dataIndex: 'image_url',
      key: 'image_url',
    },
    {
      title: 'Image Picture',
      width: 50,
      dataIndex: 'image_url',
      key: 'image_url',
      render: (value) => {
        return <Image width={120} src={value} />;
      },
    },
    {
      title: 'Image Description',
      width: 50,
      dataIndex: 'image_description',
      key: 'image_description',
      render: (value) => {
        return <CTTextTruncate>{value}</CTTextTruncate>;
      },
    },
  ];

  const mutationDeleteImages = useMutation({
    mutationFn: deleteImages,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      await queryClient.fetchQuery({
        queryKey: [`${keyImageList}`, imageListParams],
      });
      toast.success('Delete success');
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteImages.mutate({ ids });
  };

  const { data: queryGetImageListData = {} } = useQuery({
    queryKey: [`${keyImageList}`, imageListParams],
    queryFn: () => getImageList(imageListParams),
    staleTime: STALE_TIME_GET_LIST,
  });
  const { data, errors } = queryGetImageListData;
  if (errors) toast.error(errors);
  const { totalItems, itemPerPage, list, page } = data ?? {};

  return (
    <>
      <CTTable
        rowKey={'image_id'}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        rows={list}
        columns={columns}
        onChange={({ current: page }) => {
          setImageListParams((prev) => ({ ...prev, page }));
        }}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        globalActions={[
          {
            content: 'Create',
            onClick: () => navigate(`${currentRoute}/create`),
          },
        ]}
        onSearch={(value) => setImageListParams((prev) => ({ ...prev, search: value }))}
        onRefresh={() => queryClient.invalidateQueries({ queryKey: [`${keyImageList}`] })}
      />
    </>
  );
}

export default ImageTable;
