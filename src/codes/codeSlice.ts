import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  createPostRequest,
  createUrl,
  deleteRequestTemplate,
  fetchW,
  getRequestTemplate,
} from "../utils/fetchUtils";
import {
  notifyError,
  notifySuccess,
} from "../common/notifycations/notifycationsSlice";
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
      dispatch(notifySuccess("Utworzono nowy kod"));
    } else {
      dispatch(notifyError("Podano złe dane kodu"));
    }
  };

export const editCode =
  (codeId: number, codeName: string | null): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/code/edit/${codeId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: codeName }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchCodeList());
      dispatch(notifySuccess(`Pomyślnie edytowano kod id: ${codeId}`));
    } else {
      dispatch(notifyError("Podano złe dane kodu"));
    }
  };

export const deleteCode =
  (codeId: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/code/${codeId}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchCodeList());
      dispatch(notifySuccess("Usunięto kod id: " + codeId));
    } else {
      dispatch(notifyError("Nie udało się usunąć kodu"));
    }
  };

export default codesSlice.reducer;
