import styles from "@/styles/containers/profile/_profileSettingPage.module.scss";
import Image from "next/image";

// TODO LoginType을 못 읽어와서 임시로 선언
// import { LoginType } from "./ProfileSettingPage";
export enum LoginType {
  KAKAO = 1,
  NAVER = 2,
  GOOGLE = 3,
}

const loginRoutes = {
  [LoginType.KAKAO]: {
    className: styles.loginImgContainerKakao,
    src: "/logo/kakao.svg",
    alt: "kakao",
    text: "카카오 계정 회원",
  },
  [LoginType.NAVER]: {
    className: styles.loginImgContainerNaver,
    src: "/logo/naver.svg",
    alt: "naver",
    text: "네이버 계정 회원",
  },
  [LoginType.GOOGLE]: {
    className: styles.loginImgContainerGoogle,
    src: "/logo/google.svg",
    alt: "google",
    text: "구글 계정 회원",
  },
};

const LoginAccount = ({
  loginType,
  isLogin,
}: {
  loginType?: LoginType;
  isLogin?: number;
}) => {
  if (isLogin && loginType) {
    const route = loginRoutes[loginType];
    if (route) {
      return (
        <div className={styles.loginRoute}>
          <div className={route.className}>
            <Image width={20} height={20} src={route.src} alt={route.alt} />
          </div>
          {route.text}
        </div>
      );
    }
  }
  return <div className={styles.loginRoute}>로그인 하기</div>;
};

export default LoginAccount;
