import type { LoginParams, UserRegisterParams } from '@/model/request/auth';
import type {
  GetCaptchaResponse,
  LoginResult,
  UserLogoutResponse,
  UserRegisterResponse,
} from '@/model/response/auth';
import type { CurrentUser } from '@/model/response/user';
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
  return request<GetCaptchaResponse>('/api/auth/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 退出登录接口 GET /api/auth/logout */
export async function userLogout(options?: Record<string, any>) {
  return request<UserLogoutResponse>('/api/auth/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/auth/current */
export async function currentUser(options?: Record<string, any>) {
  return request<{
    data: CurrentUser;
  }>('/api/auth/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/auth/login */
export async function loginUser(body: LoginParams, options?: Record<string, any>) {
  return request<LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /api/auth/register */
export async function userRegister(body: UserRegisterParams, options?: Record<string, any>) {
  return request<UserRegisterResponse>('/api/auth/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
