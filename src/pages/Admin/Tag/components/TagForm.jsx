import { Card, Col, Row } from 'antd';
import CTForm from 'components/shared/CTForm';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'common/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTag, getTagDetail, updateTag } from '../service';
import { DEFAULT_PAGINATION } from 'common/consts/constants.const';
import useQueryKeys from 'hooks/useQueryKeys';
import CTInput from 'components/shared/CTInput';
import useCurrentPage from 'hooks/useCurrentPage';

function TagFormRef({ isShowDefaultActions = true, isFormModal = !isShowDefaultActions }, ref) {
  const { keyList, keyDetail } = useQueryKeys({ prefix: isFormModal ? 'tag_modal' : '' });
  const { id: currentTagId, isEdit, setQueryParams, isCopy } = useCurrentPage({ isPaging: false });

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onSubmit),
  }));

  const { control, handleSubmit, reset, setFocus } = useForm();
  const onSubmit = async (values) => {
    if (isCopy) delete values.tag_id;
    const payload = { ...values };
    currentTagId && isEdit && !isFormModal
      ? mutationUpdateTags.mutate({ ...payload, tag_id: currentTagId })
      : mutationCreateTags.mutate(payload);
  };

  const queryClient = useQueryClient();
  const handleSubmitSuccess = ({ errors }) => {
    if (errors) return toast.error(errors);
    toast.success(`${currentTagId && isEdit ? 'Update' : 'Create'} successful`);
    setQueryParams((prev) => ({ ...prev, ...DEFAULT_PAGINATION }));
    queryClient.invalidateQueries({ queryKey: [`${keyList}-${DEFAULT_PAGINATION.page}`] });
  };
  const mutationCreateTags = useMutation({
    mutationFn: createTag,
    onSuccess: async (data) => {
      if (!data.errors) reset();
      handleSubmitSuccess(data);
    },
  });
  const mutationUpdateTags = useMutation({
    mutationFn: updateTag,
    onSuccess: handleSubmitSuccess,
  });
  const formItems = [
    {
      field: 'tag_name',
      render: ({ field }) => {
        return <CTInput {...field} placeholder={'Tag name'} />;
      },
    },
    {
      field: 'tag_description',
      render: ({ field }) => {
        return <CTInput {...field} placeholder={'Tag description'} />;
      },
    },
  ];

  const { data: queryGetTagDetail = {} } = useQuery({
    queryKey: [`${keyDetail}`, currentTagId],
    queryFn: () => getTagDetail(currentTagId),
    enabled: currentTagId && !isFormModal ? true : false,
  });
  const { data: dataGetTagDetail } = queryGetTagDetail;

  useEffect(() => {
    if (!dataGetTagDetail) return () => {};
    setFocus('tag_name');
    reset(dataGetTagDetail);
  }, [dataGetTagDetail]);

  return (
    <>
      <Row justify={'center'}>
        <Col span={20}>
          <Card style={{ width: '100%' }}>
            <CTForm
              name='tag-form'
              items={formItems}
              global_control={control}
              onSubmit={handleSubmit(onSubmit)}
              isShowDefaultActions={isShowDefaultActions}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

const TagForm = forwardRef(TagFormRef);

export default TagForm;
