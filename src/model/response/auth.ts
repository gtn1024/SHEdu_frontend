export type LoginResult = {
  status?: string;
  type?: string;
  message?: string;
  uuid?: string;
};

export type GetCaptchaResponse = {
  status?: string;
  message?: string;
};

export type UserLogoutResponse = {
  status?: string;
  message?: string;
};

export type UserRegisterResponse = {
  status?: 'ok' | 'error';
  message?: string;
  uuid?: string;
};
