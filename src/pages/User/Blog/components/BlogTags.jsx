import { Flex, Tag } from 'antd';
import { Link } from 'react-router-dom';

export default function BlogTags({ list = [] }) {
  return (
    <Flex gap='4px 0' wrap='wrap'>
      {list.map((tag, index) => {
        return (
          <Tag key={`tag_${index}`} color='cyan'>
            <Link onClick={() => console.log('>>> tag')}>#{tag}</Link>
          </Tag>
        );
      })}
    </Flex>
  );
}
