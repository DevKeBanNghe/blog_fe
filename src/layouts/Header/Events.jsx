import { Flex } from 'antd';
import CTAvartar from 'components/shared/CTAvartar';
import CTDropdown from 'components/shared/CTDropdown';
import { useMemo, useState } from 'react';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
export default function Events() {
  const [userInfo] = useState([
    {
      label: <a href='https://www.antgroup.com'>Profile</a>,
      key: '0',
    },
    {
      label: <a href='https://www.antgroup.com'>Settings</a>,
      key: '1',
    },
    {
      label: <a href='https://www.antgroup.com'>Logout</a>,
      key: '2',
    },
  ]);
  const [notifications] = useState([
    {
      label: <a href='https://www.antgroup.com'>1st menu item</a>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: '2rd menu item',
      key: '1',
    },
  ]);

  const notificationLength = useMemo(() => notifications.filter((noti) => noti.key).length, [notifications]);
  return (
    <Flex gap={'15px'} style={{ position: 'absolute', top: '25px', right: '30px' }}>
      <CTDropdown items={notifications}>
        <a onClick={(e) => e.preventDefault()}>
          <CTAvartar badgetValue={notificationLength} icon={<BellOutlined />} />
        </a>
      </CTDropdown>

      <CTDropdown items={userInfo}>
        <a onClick={(e) => e.preventDefault()}>
          <CTAvartar badgetValue={0} icon={<UserOutlined />} />
        </a>
      </CTDropdown>
    </Flex>
  );
}
