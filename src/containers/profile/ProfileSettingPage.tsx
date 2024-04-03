"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/styles/containers/profile/_profileSettingPage.module.scss";
import LoginAccount from "@/containers/profile/LoginAccount";
import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";

import { useGetMyProfile } from "@/hooks/myProfileHooks";
import { useLogout } from "@/hooks/useLogout";

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
  const logout = useLogout();
  const [loginType, setLoginType] = useState<LoginType | undefined>(undefined);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    LoginStatus.LOGOUT
  );
  const profile = useGetMyProfile();

  useEffect(() => {
    if (profile) {
      setLoginStatus(LoginStatus.LOGIN);
      const loginType = profile.registrationSource;
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

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper>
          <LoginAccount isLogin={loginStatus} loginType={loginType} />
          {loginStatus === LoginStatus.LOGIN && (
            <button className={styles.logoutButton} onClick={logout}>
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
