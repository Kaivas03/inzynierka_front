import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import hypothesisReducer from "./mind_map/hypothesisSlice";
import projectsReducer from "./projects/projectsSlice";
import errorReducer from "./common/errors/errorSlice";
import notyficationsReducer from "./common/notifycations/notifycationsSlice";
import interviewReducer from "./interviews/interviewsSlice";

export const store = configureStore({
  reducer: {
    hypothesisReducer: hypothesisReducer,
    projectsReducer: projectsReducer,
    errorReducer: errorReducer,
    notyficationsReducer: notyficationsReducer,
    interviewReducer: interviewReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
