import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quotation } from "../interviewsTypes";
import { AppThunk } from "../../store";
import {
  createPostRequest,
  createUrl,
  deleteRequestTemplate,
  fetchW,
  getRequestTemplate,
} from "../../utils/fetchUtils";
import {
  notifyError,
  notifySuccess,
} from "../../common/notifycations/notifycationsSlice";

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
  (text: string | null, lineNumber: number | null, codeId: any): AppThunk =>
  async (dispatch, getState) => {
    const currentInterviewId = getState().interviewReducer.currentInterviewId;
    const url = createUrl(`/quotation/${currentInterviewId}`);
    const response = await fetchW(
      url,
      createPostRequest({ text: text, lineNumber: lineNumber, codeId }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchQuotationList());
      dispatch(notifySuccess(`Pomyślnie utworzono cytat`));
    } else {
      dispatch(notifyError("Podano złe dane cytatu"));
    }
  };

export const editQuotation =
  (
    id: number,
    text: string | null,
    lineNumber: number | null,
    codeId: any
  ): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/quotation/edit/${id}`);
    const response = await fetchW(
      url,
      createPostRequest({ text: text, lineNumber: lineNumber, codeId }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchQuotationList());
      dispatch(notifySuccess(`Pomyślnie edytowano cytat id: ${id}`));
    } else {
      dispatch(notifyError("Podano złe dane cytatu"));
    }
  };

export const deleteQuotation =
  (id: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/quotation/${id}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchQuotationList());
      dispatch(notifySuccess("Usunięto cytat id: " + id));
    } else {
      dispatch(notifyError("Nie udało się usunąć cytatu"));
    }
  };

export default quotationsSlice.reducer;
