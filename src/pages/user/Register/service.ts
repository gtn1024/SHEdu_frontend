// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export type UserRegisterResponse = {
  status?: 'ok' | 'error';
  message?: string;
  uuid?: string;
};

export type UserRegisterParams = {
  username: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
};

/** 用户注册 POST /api/auth/register */
export async function userRegister(body: UserRegisterParams, options?: { [key: string]: any }) {
  return request<UserRegisterResponse>('/api/auth/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
