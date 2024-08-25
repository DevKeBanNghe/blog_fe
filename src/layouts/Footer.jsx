import { Col, Layout, Row } from 'antd';
import YoutubeChannel from 'components/shared/YoutubeSubscribe';
import Socials from './Socials';
import { PERSONAL_BRAND } from 'common/consts/constants.const';
const { Footer: FooterLayout } = Layout;

const Footer = () => (
  <FooterLayout style={{ textAlign: 'center', bottom: 0 }}>
    <hr />
    <Row>
      <Col xs={0} md={3}>
        <YoutubeChannel />
      </Col>
      <Col xs={24} md={18}>
        <Socials />
      </Col>
    </Row>
    <p
      style={{ fontWeight: '600', margin: 0 }}
    >{`© ${new Date().getFullYear()} ${PERSONAL_BRAND}. All rights reserved.`}</p>
  </FooterLayout>
);
export default Footer;
