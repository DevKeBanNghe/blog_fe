import {
  MailFilled,
  LinkedinFilled,
  YoutubeFilled,
  GithubFilled,
  FacebookFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { Flex } from 'antd';
import Link from 'antd/es/typography/Link';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
import { removeDiacritics, toLowerCase } from 'common/utils';
const personalBrandCustom = removeDiacritics(PERSONAL_BRAND).replaceAll(' ', '');
const personalBrandCustomLowerCase = toLowerCase(personalBrandCustom);

const socials = [
  {
    link_to: `https://www.linkedin.com/in/${personalBrandCustomLowerCase}`,
    icon: <LinkedinFilled />,
  },
  {
    link_to: `mailto:${personalBrandCustomLowerCase}@gmail.com`,
    icon: <MailFilled />,
  },
  {
    link_to: 'https://www.youtube.com/channel/UCSW1h6pjj4WttEI_s4esvKg',
    icon: <YoutubeFilled />,
  },
  {
    link_to: `https://github.com/${personalBrandCustom}`,
    icon: <GithubFilled />,
  },
  {
    link_to: `https://www.facebook.com/${personalBrandCustom}`,
    icon: <FacebookFilled />,
  },
  {
    link_to: `https://www.instagram.com/${personalBrandCustomLowerCase}`,
    icon: <InstagramOutlined />,
  },
];
export default function Socials(props = {}) {
  return (
    <Flex gap={'small'} align='center' justify='center' {...props}>
      {socials.map((social) => (
        <Link
          key={social.link_to}
          style={{
            fontSize: '24px',
            color: '#727272',
            opacity: '0.8',
          }}
          href={social.link_to}
          target='_blank'
          rel='noopener noreferrer'
        >
          {social.icon}
        </Link>
      ))}
    </Flex>
  );
}
