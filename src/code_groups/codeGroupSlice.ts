import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  createPostRequest,
  createUrl,
  fetchW,
  getRequestTemplate,
} from "../utils/fetchUtils";
import { notifyError } from "../common/notifycations/notifycationsSlice";
import { CodeGroup } from "./codeGroupTypes";

type InterviewsState = {
  codeGroupList: CodeGroup[];
};

const initialState: InterviewsState = {
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
    } else {
      dispatch(notifyError("Podano złe dane groupy"));
    }
  };

export default codeGroupsSlice.reducer;
