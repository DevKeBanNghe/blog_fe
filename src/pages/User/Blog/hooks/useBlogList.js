import { useSelector } from 'react-redux';

export default function useBlogList() {
  const blogList = useSelector((state) => state.blog);
  return blogList;
}
