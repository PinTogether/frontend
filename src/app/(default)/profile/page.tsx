"use client";
import styles from "@/styles/layout/_profilePage.module.scss";
import Topper from "@/components/SubTopper";
import { useRouter } from "next/navigation";
import { SettingIcon } from "@/components/IconSvg";

export default function Page() {
  const router = useRouter();
  return (
    <section className={styles.container}>
      <Topper msg={"내 프로필"} />
      <section className={styles.profileDataContainer}>
        <div className={styles.profileData}>
          <img
            src="/images/cat_dummy.jpeg"
            alt="profile img"
            className={styles.profileImage}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>잠자는_짱구의_콧털</p>
            <button onClick={() => router.push("/profile/setting")}>
              <SettingIcon className={styles.icon}/>
            </button>
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b>10</b>
              <p>내 컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b>24</b>
              <p>좋아요한 컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b>24</b>
              <p>스크랩한 컬렉션</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button className={styles.buttons}>내 컬렉션</button>
        <button className={styles.buttons}>좋아요한 컬렉션</button>
        <button className={styles.buttons}>스크랩한 컬렉션</button>
        <button className={styles.buttons}>+ 컬렉션 추가</button>
      </section>
      <section className={styles.profileListContainer}>
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
        <div className={styles.dummycard} />
      </section>
    </section>
  );
}
