import { Col, Flex, Image, List, Row, Space, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
const { Item } = List;
import Logo from '/logo.png';
import { useMemo, useRef } from 'react';
import { ROOT_ROUTE } from '../const';
import { EyeFilled, CalendarFilled, ReadFilled } from '@ant-design/icons';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { styled } from 'styled-components';
import { removeDiacritics } from 'common/utils';
import { lowerCase } from 'lodash';
const { Title } = Typography;

const StyledItem = styled(Item)`
  background-color: #e8e8e8;
  cursor: pointer;
  margin-top: 40px;
  border-radius: 5px;
  box-shadow: 0 4px 7px 4px #9f9d9d;

  &:hover {
    box-shadow: 0 4px 7px 4px #858484;
  }
`;

function BlogItem({
  blog_title,
  blog_thumbnail,
  blog_description,
  blog_id,
  blog_view = 0,
  created_at,
  blog_reading_time,
}) {
  const itemRef = useRef();
  const navigate = useNavigate();

  const titleParam = useMemo(() => {
    return removeDiacritics(lowerCase(blog_title)).replaceAll(' ', '-');
  }, [blog_title]);

  const handleClick = () => {
    navigate(`${ROOT_ROUTE}/${titleParam}-${blog_id}`);
  };

  const actions = [
    {
      icon: CalendarFilled,
      value: created_at,
    },
    {
      icon: ReadFilled,
      value: `${blog_reading_time} min`,
    },
    {
      icon: EyeFilled,
      value: blog_view,
    },
  ];
  return (
    <StyledItem
      ref={itemRef}
      key={blog_title}
      extra={
        <Col xs={0} md={24}>
          <Image preview={false} width={172} alt={blog_title} src={blog_thumbnail ? blog_thumbnail : Logo} />
        </Col>
      }
      onClick={handleClick}
    >
      <Item.Meta
        style={{ margin: 0 }}
        title={
          <Link style={{ fontSize: '24px' }} onClick={handleClick}>
            🤔 {blog_title}
          </Link>
        }
      />

      {/* <Flex gap={'middle'} style={{ maxWidth: '100%' }}>
        {actions.map(({ icon: Icon, value, ...props }, index) => (
          <Space size={'small'} {...props} key={`action_${index}`}>
            <Icon />
            <span style={{ fontWeight: '500' }}>{value}</span>
          </Space>
        ))}
      </Flex>

      
      <Title level={5} style={{ margin: '8px 0 0 0', minHeight: '3.5em', opacity: '0.7' }}>
        <CTTextTruncate maxLength={180}>{blog_description}</CTTextTruncate>
      </Title> */}

      <Row>
        <Col span={24}>
          <Flex wrap='wrap' gap={'middle'}>
            {actions.map(({ icon: Icon, value, ...props }, index) => (
              <Space size={'small'} {...props} key={`action_${index}`}>
                <Icon />
                <span style={{ fontWeight: '500' }}>{value}</span>
              </Space>
            ))}
          </Flex>
        </Col>
        <Col span={24}>
          <Title level={5} style={{ margin: '8px 0 0 0', minHeight: '3.5em', opacity: '0.7' }}>
            <CTTextTruncate maxLength={180}>{blog_description}</CTTextTruncate>
          </Title>
        </Col>
      </Row>
    </StyledItem>
  );
}

export default BlogItem;
