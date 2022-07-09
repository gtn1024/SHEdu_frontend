import type { CurrentUser } from './model/response/user';

type Access = {
  canUser: boolean;
  canTeacher: boolean;
  canAdmin: boolean;
};

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 */
export default function access(initialState: { currentUser?: CurrentUser } | undefined): Access {
  const { currentUser } = initialState ?? {};
  const userRole = currentUser?.role ?? '';
  return {
    canUser: userRole === 'USER' || userRole === 'TEACHER' || userRole === 'ADMIN',
    canTeacher: userRole === 'TEACHER' || userRole === 'ADMIN',
    canAdmin: userRole === 'ADMIN',
  };
}
