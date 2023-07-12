import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";
import { authSlice } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <Menu
        style={{ justifyContent: "end" }}
        theme="dark"
        mode="horizontal"
        selectable={false}
        onClick={({ key }) => {
          navigate(key, { replace: true });
        }}
        items={[
          {
            key: `login`,
            label: "Войти",
          },
          {
            key: `registration`,
            label: "Зарегистрироваться",
          },
        ]}
      />
    </Header>
  );
};

export default AdminHeader;
