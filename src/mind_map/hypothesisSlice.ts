import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HypothesisItem, SokEdge, SokNode } from "./hypothesisTypes";
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

type HypothesisState = {
  hypothsesisList: HypothesisItem[];
  currentHypothesisId: number | undefined;
  nodePackage: { nodes: SokNode[]; edges: SokEdge[] };
  nodesMoved: boolean;
};

const initialState: HypothesisState = {
  hypothsesisList: [],
  currentHypothesisId: undefined,
  nodePackage: { nodes: [], edges: [] },
  nodesMoved: false,
};

const hypothesisSlice = createSlice({
  name: "hypothesis",
  initialState,
  reducers: {
    setNodeMoved: (state, action: PayloadAction<boolean>) => {
      state.nodesMoved = action.payload;
    },
    setHypothesisList: (state, action: PayloadAction<HypothesisItem[]>) => {
      state.hypothsesisList = action.payload;
    },
    setNodePackage: (
      state,
      action: PayloadAction<{ nodes: SokNode[]; edges: SokEdge[] }>
    ) => {
      state.nodePackage = action.payload;
    },
    setCurrentHypothesisId: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentHypothesisId = action.payload;
    },
  },
});

const { setHypothesisList } = hypothesisSlice.actions;
export const { setCurrentHypothesisId, setNodeMoved } = hypothesisSlice.actions;

export const createHypothesis =
  (hypothesisText: string | null): AppThunk =>
  async (dispatch, getState) => {
    const projectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/hypothesis/${projectId}`);
    const response = await fetchW(
      url,
      createPostRequest({ text: hypothesisText }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchHypothesisList());
      dispatch(notifySuccess("Dodano nową hipotezę!"));
    } else {
      dispatch(notifyError("Podano złe dane hipotezy"));
    }
  };

export const fetchHypothesisList =
  (): AppThunk => async (dispatch, getState) => {
    const projectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/hypothesis/all/${projectId}`);
    const response = await fetchW(url, getRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(setHypothesisList(await response.json()));
    } else {
      dispatch(setHypothesisList([]));
      dispatch(notifyError("Błąd podczas pobierania hipotez."));
    }
  };

export const deleteHypothesis =
  (hypothesisId: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/hypothesis/${hypothesisId}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchHypothesisList());
      dispatch(notifySuccess("Usunięto hipotezę o id: " + hypothesisId));
    } else {
      dispatch(notifyError("Nie udało się usunąć hipotezy"));
    }
  };

export default hypothesisSlice.reducer;
