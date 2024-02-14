"use client";

import { ExpandRightIcon } from "../../components/IconSvg";
import Topper from "../../components/SubTopper";
import styles from "@/styles/layout/_profileSettingPage.module.scss";
import { useRouter } from "next/navigation";
import LoginAccount from "@/components/LoginAccount";

export default function ProfileSettingPage() {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <Topper msg={"설정"} />
      <section className={styles.innerContainer}>
        <section>
          <p className={styles.categoryMsg}>계정관리</p>
          <div className={styles.button}>
            <LoginAccount RouteState={3}/>
            <button className={styles.logoutButton}>로그아웃</button>
          </div>
          <button
            className={styles.button}
            onClick={() => router.push("/profile/setting/myinfo")}
          >
            <p>내 정보 관리</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/profile/setting/edit")}
          >
            <p>프로필 수정</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
        </section>
        <section>
          <p className={styles.categoryMsg}>서비스 안내</p>
          <button className={styles.button}>
            <p>서비스 이용약관</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
          <button className={styles.button}>
            <p>개인정보 처리방침</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
          <button className={styles.button}>
            <p>오픈소스 라이선스</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
          <button className={styles.button}>
            <p>버전정보 1.1.0</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
        </section>
      </section>
    </section>
  );
}
