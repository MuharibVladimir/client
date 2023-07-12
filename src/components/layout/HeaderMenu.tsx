import { Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import React, { MenuHTMLAttributes } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../store/slices/AuthSlice";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import GuestHeader from "../GuestHeader";
import AuthorizedHeader from "../AuthorizedHeader";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  return isAuth ? <AuthorizedHeader /> : <GuestHeader />;
};

export default HeaderMenu;
