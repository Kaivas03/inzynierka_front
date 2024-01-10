import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HypothesisState = {
  firstNotClosedIndex: number;
  yearFetchInProgress: boolean;
};

const initialState: HypothesisState = {
  firstNotClosedIndex: -1,
  yearFetchInProgress: false,
};

const hypothesisSlice = createSlice({
  name: "hypothesis",
  initialState,
  reducers: {
    yearsFetchStart: (state) => {
      state.yearFetchInProgress = true;
    },
    yearFetchComplete: (state, action: PayloadAction<number>) => {
      state.firstNotClosedIndex = action.payload;
    },
  },
});

const { yearsFetchStart, yearFetchComplete } = hypothesisSlice.actions;

export default hypothesisSlice.reducer;
