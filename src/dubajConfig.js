export const getApiDomainAdress = () =>
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : document.location.href;

export const apiPrefix =
  process.env.NODE_ENV === "development"
    ? "/web"
    : `${process.env.PUBLIC_URL}/api`;
