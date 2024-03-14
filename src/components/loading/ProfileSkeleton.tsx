import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { AvatarImageSkeleton, TextBoxSkeleton } from "./SkeletonImage";

export default function ProfileSkeleton() {
  return (
    <section className={styles.profileDataContainer}>
      <div className={styles.profileData}>
        <AvatarImageSkeleton />
        <div className={styles.profileName}>
          <div></div>
          <TextBoxSkeleton widthLen="100px" heightLen="35px" />
          <div></div>
        </div>
        <div className={styles.profileLog}>
          <div className={styles.profileLogBox}>
            <b>0</b>
            <p>내 컬렉션</p>
          </div>
          <div className={styles.profileLogBox}>
            <b>0</b>
            <p>스크랩한 컬렉션</p>
          </div>
          <div className={styles.profileLogBox}>
            <b>0</b>
            <p>팔로워 수</p>
          </div>
        </div>
      </div>
    </section>
  );
}
