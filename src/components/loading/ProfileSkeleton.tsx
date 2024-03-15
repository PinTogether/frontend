import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { AvatarImageSkeleton, TextBoxSkeleton } from "./SkeletonImage";

export default function ProfileSkeleton() {
  return (
    <section id={styles.profileDataContainer}>
        <div className={styles.profileData}>
          <AvatarImageSkeleton />
          <div className={styles.profileName}>
            <div></div>
            <TextBoxSkeleton widthLen="60px" heightLen="35px" />
            {/* {id == profiles.id && ( ////////// profileData ! */}
            <div></div>
            {/* )} */}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>0</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
            <b className={styles.number}>0</b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
              <b className={styles.number}>0</b>
              </b>
              <p className={styles.text}>팔로워</p>
            </div>
          </div>
        </div>
    </section>
  );
}
