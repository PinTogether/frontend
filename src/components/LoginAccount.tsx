import styles from "@/styles/layout/_profileSettingPage.module.scss";
import Image from "next/image";

const LoginAccount = ({
  RouteState,
  isLogin,
}: {
  RouteState?: number;
  isLogin?: number;
}) => {
  if (isLogin === 1) {
    if (RouteState === 1) {
      return (
        <div className={styles.loginRoute}>
          <div className={styles.loginImgContainerKakao}>
            <Image width={20} height={20} src={"/logo/kakao.svg"} alt="kakao" />
          </div>
          카카오 계정 회원
        </div>
      );
    } else if (RouteState === 2) {
      return (
        <div className={styles.loginRoute}>
          <div className={styles.loginImgContainerNaver}>
            <Image width={20} height={20} src={"/logo/naver.svg"} alt="naver" />
          </div>
          네이버 계정 회원
        </div>
      );
    } else if (RouteState === 3) {
      return (
        <div className={styles.loginRoute}>
          <div className={styles.loginImgContainerGoogle}>
            <Image
              width={20}
              height={20}
              src={"/logo/google.svg"}
              alt="google"
            />
          </div>
          구글 계정 회원
        </div>
      );
    }
  } else {
    return <div className={styles.loginRoute}>로그인 하기</div>;
  }
};

export default LoginAccount;
