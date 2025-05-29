import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import CTErrorMessage from '../CTErrorMessage';
const DebounceSelect = ({ fetchOptions = async () => {}, debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const loadOptions = useCallback(
    (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    },
    [fetchOptions],
  );
  const debounceFetcher = useMemo(() => debounce(loadOptions, debounceTimeout), [loadOptions, debounceTimeout]);

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <Select
      showSearch={true}
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      options={options}
      size='large'
      {...props}
    />
  );
};

const CTDebounceSelect = CTErrorMessage(DebounceSelect);

export default CTDebounceSelect;
