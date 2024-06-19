import { Flex } from 'antd';
import CTButton from '../CTButton';

export default function GlobalActions({ actions = [] }) {
  return (
    <>
      <Flex gap={'middle'}>
        {actions.map(({ content, ...props }, index) => (
          <CTButton key={`global_actions_${index}`} {...props}>
            {content}
          </CTButton>
        ))}
      </Flex>
    </>
  );
}
