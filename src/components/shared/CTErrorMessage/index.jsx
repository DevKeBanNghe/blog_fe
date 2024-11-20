import { forwardRef } from 'react';

const CTErrorMessage = (WrappedComponent) => {
  return forwardRef(function wrappedComponent({ errorMessage, formStateErrors, ...props }, ref) {
    if (formStateErrors) errorMessage = errorMessage ?? formStateErrors[props.name]?.message;
    return (
      <span style={{ width: '100%' }}>
        <WrappedComponent ref={ref} status={errorMessage ? 'error' : ''} {...props} />
        {errorMessage ? <span style={{ float: 'left', color: 'red' }}>{errorMessage}</span> : <></>}
      </span>
    );
  });
};

export default CTErrorMessage;
