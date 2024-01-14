import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HypothesisItem } from "./hypothesisTypes";

type HypothesisState = {
  hypothsesisList: HypothesisItem[];
  yearFetchInProgress: boolean;
};

const initialState: HypothesisState = {
  hypothsesisList: [],
  yearFetchInProgress: false,
};

const hypothesisSlice = createSlice({
  name: "hypothesis",
  initialState,
  reducers: {
    yearsFetchStart: (state) => {
      state.yearFetchInProgress = true;
    },
  },
});

const { yearsFetchStart } = hypothesisSlice.actions;

export default hypothesisSlice.reducer;
