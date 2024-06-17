import { Flex, Tag } from 'antd';
import useCurrentPage from 'hooks/useCurrentPage';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogTags({ list = [] }) {
  const navigate = useNavigate();
  const { queryParamsPagingStringDefault } = useCurrentPage({ isPaging: false });
  const handleClickTag = (tag_name) => {
    navigate(`/${queryParamsPagingStringDefault}&search=${tag_name}`);
  };

  return (
    <Flex gap='4px 0' wrap='wrap'>
      {list.map((tag, index) => {
        return (
          <Tag key={`tag_${index}`} color='cyan'>
            <Link onClick={() => handleClickTag(tag)}>#{tag}</Link>
          </Tag>
        );
      })}
    </Flex>
  );
}
