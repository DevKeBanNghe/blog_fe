import { Col, Flex, Layout, Row } from 'antd';
import YoutubeChannel from 'components/shared/YoutubeSubscribe';
import Socials from './Socials';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
import { useForm } from 'react-hook-form';
import { getCurrentYear, toast } from 'common/utils';
import { useMutation } from '@tanstack/react-query';
import { subscribeToBlogs } from 'pages/User/Blog/service';
import CTForm from 'components/shared/CTForm';
import { Typography } from 'antd';
import CTInput from 'components/shared/CTInput';
import CTButton from 'components/shared/CTButton';
const { Title } = Typography;

const { Footer: FooterLayout } = Layout;

const Footer = () => {
  const {
    control,
    reset,
    formState: { errors: formStateErrors },
    handleSubmit,
  } = useForm();

  const mutationSubscribe = useMutation({
    mutationFn: subscribeToBlogs,
    onSuccess: async ({ errors }) => {
      if (errors) return toast.error(errors);
      reset();
      toast.success(`Subscribe success`);
    },
  });

  const onSubscribe = (values) => mutationSubscribe.mutate(values);
  const isDisabledSubscribe = mutationSubscribe.isPending;

  const formItems = [
    {
      field: 'user_email',
      rules: {
        required: 'Email không hợp lệ!',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Email không hợp lệ!',
        },
      },
      render: ({ field }) => {
        return (
          <Flex gap={'small'} justify='right'>
            <CTInput
              formStateErrors={formStateErrors}
              {...field}
              placeholder={'Đăng kí gmail nhận bài viết sớm nhất'}
            />
            <CTButton disabled={isDisabledSubscribe} size='large' htmlType={'submit'}>
              Subscribe
            </CTButton>
          </Flex>
        );
      },
    },
  ];

  return (
    <FooterLayout style={{ bottom: 0 }}>
      <hr />
      <Row>
        <Col xs={0} md={7}>
          <YoutubeChannel />
        </Col>
        <Col xs={24} md={10}>
          <Socials />
          <Title
            style={{ textAlign: 'center' }}
            level={5}
          >{`© ${getCurrentYear()} ${PERSONAL_BRAND}. All rights reserved.`}</Title>
        </Col>
        <Col xs={24} md={7}>
          <CTForm
            name='subscribe-form'
            items={formItems}
            global_control={control}
            isShowActionDefault={false}
            onSubmit={handleSubmit(onSubscribe)}
            disabled={isDisabledSubscribe}
          />
        </Col>
      </Row>
    </FooterLayout>
  );
};
export default Footer;
