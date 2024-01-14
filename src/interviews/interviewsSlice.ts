import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, useAppSelector } from "../store";
import { createUrl, fetchW, getRequestTemplate } from "../utils/fetchUtils";
import { notifyError } from "../common/notifycations/notifycationsSlice";
import { Interview, Quotation } from "./interviewsTypes";

type InterviewsState = {
  currentInterviewId: number | undefined;
  interviewsList: Interview[];
  interviewQuotationList: Quotation[];
};

const initialState: InterviewsState = {
  currentInterviewId: undefined,
  interviewsList: [],
  interviewQuotationList: [],
};

const interviewsSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    setCurrentInterviewId: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentInterviewId = action.payload;
    },
    setInterviewsList: (state, action: PayloadAction<Interview[]>) => {
      state.interviewsList = action.payload;
    },
    setInterviewQuotationList: (state, action: PayloadAction<Quotation[]>) => {
      state.interviewQuotationList = action.payload;
    },
  },
});

export const { setCurrentInterviewId } = interviewsSlice.actions;
const { setInterviewsList, setInterviewQuotationList } =
  interviewsSlice.actions;

export const fetchInterviews = (): AppThunk => async (dispatch) => {
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const url = createUrl(`/quotation/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setInterviewQuotationList(await response.json()));
  } else {
    dispatch(setInterviewQuotationList([]));
    dispatch(notifyError("Błąd podczas pobierania wywiadów."));
  }
};

export const fetchInterviewQuotations = (): AppThunk => async (dispatch) => {
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const url = createUrl(`/interview/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setInterviewsList(await response.json()));
  } else {
    dispatch(setInterviewsList([]));
    dispatch(notifyError("Błąd podczas pobierania wywiadów."));
  }
};

export default interviewsSlice.reducer;
