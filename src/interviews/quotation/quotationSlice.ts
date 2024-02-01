import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quotation } from "../interviewsTypes";
import { AppThunk } from "../../store";
import {
  createPostRequest,
  createUrl,
  fetchW,
  getRequestTemplate,
} from "../../utils/fetchUtils";
import { notifyError } from "../../common/notifycations/notifycationsSlice";

type QuotationState = {
  quotationList: Quotation[];
};

const initialState: QuotationState = {
  quotationList: [],
};

const quotationsSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    setQuotationList: (state, action: PayloadAction<Quotation[]>) => {
      state.quotationList = action.payload;
    },
  },
});

const { setQuotationList } = quotationsSlice.actions;

export const fetchQuotationList =
  (): AppThunk => async (dispatch, getState) => {
    const currentInterviewId = getState().interviewReducer.currentInterviewId;
    const url = createUrl(`/quotation/interview/${currentInterviewId}`);
    const response = await fetchW(url, getRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(setQuotationList(await response.json()));
    } else {
      dispatch(setQuotationList([]));
      dispatch(notifyError("Błąd podczas pobierania cytatów."));
    }
  };

export const createQuotation =
  (text: string | null, lineNumber: number | null): AppThunk =>
  async (dispatch, getState) => {
    const currentInterviewId = getState().interviewReducer.currentInterviewId;
    const url = createUrl(`/quotation/${currentInterviewId}`);
    const response = await fetchW(
      url,
      createPostRequest({ text: text, lineNumber: lineNumber }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchQuotationList());
    } else {
      dispatch(notifyError("Podano złe dane cytatu"));
    }
  };

export default quotationsSlice.reducer;
