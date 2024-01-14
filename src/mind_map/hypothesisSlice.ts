import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HypothesisItem } from "./hypothesisTypes";
import { AppThunk, useAppSelector } from "../store";
import {
  createPostRequest,
  createUrl,
  fetchW,
  getRequestTemplate,
} from "../utils/fetchUtils";
import { notifyError } from "../common/notifycations/notifycationsSlice";

type HypothesisState = {
  hypothsesisList: HypothesisItem[];
  currentHypothesisId: number | undefined;
  nodesMoved: boolean;
};

const initialState: HypothesisState = {
  hypothsesisList: [],
  currentHypothesisId: undefined,
  nodesMoved: false,
};

const hypothesisSlice = createSlice({
  name: "hypothesis",
  initialState,
  reducers: {
    setNodeMoved: (state, action: PayloadAction<boolean>) => {
      state.nodesMoved = action.payload;
    },
    setHypothsesisList: (state, action: PayloadAction<HypothesisItem[]>) => {
      state.hypothsesisList = action.payload;
    },
    setCurrentHypothesisId: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentHypothesisId = action.payload;
    },
  },
});

const { setHypothsesisList } = hypothesisSlice.actions;
export const { setCurrentHypothesisId, setNodeMoved } = hypothesisSlice.actions;

export const createHypothesis =
  (hypothesisText: string | null, dialogClose: () => void): AppThunk =>
  async (dispatch) => {
    const url = createUrl("/project/");
    const response = await fetchW(
      url,
      createPostRequest({ text: hypothesisText }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchHypothesisList());
      dialogClose();
    } else {
      dispatch(notifyError("Podano złe dane projektu"));
      dialogClose();
    }
  };

export const fetchHypothesisList = (): AppThunk => async (dispatch) => {
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const url = createUrl(`/hypothesis/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setHypothsesisList(await response.json()));
  } else {
    dispatch(setHypothsesisList([]));
    dispatch(notifyError("Błąd podczas pobierania hipotez."));
  }
};

export default hypothesisSlice.reducer;
