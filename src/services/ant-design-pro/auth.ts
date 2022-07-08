import { request } from 'umi';

/** 发送验证码 GET /api/auth/captcha */
export async function getCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.GetCaptchaResponse>('/api/auth/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 退出登录接口 GET /api/auth/logout */
export async function userLogout(options?: Record<string, any>) {
  return request<API.UserLogoutResponse>('/api/auth/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
