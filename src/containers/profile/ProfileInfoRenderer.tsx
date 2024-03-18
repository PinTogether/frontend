"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { SettingIcon } from "@/components/IconSvg";
import { ProfileOthers } from "@/types/Profile";
import Image from "next/image";
import Link from "next/link";

const ProfileInfoRenderer = ({
  profileInfo,
  errorMessage,
  isMyProfile,
}: {
  profileInfo: ProfileOthers | null;
  errorMessage: string;
  isMyProfile: boolean;
}) => {
  return (
    <section id={styles.profileDataContainer}>
      {!profileInfo ? (
        `${errorMessage}`
      ) : (
        <div className={styles.profileData}>
          <Image
            src={profileInfo.avatar}
            alt="profile img"
            className={styles.profileImage}
            width={100}
            height={100}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{profileInfo.nickname}</p>
            {isMyProfile && (
              <Link href={"/profile/setting"}>
                <SettingIcon className={styles.icon} />
              </Link>
            )}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{profileInfo.collectionCnt}</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{profileInfo.followerCnt}</b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {profileInfo.scrappedCollectionCnt}
              </b>
              <p className={styles.text}>팔로워</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default ProfileInfoRenderer;
