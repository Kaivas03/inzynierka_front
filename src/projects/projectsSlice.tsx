import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsState = {
  firstNotClosedIndex: number;
  yearFetchInProgress: boolean;
};

const initialState: ProjectsState = {
  firstNotClosedIndex: -1,
  yearFetchInProgress: false,
};

const projectsSlice = createSlice({
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

const { yearsFetchStart, yearFetchComplete } = projectsSlice.actions;

export default projectsSlice.reducer;
