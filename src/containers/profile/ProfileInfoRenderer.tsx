"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { SettingIcon } from "@/components/IconSvg";
import { ProfileOthers } from "@/types/Profile";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import fetchPostFollow from "@/utils/fetchPostFollow";
import fetchDeleteFollow from "@/utils/fetchDeleteFollow";

const ProfileInfoRenderer = ({
  userId,
  profileInfo,
  errorMessage,
  isMyProfile,
}: {
  userId: number;
  profileInfo: ProfileOthers | null;
  errorMessage: string;
  isMyProfile: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO : 로그인 여부 확인
  const [isLogined, setIsLogined] = useState(false);

  const handleClickFollowButton = async () => {
    if (profileInfo || !isLoading || !isMyProfile) {
      setIsLoading(true);
      const { success, errorMessage } = await fetchPostFollow(userId);
      if (!success) {
        console.error(errorMessage);
      }
      setIsLoading(false);
    }
  };

  const handleClickUnfollowButton = async () => {
    if (profileInfo || !isLoading || !isMyProfile) {
      setIsLoading(true);
      const { success, errorMessage } = await fetchDeleteFollow(userId);
      if (!success) {
        console.error(errorMessage);
      }
      setIsLoading(false);
    }
  };

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
            {isMyProfile ? (
              <Link href={"/profile/setting"}>
                <SettingIcon className={styles.icon} />
              </Link>
            ) : profileInfo.followed ? (
              <button
                className={styles.followButton}
                onClick={handleClickFollowButton}
              >
                팔로우 취소
              </button>
            ) : (
              <button
                className={styles.followButton}
                onClick={handleClickUnfollowButton}
              >
                팔로우
              </button>
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
