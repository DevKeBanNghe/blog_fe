import { Card, Col, Row } from 'antd';
import CTForm from 'components/shared/CTForm';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'common/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTag, getTagDetail, importUrl, updateTag } from '../service';
import { DEFAULT_PAGINATION } from 'common/consts/constants.const';
import CTInputTextArea from 'components/shared/CTInput/TextArea';
import useCurrentPage from 'hooks/useCurrentPage';
import useGetDetail from 'hooks/useGetDetail';
import CTUploadButton from 'components/shared/CTButton/CTUploadButton';
import { REQUIRED_FIELD_TEMPLATE } from 'common/templates/rules.template';

function TagFormRef({ isModal = false, queryKeyFetchListTable }, ref) {
  const { id: currentTagId, isEdit, setQueryParams, isCopy } = useCurrentPage({ isPaging: false });

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onSubmit),
  }));

  const { control, handleSubmit, reset, setFocus } = useForm();
  const onSubmit = async (values) => {
    if (isCopy) delete values.tag_id;
    const payload = { ...values };
    currentTagId && isEdit
      ? mutationUpdateTags.mutate({ ...payload, tag_id: currentTagId })
      : mutationCreateTags.mutate(payload);
  };

  const queryClient = useQueryClient();
  const handleSubmitSuccess = ({ errors }) => {
    if (errors) return toast.error(errors);
    toast.success(`${currentTagId && isEdit ? 'Update' : 'Create'} successful`);
    setQueryParams((prev) => ({ ...prev, ...DEFAULT_PAGINATION }));
    queryClient.invalidateQueries({ queryKey: queryKeyFetchListTable });
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

  const handleImport = ({ file }) => {
    if (file.status === 'done') {
      toast.success(`${file.name} file uploaded successfully`);
      queryClient.invalidateQueries({ queryKey: queryKeyFetchListTable });
    } else if (file.status === 'error') {
      toast.error(`${file.name} file upload failed.`);
    }
  };

  const formItems = [
    {
      render: () => {
        return <CTUploadButton content='Import' apiUrl={importUrl} onChange={handleImport} />;
      },
    },
    {
      field: 'tag_name',
      rules: {
        required: REQUIRED_FIELD_TEMPLATE,
      },
      render: ({ field }) => {
        return <CTInputTextArea {...field} placeholder={'Tag name'} />;
      },
    },
    {
      field: 'tag_description',
      render: ({ field }) => {
        return <CTInputTextArea {...field} placeholder={'Tag description'} />;
      },
    },
  ];

  const { data: dataGetTagDetail } = useGetDetail({ func: getTagDetail });
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
              isShowActionDefault={isModal ? false : true}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

const TagForm = forwardRef(TagFormRef);

export default TagForm;
