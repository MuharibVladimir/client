import React, { FC, ReactNode, useEffect } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { IAuth } from "../../models/IAuth";
import { useLoginMutation } from "../../services/AuthService";
import { useActions } from "../../hooks/useActions";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { loginUser } = useActions();

  const [login, { isLoading, isSuccess, data, isError }] = useLoginMutation();
  const onFinish = async (values: IAuth) => {
    console.log(values);
    await login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/users");
      loginUser({
        accessToken: data?.accessToken as string,
        refreshToken: data?.refreshToken as string,
      });
    }
    if (isError) {
      navigate("/login");
    }
  });

  return (
    <>
      <div style={{ marginBottom: 150 }}>
        <Typography.Title>Вход в аккаунт</Typography.Title>
        <div style={{ marginTop: 30 }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Пожалуйста, введите E-mail!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ paddingLeft: 0 }}>Запомнить меня</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%", marginBottom: 10 }}
              >
                Войти
              </Button>
              Нет аккаунта? <Link to="/registration">Зарегистрируйтесь!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
