"use client";

import styles from "@/styles/containers/profile/_profileSettingPage.module.scss";
import { useState, useEffect } from "react";
import LoginAccount from "@/containers/profile/LoginAccount";
import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";
import Link from "next/link";
import { ProfileMine } from "@/types/Profile";
import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";

export enum LoginType {
  KAKAO = 1,
  NAVER = 2,
  GOOGLE = 3,
}

enum LoginStatus {
  LOGIN = 1,
  LOGOUT = 0,
}

export default function ProfileSettingPage() {
  const [loginType, setLoginType] = useState<LoginType | undefined>(undefined);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    LoginStatus.LOGOUT
  );

  const [myInfo, setMyInfo] = useState<ProfileMine | null>(null);

  useEffect(() => {
    const myInfo = getMyProfileFromLocalStorage();
    setMyInfo(myInfo);
    if (myInfo) {
      setLoginStatus(LoginStatus.LOGIN);
      const loginType = myInfo.registrationSource;
      setLoginType(
        loginType === "KAKAO"
          ? LoginType.KAKAO
          : loginType === "NAVER"
            ? LoginType.NAVER
            : loginType === "GOOGLE"
              ? LoginType.GOOGLE
              : undefined
      );
    }
  }, []);

  const handleClickLogout = () => {
    // TODO : 로그아웃 처리
    // TODO : "myProfile", "Authorization"을 env로 변경하기

    // delete cookies
    deleteCookie("Authorization");
    // clear local storage
    localStorage.removeItem("myProfile");
    // redirect to login page
    window.location.href = "/login";
  };

  // TODO : react-cookie 사용으로 변경하기
  const deleteCookie = (name: string, path: string = "/") => {
    const domain = window.location.hostname;
    let cookieString =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
    if (domain) {
      cookieString += "; domain=" + domain;
    }
    document.cookie = cookieString;
  };

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper>
          <LoginAccount isLogin={loginStatus} loginType={loginType} />
          {loginStatus === LoginStatus.LOGIN && (
            <button className={styles.logoutButton} onClick={handleClickLogout}>
              로그아웃
            </button>
          )}
        </LiWrapper>
        {loginStatus === LoginStatus.LOGIN && (
          <>
            <Link href="/profile/setting/myinfo">
              <LiWrapper showExpandButton={true}>내 정보 관리</LiWrapper>
            </Link>
            <Link href="/profile/setting/edit">
              <LiWrapper showExpandButton={true}>프로필 수정</LiWrapper>
            </Link>
          </>
        )}
      </UlWrapper>
      <UlWrapper categoryTitle="서비스 안내">
        <LiWrapper>서비스 이용약관</LiWrapper>
        <LiWrapper>개인정보 처리방침</LiWrapper>
        <LiWrapper>오픈소스 라이선스</LiWrapper>
        <LiWrapper>버전정보 1.1.0</LiWrapper>
      </UlWrapper>
    </InfoListLayout>
  );
}
