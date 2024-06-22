import { Flex, Layout } from 'antd';
import Socials from './Socials';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
const { Footer: FooterLayout } = Layout;

const Footer = () => (
  <FooterLayout style={{ textAlign: 'center', bottom: 0 }}>
    <hr />
    <Flex vertical>
      <Socials />
      <p style={{ fontWeight: '600' }}>{`© ${new Date().getFullYear()} ${PERSONAL_BRAND}. All rights reserved.`}</p>
    </Flex>
  </FooterLayout>
);
export default Footer;
