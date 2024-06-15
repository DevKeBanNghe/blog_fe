import { Flex, Typography } from 'antd';
import { redirectTo } from 'common/utils/common.util';
const { Link } = Typography;
const { VITE_SSO_URL: SSO_URL, VITE_WEBPAGE_KEY: WEBPAGE_KEY } = import.meta.env;

export default function Sign() {
  return (
    <Flex gap={'15px'} style={{ position: 'absolute', top: '25px', right: '30px' }}>
      <Link
        style={{ color: 'black', opacity: '0.7' }}
        onClick={() => redirectTo(`${SSO_URL}sign-in?webpage_key=${WEBPAGE_KEY}`)}
      >
        Sign in
      </Link>
      <Link style={{ color: 'black' }} onClick={() => redirectTo(`${SSO_URL}sign-up?webpage_key=${WEBPAGE_KEY}`)}>
        Sign up
      </Link>
    </Flex>
  );
}
