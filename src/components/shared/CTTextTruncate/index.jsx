import { Typography } from 'antd';
import { useMemo, useState } from 'react';
const { Link } = Typography;
const CTTextTruncate = ({ children = '', maxLength = 50 }) => {
  const [isHide, setIsHide] = useState(true);

  const text = useMemo(() => {
    if (!children || typeof children !== 'string') return '';
    if (isHide) {
      const backSpaceIndex = children.lastIndexOf(' ', maxLength);
      return children ? `${children.slice(0, backSpaceIndex)}...` : '';
    }
    return children;
  }, [isHide, children]);

  if (children?.length <= maxLength) {
    return children;
  }

  return (
    <>
      {text && (
        <>
          {text} <Link onClick={() => setIsHide(!isHide)}> {isHide ? 'more' : 'hide'}</Link>
        </>
      )}
    </>
  );
};
export default CTTextTruncate;
