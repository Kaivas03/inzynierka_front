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
import { Interview, Quotation } from "./interviewsTypes";

type InterviewsState = {
  currentInterviewId: number | undefined;
  currentInterviewName: string | null;
  currentInterviewText: string | null;
  interviewsList: Interview[];
  interviewQuotationList: Quotation[];
};

const initialState: InterviewsState = {
  currentInterviewId: undefined,
  currentInterviewName: null,
  currentInterviewText: null,
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
    setCurrentInterviewName: (
      state,
      action: PayloadAction<{ name: string | null; text: string | null }>
    ) => {
      state.currentInterviewName = action.payload.name;
      state.currentInterviewText = action.payload.text;
    },
    setInterviewsList: (state, action: PayloadAction<Interview[]>) => {
      state.interviewsList = action.payload;
    },
    setInterviewQuotationList: (state, action: PayloadAction<Quotation[]>) => {
      state.interviewQuotationList = action.payload;
    },
  },
});

export const { setCurrentInterviewId, setCurrentInterviewName } =
  interviewsSlice.actions;
const { setInterviewsList, setInterviewQuotationList } =
  interviewsSlice.actions;

export const fetchInterviews = (): AppThunk => async (dispatch, getState) => {
  const currentProjectId = getState().projectsReducer.currentProjectId;
  const url = createUrl(`/interview/project/${currentProjectId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setInterviewsList(await response.json()));
  } else {
    dispatch(setInterviewsList([]));
    dispatch(notifyError("Błąd podczas pobierania wywiadów."));
  }
};

export const fetchInterviewQuotations =
  (): AppThunk => async (dispatch, getState) => {
    const currentProjectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/quotation/${currentProjectId}`);
    const response = await fetchW(url, getRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(setInterviewQuotationList(await response.json()));
    } else {
      dispatch(setInterviewQuotationList([]));
      dispatch(notifyError("Błąd podczas pobierania wywiadów."));
    }
  };

export const createInterview =
  (interviewName: string | null, interviewText: string | null): AppThunk =>
  async (dispatch, getState) => {
    const currentProjectId = getState().projectsReducer.currentProjectId;
    const url = createUrl(`/interview/${currentProjectId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: interviewName, text: interviewText }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchInterviews());
      dispatch(notifySuccess("Dodano nowy wywiad"));
    } else {
      dispatch(notifyError("Podano złe dane wywiadu"));
    }
  };

export const editInterview =
  (
    interviewId: number,
    interviewName: string | null,
    interviewText: string | null
  ): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/interview/edit/${interviewId}`);
    const response = await fetchW(
      url,
      createPostRequest({ name: interviewName, text: interviewText }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchInterviews());
      dispatch(notifySuccess(`Pomyślnie edytowano wywiad id: ${interviewId}`));
    } else {
      dispatch(notifyError("Podano złe dane wywiadu"));
    }
  };

export const deleteInterview =
  (interviewId: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/interview/${interviewId}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchInterviews());
      dispatch(notifySuccess("Usunięto wywiad id: " + interviewId));
    } else {
      dispatch(notifyError("Nie udało się usunąć wywiadu"));
    }
  };

export default interviewsSlice.reducer;
