import { useSelector } from 'react-redux';

export default function useUser() {
  const user = useSelector((state) => state.user);
  return user;
}
