import { Button, Result } from 'antd';
import useInterval from 'hooks/useInterval';
import usePageRedirect from 'hooks/usePageRedirect';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useRouteError } from 'react-router-dom';

const statusInstance = [
  { status: 404, title: 'Not Found' },
  { status: 500, title: 'Something went wrong! Please try again' },
  { status: 403, title: 'You are not allowed to access this page !' },
];

const Errors = () => {
  const error = useRouteError();
  const { state } = useLocation();
  const statusRef = useRef(state?.status_code ?? 404);
  const { goToHomePage } = usePageRedirect();
  const [timeRedirect, setTimeRedirect] = useState(10);
  const navigate = useNavigate();

  if (error) statusRef.current = 500;

  const { status, title } = statusInstance.find((item) => item.status === statusRef.current);

  useInterval(() => setTimeRedirect((prev) => prev - 1));

  useEffect(() => {
    if (timeRedirect === 0) return navigate('/');
  }, [timeRedirect]);

  return (
    <Result
      status={status}
      title={status}
      subTitle={title}
      extra={
        <Button onClick={goToHomePage} type='primary'>
          Back Home (redirect after {timeRedirect}s)
        </Button>
      }
    />
  );
};

export default Errors;
