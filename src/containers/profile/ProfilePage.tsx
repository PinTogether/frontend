"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import Topper from "@/components/SubTopper";
import { useRouter } from "next/navigation";
import { SettingIcon } from "@/components/IconSvg";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [showState, setShowState] = useState(0);
  function onChangeShowState(state: number) {
    if (state == showState) {
      setShowState(0);
    } else {
      setShowState(state);
    }
  }
  return (
    <>
      {/* <Topper msg={"내 프로필"} /> */}
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
              <SettingIcon className={styles.icon} />
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
        <button
          className={`${styles.buttons} ${showState == 1 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(1)}
        >
          내 컬렉션
        </button>
        <button
          className={`${styles.buttons} ${showState == 2 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(2)}
        >
          좋아요한 컬렉션
        </button>
        <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          스크랩한 컬렉션
        </button>
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
    </>
  );
}
