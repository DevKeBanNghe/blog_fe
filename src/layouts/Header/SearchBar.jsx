import { Input } from 'antd';
const { Search } = Input;

export default function SearchBar({ onSearch, ...props } = {}) {
  return <Search placeholder='Tìm kiếm' allowClear size='large' onSearch={onSearch} {...props} />;
}
