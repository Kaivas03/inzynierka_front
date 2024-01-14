import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { apiPrefix, getApiDomainAdress } from "../dubajConfig";
import { RootState } from "../store";
import { accessDeniedOpen, errorOccured } from "../common/errors/errorSlice";

type RequestTemplate = {
  method?: "delete" | "get" | "post" | "put";
  credentials: "include";
  headers: {
    Accept: "application/json, text/plain, */*";
    "Content-Type": "application/json";
  };
  body?: Object;
};

// from fetch wrapper
export const fetchW = async (
  url: URL,
  request: Object,
  dispatch: ThunkDispatch<RootState, unknown, UnknownAction>
): Promise<Response> => {
  try {
    const response = await fetch(url, request);
    if (response.status === 401) {
      //   dispatch(invalidateFrontSession()); --> trza dać błąd połączenia
    }
    if (response.status === 403) {
      dispatch(accessDeniedOpen());
      return response;
    }
    if (response.status === 500) {
      //   dispatch(setHelpPageVisible()); --> trzeba coś dopisać
      dispatch(
        errorOccured({
          message: "Internal server  Error",
          code: "wystąpił błąd aplikacji",
        })
      );
      return response;
    }
    if (response.status === 502) {
      // dispatch(setHelpPageHidden()); --> trzeba coś dopisać
      dispatch(
        errorOccured({
          message: "Brak połączenia z serwerem",
          code: "Sprawdź połączenie lub skontaktuj się z administratorem sieci",
        })
      );
      return response;
    } else {
      return response;
    }
  } catch (exception) {
    // dispatch(setHelpPageHidden()); --> trzeba coś dopisać
    dispatch(
      errorOccured({
        message: "Brak połączenia z serwerem",
        code: "Sprawdź połączenie lub skontaktuj się z administratorem sieci",
      })
    );
    return Promise.reject("Connection error");
  }
};

const requestTemplate: RequestTemplate = {
  credentials: "include",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
};

export const getRequestTemplate: RequestTemplate = {
  method: "get",
  ...requestTemplate,
};

export const postRequestTemplate: RequestTemplate = {
  method: "post",
  ...requestTemplate,
};

export const putRequestTemplate: RequestTemplate = {
  method: "put",
  ...requestTemplate,
};

export const deleteRequestTemplate: RequestTemplate = {
  method: "delete",
  ...requestTemplate,
};

export const createPostRequest = (body: Object) => ({
  ...postRequestTemplate,
  body: JSON.stringify(body),
});

export const createPutRequest = (body: Object) => ({
  ...putRequestTemplate,
  body: JSON.stringify(body),
});

export const createDeleteRequest = (body: Object) => ({
  ...deleteRequestTemplate,
  body: JSON.stringify(body),
});

// parametry w formacie {nazwa: wartość, nazwa2: wartość2}
export const createUrl = (url: string, params?: Object | undefined) => {
  let urlWithParams = new URL(`${apiPrefix}${url}`, `${getApiDomainAdress()}`);
  if (params) {
    // deleting undefined filters
    Object.keys(params).forEach(
      (key) =>
        params[key as keyof typeof params] === undefined &&
        delete params[key as keyof typeof params]
    );
    urlWithParams.search = new URLSearchParams(params as string[][]).toString();
  }
  return urlWithParams;
};
