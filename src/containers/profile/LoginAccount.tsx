import styles from "@/styles/containers/profile/_profileSettingPage.module.scss";
import Image from "next/image";

enum LoginRoute {
  Kakao = 1,
  Naver,
  Google,
}

const loginRoutes = {
  [LoginRoute.Kakao]: {
    className: styles.loginImgContainerKakao,
    src: "/logo/kakao.svg",
    alt: "kakao",
    text: "카카오 계정 회원",
  },
  [LoginRoute.Naver]: {
    className: styles.loginImgContainerNaver,
    src: "/logo/naver.svg",
    alt: "naver",
    text: "네이버 계정 회원",
  },
  [LoginRoute.Google]: {
    className: styles.loginImgContainerGoogle,
    src: "/logo/google.svg",
    alt: "google",
    text: "구글 계정 회원",
  },
};

const LoginAccount = ({
  RouteState, // RouteState ?
  isLogin,
}: {
  RouteState?: LoginRoute;
  isLogin?: number;
}) => {
  if (isLogin && RouteState) {
    const route = loginRoutes[RouteState];
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
