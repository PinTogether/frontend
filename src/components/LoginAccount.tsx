import styles from "@/styles/layout/_profileSettingPage.module.scss";
import Image from "next/image";

const LoginAccount = ({ RouteState }: { RouteState?: number }) => {
  if (RouteState === 1) {
    return (
      <p className={styles.loginRoute}>
        <div className={styles.loginImgContainerKakao}>
          <Image width={20} height={20} src={"/logo/kakao.svg"} alt="kakao"/>
        </div>
        카카오 계정 회원
      </p>
    );
  } else if (RouteState === 2) {
    return (
      <p className={styles.loginRoute}>
        <div className={styles.loginImgContainerNaver}>
        <Image width={20} height={20} src={"/logo/naver.svg"} alt="naver"/>
        </div>
        네이버 계정 회원
      </p>
    );
  } else if (RouteState === 3) {
    return (
      <p className={styles.loginRoute}>
        <div className={styles.loginImgContainerGoogle}>
        <Image width={20} height={20} src={"/logo/google.svg"} alt="google"/>
        </div>
        구글 계정 회원
      </p>
    );
  } else {
    return <p className={styles.loginRoute}>로그인 하기</p>;
  }
}

export default LoginAccount;
