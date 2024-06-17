import { Input } from 'antd';
import { forwardRef } from 'react';
const { Search } = Input;

function SearchBarRef({ onSearch, ...props } = {}, ref) {
  return <Search ref={ref} placeholder='Tìm kiếm' allowClear size='large' onSearch={onSearch} {...props} />;
}

const SearchBar = forwardRef(SearchBarRef);
export default SearchBar;
