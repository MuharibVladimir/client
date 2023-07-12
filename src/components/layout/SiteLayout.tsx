import React, { useState } from "react";
import { Input, Layout, Modal, Space } from "antd";
import HeaderMenu from "./HeaderMenu";
import ContentOfPage from "./ContentOfPage";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const PageLayout = () => {
  return (
    <Layout>
      <Layout className="site-layout">
        <HeaderMenu />
        <ContentOfPage />
        <Footer
          style={{
            textAlign: "start",
            bottom: 0,
            width: "100%",
            position: "fixed",
          }}
        >
          ©2023 Created by Turomsha Vladimir
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
