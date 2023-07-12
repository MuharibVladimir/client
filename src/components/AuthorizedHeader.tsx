import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";
import { authSlice } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";

const AuthorizedHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        style={{ justifyContent: "center" }}
        theme="dark"
        mode="horizontal"
        selectable={false}
      >
        <MenuItem
          onClick={() => {
            navigate("users");
          }}
          key={"users"}
        >
          Пользователи
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(authSlice.actions.logout());
            navigate("/");
          }}
          key={"logout"}
        >
          Выйти
        </MenuItem>
      </Menu>
    </Header>
  );
};

export default AuthorizedHeader;
