import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Input, Popover, Progress, message } from 'antd';
import type { Store } from 'antd/es/form/interface';
import { Link } from 'umi';

import styles from './index.less';
import { getCaptcha, userRegister } from '@/api/auth';
import { ProFormCaptcha } from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import type { UserRegisterParams } from '@/model/request/auth';

const FormItem = Form.Item;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const onFinish = async (values: Store) => {
    try {
      // 登录
      const msg = await userRegister(values as UserRegisterParams);

      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
      } else {
        message.error(msg.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>注册</h3>
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
              {
                type: 'string',
                min: 2,
                message: '长度至少为2位!',
              },
            ]}
          >
            <Input size="large" placeholder="用户名" />
          </FormItem>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="确认密码" />
          </FormItem>
          <InputGroup compact>
            <FormItem
              style={{ width: '100%' }}
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '手机号格式错误!',
                },
              ]}
            >
              <Input size="large" placeholder="手机号" />
            </FormItem>
          </InputGroup>
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
            }}
            captchaProps={{
              size: 'large',
            }}
            phoneName="mobile"
            placeholder={'验证码'}
            captchaTextRender={(timing: any, count: any) => {
              if (timing) {
                return `${count} ${'秒后重新获取'}`;
              }

              return '获取验证码';
            }}
            name="captcha"
            rules={[
              {
                required: true,
                message: '验证码是必填项！',
              },
            ]}
            onGetCaptcha={async (phone: string) => {
              const result = await getCaptcha({
                phone,
              });

              if (result === false) {
                return;
              }

              message.success('获取验证码成功！');
            }}
          />
          <FormItem>
            <Button
              size="large"
              // loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>注册</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </Form>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
