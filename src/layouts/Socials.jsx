import { MailFilled, LinkedinFilled, YoutubeFilled, GithubFilled, FacebookFilled } from '@ant-design/icons';
import { Flex } from 'antd';
const socials = [
  {
    link_to: 'https://www.linkedin.com/in/c%C3%B9-phan-th%C3%A0nh-trung-29806629a/',
    icon: <LinkedinFilled style={{ color: '#2365b1' }} />,
  },
  {
    link_to: 'mailto:cuphanthanhtrung4112003@gmail.com',
    icon: <MailFilled style={{ color: '#42b8e5' }} />,
  },
  {
    link_to: 'https://www.youtube.com/channel/UCSW1h6pjj4WttEI_s4esvKg',
    icon: <YoutubeFilled style={{ color: '#fd0100' }} />,
  },
  {
    link_to: 'https://github.com/CuTrung',
    icon: <GithubFilled style={{ color: '#000' }} />,
  },
  {
    link_to: 'https://www.facebook.com/cuphan.thanhtrung/',
    icon: <FacebookFilled style={{ color: '#1775f1' }} />,
  },
];
export default function Socials(props = {}) {
  return (
    <Flex gap={'small'} align='center' justify='flex-end' {...props}>
      {socials.map((social) => (
        <a
          style={{ fontSize: '24px' }}
          key={social.link_to}
          href={social.link_to}
          target='_blank'
          rel='noopener noreferrer'>
          {social.icon}
        </a>
      ))}
    </Flex>
  );
}
