import { Input } from 'antd';
import CTErrorMessage from '../CTErrorMessage';
import { forwardRef } from 'react';

const InputCustom = ({ placeholder, ...props }, ref) => {
  return <Input ref={ref} size='large' placeholder={placeholder} {...props} />;
};

const CTInput = CTErrorMessage(forwardRef(InputCustom));

export default CTInput;
