import { Button, Layout, Menu, MenuProps, Row, theme } from "antd";
import {
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import AppRouter from "./AppRouter";
//import { Auth } from "../../features/auth/auth";

const { Content } = Layout;

const ContentOfPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <div
        style={{
          padding: 24,
          textAlign: "center",
          background: colorBgContainer,
        }}
      >
        <AppRouter />
      </div>
    </Content>
  );
};

export default ContentOfPage;
