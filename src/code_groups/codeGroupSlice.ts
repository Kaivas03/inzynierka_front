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
import { CodeGroup } from "./codeGroupTypes";

type CodeGroupState = {
  codeGroupList: CodeGroup[];
};

const initialState: CodeGroupState = {
  codeGroupList: [],
};

const codeGroupsSlice = createSlice({
  name: "codeGroups",
  initialState,
  reducers: {
    setCodeGroupList: (state, action: PayloadAction<CodeGroup[]>) => {
      state.codeGroupList = action.payload;
    },
  },
});

const { setCodeGroupList } = codeGroupsSlice.actions;

export const fetchCodeGroups = (): AppThunk => async (dispatch, getState) => {
  const currentProjectId = getState().projectsReducer.currentProjectId;
  const url = createUrl(`/code-group/project/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setCodeGroupList(await response.json()));
  } else {
    dispatch(setCodeGroupList([]));
    dispatch(notifyError("Błąd podczas pobierania grup."));
  }
};

export const createCodeGroup =
  (codeGroupName: string | null): AppThunk =>
  async (dispatch, getState) => {
    const currentProjectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/code-group/${currentProjectId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: codeGroupName }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchCodeGroups());
      dispatch(notifySuccess("Dodano nową grupę"));
    } else {
      dispatch(notifyError("Podano złe dane groupy"));
    }
  };

export const editCodeGroup =
  (codeGroupId: number, codeGroupName: string | null): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/code-group/edit/${codeGroupId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: codeGroupName }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchCodeGroups());
      dispatch(notifySuccess(`Pomyślnie edytowano grupę id: ${codeGroupId}`));
    } else {
      dispatch(notifyError("Podano złe dane grupy"));
    }
  };

export const deleteCodeGroup =
  (codeGroupId: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/code-group/${codeGroupId}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchCodeGroups());
      dispatch(notifySuccess("Usunięto grupę id: " + codeGroupId));
    } else {
      dispatch(notifyError("Nie udało się usunąć grupy"));
    }
  };

export default codeGroupsSlice.reducer;
