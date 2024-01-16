import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  createPostRequest,
  createUrl,
  fetchW,
  getRequestTemplate,
} from "../utils/fetchUtils";
import { notifyError } from "../common/notifycations/notifycationsSlice";
import { Code } from "./codeTypes";

type CodeState = {
  codesList: Code[];
};

const initialState: CodeState = {
  codesList: [],
};

const codesSlice = createSlice({
  name: "codes",
  initialState,
  reducers: {
    setCodesList: (state, action: PayloadAction<Code[]>) => {
      state.codesList = action.payload;
    },
  },
});

const { setCodesList } = codesSlice.actions;

export const fetchCodeList = (): AppThunk => async (dispatch, getState) => {
  const currentProjectId = getState().projectsReducer.currentProjectId;
  const url = createUrl(`/code/project/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setCodesList(await response.json()));
  } else {
    dispatch(setCodesList([]));
    dispatch(notifyError("Błąd podczas pobierania kodu."));
  }
};

export const createCode =
  (codeName: string | null): AppThunk =>
  async (dispatch, getState) => {
    const currentProjectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/code/${currentProjectId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: codeName }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchCodeList());
    } else {
      dispatch(notifyError("Podano złe dane kodu"));
    }
  };

export default codesSlice.reducer;
