import { Layout } from 'antd';

import Socials from './Socials';
const { Footer: FooterLayout } = Layout;

const Footer = () => {
  return (
    <>
      <FooterLayout style={{ textAlign: 'center', bottom: 0 }}>
        <hr />
        <p style={{ float: 'left' }}>Dev Kể Bạn Nghe ©{new Date().getFullYear()} Created by Cù Trung</p>
        <Socials />
      </FooterLayout>
    </>
  );
};
export default Footer;
