"use client";

import styles from "@/styles/containers/profile/_profileSettingPage.module.scss";
import { useRouter } from "next/navigation";
import LoginAccount from "@/containers/profile/LoginAccount";
import InfoListLayout, { UlWrapper, LiWrapper } from "../layout/InfoListLayout";

export default function ProfileSettingPage() {
  const router = useRouter();
  const loginRoute = 1; // 카카오 1, 네이버 2, 구글 3
  const isLogin = 1; // 로그인은 1 로그아웃인 0

  return (
    <InfoListLayout>
      <UlWrapper categoryTitle="계정관리">
        <LiWrapper>
          <LoginAccount isLogin={isLogin} RouteState={loginRoute} />
          {isLogin === 1 && (
            <button className={styles.logoutButton}>로그아웃</button>
          )}
        </LiWrapper>
        <LiWrapper onClick={() => router.push("/profile/setting/myinfo")}>
          내 정보 관리
        </LiWrapper>
        <LiWrapper onClick={() => router.push("/profile/setting/edit")}>
          프로필 수정
        </LiWrapper>
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
