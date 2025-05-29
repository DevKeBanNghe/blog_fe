import { Alert, Card, Col, Collapse, Flex, Row, Switch, Typography } from 'antd';
import CTForm from 'components/shared/CTForm';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import CTModal from 'components/shared/CTModal';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'common/utils';
import { transferToOptionSelect } from 'common/utils/select.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBlog, getBlogDetail, updatePublishBlogStatus, updateBlog } from '../service';
import { DEFAULT_PAGINATION, SELECT_LIMIT_OPTIONS } from 'common/consts/constants.const';
import { PlusCircleFilled } from '@ant-design/icons';
import CTIcon from 'components/shared/CTIcon';
import CTDebounceSelect from 'components/shared/CTDebounceSelect';
import useQueryKeys from 'hooks/useQueryKeys';
import CTInputTextArea from 'components/shared/CTInput/TextArea';
import useCurrentPage from 'hooks/useCurrentPage';
import FormItem from 'antd/es/form/FormItem';
import CTMarkdown from 'components/shared/CTMarkdown';
import TagForm from 'pages/Admin/Tag/components/TagForm';
import { getTagOptions } from 'pages/Admin/Tag/service';
import markdownToTxt from 'markdown-to-txt';
import { REQUIRED_FIELD_TEMPLATE } from 'common/templates/rules.template';
import { BLOG_CONTENT_DEFAULT } from '../const';
const { Link } = Typography;

function BlogFormRef({ isShowActionDefault = true }, ref) {
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const { keyList, keyDetail } = useQueryKeys();
  const { id: currentBlogId, isEdit, setQueryParams, isCopy, isCreate } = useCurrentPage({ isPaging: false });
  const tagFormRef = useRef();
  const [isPreview, setIsPreview] = useState(false);

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit(onSubmit),
  }));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formStateErrors },
    setFocus,
    watch,
  } = useForm({
    defaultValues: {
      blog_content: isCreate ? BLOG_CONTENT_DEFAULT : '',
    },
  });

  const calBlogTimeReadingTime = () => {
    const wordsPerMinute = 200;
    const blogContent = markdownToTxt(watch('blog_content'))?.replaceAll(/\s/g, '');
    return Math.ceil(blogContent.length / wordsPerMinute);
  };

  const onSubmit = async (values) => {
    if (isCopy) delete values.blog_id;
    const payload = { ...values };
    currentBlogId && isEdit
      ? mutationUpdateBlogs.mutate({ ...payload, blog_is_publish: 0, blog_id: currentBlogId })
      : mutationCreateBlogs.mutate({ ...payload, blog_reading_time: calBlogTimeReadingTime() });
  };

  const handleFetchTagOptions = async (value) => {
    const { data, errors } = await queryClient.fetchQuery({
      queryKey: ['tag_options'],
      queryFn: () => getTagOptions({ tag_name: value, limit: SELECT_LIMIT_OPTIONS }),
    });
    if (errors) return toast.error(errors);
    return transferToOptionSelect({ data, value: 'tag_id', label: 'tag_name' });
  };
  const queryClient = useQueryClient();
  const handleSubmitSuccess = ({ errors }) => {
    if (errors) return toast.error(errors);
    toast.success(`${currentBlogId && isEdit ? 'Update' : 'Create'} successful`);
    setQueryParams((prev) => ({ ...prev, ...DEFAULT_PAGINATION }));
    queryClient.invalidateQueries({ queryKey: [`${keyList}-${DEFAULT_PAGINATION.page}`] });
  };
  const mutationCreateBlogs = useMutation({
    mutationFn: createBlog,
    onSuccess: async (data) => {
      if (!data.errors) reset();
      handleSubmitSuccess(data);
    },
  });
  const mutationUpdateBlogs = useMutation({
    mutationFn: updateBlog,
    onSuccess: handleSubmitSuccess,
  });
  const formItems = [
    {
      field: 'blog_title',
      rules: {
        required: REQUIRED_FIELD_TEMPLATE,
      },
      render: ({ field }) => {
        return (
          <>
            <Row>
              <Col span={13}>
                <CTInputTextArea formStateErrors={formStateErrors} {...field} placeholder='Blog Title' />
              </Col>
              <Col span={1}></Col>
              <Col span={10}>
                <Row>
                  <Col span={23}>
                    <Controller
                      control={control}
                      name={'tag_ids'}
                      render={({ field: { value } }) => {
                        return (
                          <FormItem>
                            <CTDebounceSelect
                              value={value}
                              mode={'multiple'}
                              formStateErrors={formStateErrors}
                              placeholder={'Select tags'}
                              fetchOptions={handleFetchTagOptions}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  </Col>

                  <Col span={1}>
                    <CTIcon
                      style={{ marginLeft: '5px', fontSize: '20px', marginTop: '10px' }}
                      color={'green'}
                      icon={PlusCircleFilled}
                      onClick={() => setIsOpenTagModal(true)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      field: 'blog_thumbnail',
      render: ({ field }) => {
        return <CTInputTextArea {...field} placeholder={'Blog Thumbnail Url'} />;
      },
    },
    {
      field: 'blog_description',
      render: ({ field }) => {
        return <CTInputTextArea {...field} placeholder={'Blog description'} />;
      },
    },
    {
      field: 'blog_content',
      rules: {
        required: REQUIRED_FIELD_TEMPLATE,
      },
      render: ({ field }) => {
        return (
          <>
            <Collapse
              defaultActiveKey={1}
              items={[
                {
                  key: '1',
                  label: 'Blog content',
                  children: (
                    <>
                      <Flex justify='space-between' style={{ marginBottom: '20px' }}>
                        <Alert
                          message={
                            <>
                              Usage Markdown:{' '}
                              <Link href='https://www.markdownguide.org/basic-syntax/' target='_blank'>
                                Click here
                              </Link>
                            </>
                          }
                          type='warning'
                        />
                        <Switch
                          style={{ float: 'right', marginBottom: '10px' }}
                          checkedChildren='preview'
                          unCheckedChildren='code'
                          checked={isPreview}
                          onClick={() => {
                            if (!watch('blog_content')) return;
                            setIsPreview(!isPreview);
                          }}
                        />
                      </Flex>

                      {isPreview ? (
                        <Card style={{ border: '1px solid' }}>
                          <CTMarkdown>{field.value}</CTMarkdown>
                        </Card>
                      ) : (
                        <CTInputTextArea {...field} placeholder={'Blog content'} />
                      )}
                    </>
                  ),
                },
              ]}
            />
          </>
        );
      },
    },
  ];

  const { data: queryGetBlogDetail = {} } = useQuery({
    queryKey: [keyDetail, currentBlogId],
    queryFn: () => getBlogDetail(currentBlogId),
    enabled: currentBlogId ? true : false,
  });
  const { data: dataGetBlogDetail } = queryGetBlogDetail;

  useEffect(() => {
    if (!dataGetBlogDetail) return () => {};
    setFocus('blog_name');
    const { Tag, ...blogDetail } = dataGetBlogDetail;
    reset({ ...blogDetail, tag_ids: Tag?.map((item) => item.tag_id) });
  }, [dataGetBlogDetail]);

  const isPublish = watch('blog_is_publish');
  const { buttonColor, buttonContent, messageContent } = useMemo(() => {
    const publishProps = {
      buttonContent: 'Publish',
      buttonColor: 'green',
    };
    if (isPublish) {
      publishProps.buttonContent = 'Unpublish';
      publishProps.buttonColor = 'red';
    }
    return { ...publishProps, messageContent: publishProps.buttonContent };
  }, [isPublish]);

  const mutationPublishBlogs = useMutation({
    mutationFn: updatePublishBlogStatus,
    onSuccess: ({ errors }) => {
      if (errors) return toast.error(errors);
      queryClient.invalidateQueries([keyDetail, currentBlogId]);
      toast.success(`${messageContent} blog successful`);
    },
  });

  const blogActions = [
    {
      content: buttonContent,
      hidden: isEdit ? 0 : 1,
      type: 'button',
      style: {
        backgroundColor: buttonColor,
      },
      onClick: async () => {
        mutationPublishBlogs.mutate({ blog_id: currentBlogId, blog_is_publish: Number(!isPublish) });
      },
    },
  ];

  return (
    <>
      <Row justify={'center'}>
        <Col span={20}>
          <Card style={{ width: '100%' }}>
            <CTForm
              name='blog-form'
              items={formItems}
              global_control={control}
              onSubmit={handleSubmit(onSubmit)}
              isShowActionDefault={isShowActionDefault}
              actions={blogActions}
            />
          </Card>
          <CTModal
            open={isOpenTagModal}
            title='Tag add'
            onCancel={() => setIsOpenTagModal(false)}
            onOk={() => tagFormRef.current.onSubmit()}
          >
            <TagForm ref={tagFormRef} isModal={true} />
          </CTModal>
        </Col>
      </Row>
    </>
  );
}

const BlogForm = forwardRef(BlogFormRef);

export default BlogForm;
