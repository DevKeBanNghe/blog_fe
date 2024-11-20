import { Input } from 'antd';
import CTErrorMessage from '../../CTErrorMessage';
import { forwardRef } from 'react';

const InputTextAreaCustom = ({ placeholder, ...props }, ref) => {
  return <Input.TextArea ref={ref} autoSize size='large' placeholder={placeholder} {...props} />;
};

const CTInputTextArea = CTErrorMessage(forwardRef(InputTextAreaCustom));

export default CTInputTextArea;
