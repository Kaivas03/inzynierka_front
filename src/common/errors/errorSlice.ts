import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorInterface } from "../commonTypes";

type ErrorsState = {
  occurance: boolean;
  code: string;
  message: string;
  accessDeniedPageOpen: boolean;
  helpPageVisible: boolean;
};

const initialState: ErrorsState = {
  occurance: false,
  code: "",
  message: "",
  accessDeniedPageOpen: false,
  helpPageVisible: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    errorOccured: (state, action: PayloadAction<ErrorInterface>) => {
      state.occurance = true;
      state.code = action.payload.code;
      state.message = action.payload.message;
    },
    accessDeniedOpen: (state) => {
      state.accessDeniedPageOpen = true;
    },
    accessDeniedClose: (state) => {
      state.accessDeniedPageOpen = false;
    },
    errorReset: (state) => {
      state.occurance = false;
    },
  },
});

export const { errorOccured, accessDeniedOpen, accessDeniedClose, errorReset } =
  errorSlice.actions;

export default errorSlice.reducer;
