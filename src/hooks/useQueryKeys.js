import { useResolvedPath } from 'react-router-dom';
export default function useQueryKeys({ prefix = '' } = {}) {
  let { pathname } = useResolvedPath();

  if (prefix) {
    pathname = `${pathname}-${prefix}`;
  }

  return {
    keyList: `${pathname}-list`,
    keyDetail: `${pathname}-detail`,
    keyUpdate: `${pathname}-update`,
    keyDelete: `${pathname}-delete`,
  };
}
