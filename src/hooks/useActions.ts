import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/AuthSlice";

const allActions = {
  ...authActions,
};
export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
