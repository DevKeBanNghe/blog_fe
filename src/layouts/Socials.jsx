import {
  MailFilled,
  LinkedinFilled,
  YoutubeFilled,
  GithubFilled,
  FacebookFilled,
  InstagramOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';
import { Flex } from 'antd';
import Link from 'antd/es/typography/Link';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
import { removeDiacritics, toLowerCase } from 'common/utils';
import usePageRedirect from 'hooks/usePageRedirect';
import { ROOT_ROUTE as donateRoute } from 'pages/User/Donate/const';
const personalBrandCustom = removeDiacritics(PERSONAL_BRAND).replaceAll(' ', '');
const personalBrandCustomLowerCase = toLowerCase(personalBrandCustom);

export default function Socials(props = {}) {
  const { navigate } = usePageRedirect();
  const socials = [
    {
      link_to: `https://www.youtube.com/@${personalBrandCustom}-CT`,
      icon: <YoutubeFilled />,
    },
    {
      icon: <CoffeeOutlined />,
      onClick: () => navigate(donateRoute),
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
      link_to: `mailto:${personalBrandCustomLowerCase}@gmail.com`,
      icon: <MailFilled />,
    },
    {
      link_to: `https://www.linkedin.com/in/${personalBrandCustomLowerCase}`,
      icon: <LinkedinFilled />,
    },
    {
      link_to: `https://www.instagram.com/${personalBrandCustomLowerCase}`,
      icon: <InstagramOutlined />,
    },
  ];
  return (
    <>
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
            {...social}
          >
            {social.icon}
          </Link>
        ))}
      </Flex>
    </>
  );
}
