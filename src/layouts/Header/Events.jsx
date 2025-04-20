import { Flex, Typography } from 'antd';
import CTAvartar from 'components/shared/CTAvartar';
import CTDropdown from 'components/shared/CTDropdown';
import { useMemo, useState } from 'react';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { api, toast } from 'common/utils';
import { redirectTo } from 'common/utils/common.util';
const { Link } = Typography;
const { VITE_SSO_URL: SSO_URL, VITE_WEBPAGE_KEY: WEBPAGE_KEY } = import.meta.env;

export default function Events() {
  const handleLogout = async () => {
    await api.get(`/auth/logout`);
    toast.success('Logout successfully');
    return redirectTo(`${SSO_URL}sign-in?webpage_key=${WEBPAGE_KEY}`);
  };

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
      label: <Link onClick={handleLogout}>Logout</Link>,
      key: '2',
    },
  ]);
  const [notifications] = useState([
    {
      label: '1st noti',
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: '2rd noti',
      key: '1',
    },
  ]);

  const notificationLength = useMemo(() => notifications.filter((noti) => noti.key).length, [notifications]);
  return (
    <Flex gap={'middle'}>
      <CTDropdown items={notifications} placement='topRight' arrow>
        <a onClick={(e) => e.preventDefault()}>
          <CTAvartar badgetValue={notificationLength} icon={<BellOutlined />} />
        </a>
      </CTDropdown>

      <CTDropdown items={userInfo} placement='topRight' arrow>
        <a onClick={(e) => e.preventDefault()}>
          <CTAvartar badgetValue={0} icon={<UserOutlined />} />
        </a>
      </CTDropdown>
    </Flex>
  );
}
