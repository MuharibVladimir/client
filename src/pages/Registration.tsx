import { Row, Typography } from "antd";
import React from "react";
import RegistrationForm from "../components/layout/RegistrationForm";

const Registration = () => {
  return (
    <div>
      <Typography.Title>Регистрация</Typography.Title>
      <Row justify="center" align="middle" className="h100">
        <RegistrationForm></RegistrationForm>
      </Row>
    </div>
  );
};

export default Registration;
