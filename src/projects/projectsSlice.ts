import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./projectsTypes";
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

type ProjectsState = {
  currentProjectId: number | undefined;
  projectsList: Project[];
};

const initialState: ProjectsState = {
  currentProjectId: undefined,
  projectsList: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentProjectId: (state, action: PayloadAction<number | undefined>) => {
      state.currentProjectId = action.payload;
    },
    setProjectsList: (state, action: PayloadAction<Project[]>) => {
      state.projectsList = action.payload;
    },
  },
});

export const { setCurrentProjectId } = projectsSlice.actions;
const { setProjectsList } = projectsSlice.actions;

export const fetchProjects = (): AppThunk => async (dispatch) => {
  const url = createUrl(`/project/`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setProjectsList(await response.json()));
  } else {
    dispatch(setProjectsList([]));
    dispatch(notifyError("Błąd podczas pobierania projektów."));
  }
};

export const createProject =
  (projectName: string | null, projectDescription: string | null): AppThunk =>
  async (dispatch) => {
    const url = createUrl("/project/");
    const response = await fetchW(
      url,
      createPostRequest({ name: projectName, description: projectDescription }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchProjects());
    } else {
      dispatch(notifyError("Podano złe dane projektu"));
    }
  };

export const deleteProject =
  (projectId: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/project/${projectId}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchProjects());
      dispatch(notifySuccess("Usunięto projekt id: " + projectId));
    } else {
      dispatch(notifyError("Nie udało się usunąć projektu"));
    }
  };

export default projectsSlice.reducer;
