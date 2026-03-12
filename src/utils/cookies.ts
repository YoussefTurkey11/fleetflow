import Cookies from "js-cookie";

export const setAuthCookie = (token: string) => {
  Cookies.set("auth_token", token, { expires: 7, path: "/" });
};

export const removeAuthCookie = () => {
  Cookies.remove("auth_token");
};

export const getAuthCookie = () => {
  return Cookies.get("auth_token");
};
