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

function ImageTable() {
  const navigate = useNavigate();
  const { keyList } = useQueryKeys();
  const queryClient = useQueryClient();
  const { id: currentImageId, queryParams, setQueryParams, queryParamsString, currentRoute } = useCurrentPage();

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
    onSuccess: async ({ errors }, { ids }) => {
      if (errors) return toast.error(errors);
      toast.success('Delete success');
      if (ids.includes(parseInt(currentImageId))) {
        return navigate(`${currentRoute}${queryParamsString}`);
      }
      await queryClient.fetchQuery({
        queryKey: [`${keyList}-${queryParams.page}`],
      });
    },
  });

  const handleDeleteAll = async (ids = []) => {
    mutationDeleteImages.mutate({ ids });
  };

  const { data: queryGetImageListData = {} } = useQuery({
    queryKey: [`${keyList}-${queryParams.page}`],
    queryFn: () => getImageList(queryParams),
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
          setQueryParams((prev) => ({ ...prev, page }));
        }}
        currentPage={page}
        onGlobalDelete={handleDeleteAll}
        onCreateGlobal={() => navigate(`${currentRoute}/create`)}
        actions={[{ type: 'delete' }]}
      />
    </>
  );
}

export default ImageTable;
