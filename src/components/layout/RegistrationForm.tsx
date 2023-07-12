import { Button, Form, Input } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { IUserForRegistration } from "../../models/IUserForRegistration";
import { useRegisterMutation } from "../../services/AuthService";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, {}] = useRegisterMutation();

  const onFinish = async (values: IUserForRegistration) => {
    console.log("Received values of form: ", values);
    await register(values);
    navigate("/login");
  };

  return (
    <Form
      {...formItemLayout}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите имя!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Введите корректный E-mail!",
          },
          {
            required: true,
            message: "Пожалуйста, введите E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
