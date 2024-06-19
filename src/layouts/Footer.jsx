import { Layout } from 'antd';

import Socials from './Socials';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
const { Footer: FooterLayout } = Layout;

const Footer = () => {
  return (
    <>
      <FooterLayout style={{ textAlign: 'center', bottom: 0 }}>
        <hr />
        <p style={{ float: 'left' }}>{`${PERSONAL_BRAND} ©${new Date().getFullYear()} Created by Cù Trung`}</p>
        <Socials />
      </FooterLayout>
    </>
  );
};
export default Footer;
