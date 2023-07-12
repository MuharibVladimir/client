import React from "react";
import LoginForm from "../components/layout/LoginForm";
import { Row } from "antd";

const Login = () => {
  return (
    <div>
      <Row justify="center" align="middle" className="h100">
        <LoginForm></LoginForm>
      </Row>
    </div>
  );
};

export default Login;
