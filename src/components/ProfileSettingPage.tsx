"use client";

import { ExpandRightIcon } from "./IconSvg";
import Topper from "./SubTopper";
import styles from "@/styles/layout/_profileSettingPage.module.scss";
import { useRouter } from "next/navigation";

export default function ProfileSettingPage() {
  const router = useRouter();
  return (
    <section className={styles.container}>
      <Topper msg={"설정"} />
      <section className={styles.innerContainer}>
        <section>
          <p className={styles.categoryMsg}>계정관리</p>
          <button className={styles.button}>
            <p>카카오 계정 회원</p>
            <button className={styles.logoutButton}>로그아웃</button>
          </button>
          <button className={styles.button}>
            <p>내 정보 관리</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/profile/edit")}
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
