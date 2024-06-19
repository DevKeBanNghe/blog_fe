import { Badge, Image, List, Space, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
const { Item } = List;
import Logo from '/logo.png';
import { useRef } from 'react';
import { ROOT_ROUTE } from '../const';
import { LikeFilled, MessageFilled, EyeFilled } from '@ant-design/icons';
import CTTextTruncate from 'components/shared/CTTextTruncate';
import { styled } from 'styled-components';

const StyledItem = styled(Item)`
  background-color: #e8e8e8;
  cursor: pointer;
  margin-bottom: 40px;
  border-radius: 5px;
  box-shadow: 0 4px 7px 4px #9f9d9d;

  &:hover {
    box-shadow: 0 4px 7px 4px #858484;
  }
`;

function BlogItem({ blog_is_trending, blog_title, blog_thumbnail, blog_description, blog_id, blog_view = 0 }) {
  const itemRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROOT_ROUTE}/${blog_id}`);
  };

  const actions = [
    {
      icon: EyeFilled,
      value: blog_view,
      style: {
        color: '#f59bac',
      },
    },
    {
      icon: LikeFilled,
      // value: 166,
      style: {
        color: '#0866ff',
      },
    },
    {
      icon: MessageFilled,
      // value: 222,
      style: {
        color: '#59c4a9',
      },
    },
  ];
  return (
    <Badge.Ribbon text='Xem nhiều' color='red' style={{ display: blog_is_trending ? '' : 'none' }}>
      <StyledItem
        ref={itemRef}
        key={blog_title}
        actions={actions.map(({ icon: Icon, value, ...props }, index) => (
          <Space {...props} key={`action_${index}`}>
            {<Icon />}
            {value}
          </Space>
        ))}
        extra={<Image preview={false} width={172} alt={blog_title} src={blog_thumbnail ?? Logo} />}
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
        <Typography style={{ minHeight: '6em' }}>
          <CTTextTruncate maxLength={255}>{blog_description}</CTTextTruncate>
        </Typography>
      </StyledItem>
    </Badge.Ribbon>
  );
}

export default BlogItem;
