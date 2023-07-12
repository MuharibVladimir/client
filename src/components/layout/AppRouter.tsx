import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Users from "../../pages/Users";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRouter;
