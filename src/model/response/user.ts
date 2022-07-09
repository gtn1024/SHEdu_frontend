export type CurrentUser = {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 通知数量
   */
  notifyCount?: number;
  /**
   * 未读通知数量
   */
  unreadCount?: number;
  /**
   * 用户角色
   */
  role?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 是否是VIP
   */
  isVip?: boolean;
};
