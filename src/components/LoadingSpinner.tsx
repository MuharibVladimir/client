import { Spin } from "antd";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div>
      <Spin tip="Идет загрузка, пожалуйста, подождите" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default LoadingSpinner;
