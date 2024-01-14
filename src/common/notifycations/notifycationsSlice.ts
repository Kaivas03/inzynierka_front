import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SnackInterface } from "../commonTypes";

type NotificationsState = {
  snackPack: SnackInterface[];
  open: boolean;
  messageInfo: SnackInterface | undefined;
};

const initialState: NotificationsState = {
  snackPack: [],
  open: false,
  messageInfo: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notifySuccess: (state, action: PayloadAction<string>) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "success",
      });
    },
    notifyWarn: (state, action: PayloadAction<string>) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "warning",
      });
    },
    notifyError: (state, action: PayloadAction<string>) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "error",
      });
    },
    notifyInfo: (state, action: PayloadAction<string>) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "info",
      });
    },
    nextSnack: (state) => {
      state.messageInfo = { ...state.snackPack[0] };
      state.snackPack.splice(0, 1);
      state.open = true;
    },
    closeSnack: (state) => {
      state.open = false;
    },
    resetMessageInfo: (state) => {
      state.messageInfo = undefined;
    },
  },
});

export const {
  notifySuccess,
  notifyWarn,
  notifyError,
  notifyInfo,
  nextSnack,
  closeSnack,
  resetMessageInfo,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
