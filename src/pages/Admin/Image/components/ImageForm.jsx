import { Card, Col, Row } from 'antd';
import CTForm from 'components/shared/CTForm';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'common/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadImages } from '../service';
import ImageUpload from './ImageUpload';
import { toFormData } from 'common/utils/file.util';
import { forwardRef, useImperativeHandle } from 'react';

function ImageFormRef({ isModal = false, queryKeyFetchListTable }, ref) {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const onSubmit = async ({ file_list = [] }) => {
    if (file_list.length === 0) return toast.error('Images upload is empty!');
    const formData = toFormData(file_list.map((item) => item.originFileObj));
    mutationUploadImages.mutate(formData);
  };

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onSubmit),
  }));

  const queryClient = useQueryClient();
  const mutationUploadImages = useMutation({
    mutationFn: uploadImages,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      queryClient.invalidateQueries({ queryKey: queryKeyFetchListTable });
      return toast.success(`Upload successful`);
    },
  });

  const formItems = [
    {
      render: () => <ImageUpload />,
    },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <Row justify={'center'}>
          <Col span={20}>
            <Card style={{ width: '100%' }}>
              <CTForm
                name='image-form'
                items={formItems}
                global_control={control}
                onSubmit={handleSubmit(onSubmit)}
                isShowActionDefault={isModal ? false : true}
              />
            </Card>
          </Col>
        </Row>
      </FormProvider>
    </>
  );
}

const ImageForm = forwardRef(ImageFormRef);

export default ImageForm;
