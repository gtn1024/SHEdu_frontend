import { request } from 'umi';

/** 登录接口 POST /api/auth/login */
export async function loginUser(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
