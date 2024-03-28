import { useAppDispatch } from "../redux/hooks";
import { clearMyProfile } from "../redux/profileSlice";

// TODO : react-cookie 사용으로 변경하기 ?
const deleteCookie = (name: string, path: string = "/") => {
  const domain = window.location.hostname.replace("www", "");
  let cookieString =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
  if (domain) {
    cookieString += "; domain=" + domain;
  }
  document.cookie = cookieString;
};

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    deleteCookie("Authorization");
    dispatch(clearMyProfile());
    window.location.href = "/login";
  };

  return logout;
};

// fetch 401 logout
export const logout = () => {
  deleteCookie("Authorization");
  window.location.href = "/login";
};
