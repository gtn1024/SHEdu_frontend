export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
};

export type UserRegisterParams = {
  username: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
};
