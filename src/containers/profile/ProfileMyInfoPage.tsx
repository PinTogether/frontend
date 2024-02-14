"use client";

import { ExpandRightIcon } from "../../components/IconSvg";
import Topper from "../../components/SubTopper";
import styles from "@/styles/layout/_profileSettingPage.module.scss";
import { useRouter } from "next/navigation";

export default function ProfileMyInfoPage() {
  const router = useRouter();
  return (
    <section className={styles.container}>
      <Topper msg={"내 정보 관리"} />
      <section className={styles.innerContainer}>
        <section>
          <p className={styles.categoryMsg}>내 정보 관리</p>
          <button className={styles.button}>
            <p>회원 탈퇴</p>
            <ExpandRightIcon className={styles.expandButton} />
          </button>
        </section>
      </section>
    </section>
  );
}
