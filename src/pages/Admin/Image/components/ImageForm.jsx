import { Card, Col, Collapse, Row } from 'antd';
import CTForm from 'components/shared/CTForm';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'common/utils';
import { useMutation } from '@tanstack/react-query';
import { uploadImages } from '../service';
import ImageUpload from './ImageUpload';
import { toFormData } from 'common/utils/file.util';

function ImageForm() {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const onSubmit = async (values) => {
    const formData = toFormData(values.file_list.map((item) => item.originFileObj));
    mutationUploadImages.mutate(formData);
  };

  const mutationUploadImages = useMutation({
    mutationFn: uploadImages,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      return toast.success(`Upload successful`);
    },
  });
  const formItems = [
    {
      render: () => {
        return (
          <Collapse
            defaultActiveKey={'1'}
            items={[
              {
                key: '1',
                label: 'Image Upload',
                children: (
                  <>
                    <ImageUpload />
                  </>
                ),
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <Row justify={'center'}>
          <Col span={20}>
            <Card style={{ width: '100%' }}>
              <CTForm name='image-form' items={formItems} global_control={control} onSubmit={handleSubmit(onSubmit)} />
            </Card>
          </Col>
        </Row>
      </FormProvider>
    </>
  );
}

export default ImageForm;
