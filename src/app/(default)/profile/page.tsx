"use client";
import styles from "@/styles/layout/_profilePage.module.scss";
import Topper from "@/components/SubTopper";

export default function Page() {
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
            <button>
              <img
                src="/icon/edit_plain.svg"
                alt="edit icon"
                className={styles.icon}
                style={{ paddingLeft: "5px" }}
              />
            </button>
          </div>
          <div className={styles.profileLog}>
            <p>
              내 지도 모음 <b>10</b>
            </p>
            <p>
              좋아요한 지도 모음 <b>24</b>
            </p>
          </div>
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button className={styles.buttons}>내 지도</button>
        <button className={styles.buttons}>좋아요한 지도</button>
        <button className={styles.buttons}>+ 장소 추가</button>
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
