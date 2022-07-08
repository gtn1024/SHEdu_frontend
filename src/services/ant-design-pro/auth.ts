// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送验证码 GET /api/auth/captcha */
export async function getCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GetCaptchaResponse>('/api/auth/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
