"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";
import { clearMyProfile, setMyProfile } from "../redux/profileSlice";
import { ProfileMine } from "@/types/Profile";
import fetchGetMyProfile from "@/utils/members/fetchGetMyProfile";

// utils
const deleteCookie = (name: string, path: string = "/") => {
  const domain = window.location.hostname.replace("www", "");
  let cookieString =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
  if (domain) {
    cookieString += "; domain=" + domain;
  }
  document.cookie = cookieString;
};

const hasAuthorizationCookie = () => {
  const cookieName = "Authorization";
  const cookies = document.cookie.split(";");
  return cookies.some((cookie) => cookie.trim().startsWith(cookieName + "="));
};

// cookie 확인 후, myProfile redux에 저장
// Must use this hook Only in the Sidebar component
export const useSidebarLoginStatus = () => {
  const dispatch = useAppDispatch();
  const myProfileState = useAppSelector((state) => state.myProfile);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfile = await fetchGetMyProfile();
      if (myProfile.profileInfo) {
        dispatch(setMyProfile(myProfile.profileInfo));
        setIsLogin(true);
      } else {
        deleteCookie("Authorization");
        setIsLogin(false);
      }
    };

    if (!hasAuthorizationCookie()) {
      dispatch(clearMyProfile());
      setIsLogin(false);
    } else if (!myProfileState) {
      fetchProfile();
    } else setIsLogin(true);
  }, [dispatch, myProfileState]);

  return isLogin;
};

// redux myProfile에 의존
export const useGetMyProfile = (): ProfileMine | null => {
  return useAppSelector((state) => state.myProfile);
};

export const useGetMyId = () => {
  const myProfile = useGetMyProfile();
  return myProfile?.id;
};

export const useCheckIsMyMembername = (membername: string) => {
  const myProfile = useGetMyProfile();

  try {
    const decodedMembername = decodeURIComponent(membername);
    return myProfile?.membername === decodedMembername;
  } catch (error) {
    return false;
  }
};

export const useCheckIsMyId = (id: number) => {
  return useGetMyId() === id;
};
