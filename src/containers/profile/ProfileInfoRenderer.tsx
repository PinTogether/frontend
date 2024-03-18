"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { SettingIcon } from "@/components/IconSvg";
import { useEffect, useState } from "react";
import { ProfileOthers } from "@/types/Profile";
import Image from "next/image";
import Link from "next/link";
import fetchGetProfileInfo from "@/utils/fetchGetProfileInfo";

const ProfileInfoRenderer = ({ userId }: { userId: number }) => {
  /* fetch data */
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    profileInfo: ProfileOthers | null;
    errorMessage: string;
  }>({
    profileInfo: null,
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchGetProfileInfo(userId);
      setData(result);
      setIsLoading(false);
    };
    if (!isLoading) fetchData();
  }, [userId]);

  return (
    <section id={styles.profileDataContainer}>
      {!data.profileInfo ? (
        `${data.errorMessage}`
      ) : (
        <div className={styles.profileData}>
          <Image
            src={data.profileInfo.avatar}
            alt="profile img"
            className={styles.profileImage}
            width={100}
            height={100}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{data.profileInfo.nickname}</p>
            {/* 내 프로필인지 확인하기 {id == profiles.id && ( ////////// profileData ! */}
            <Link href={"/profile/setting"}>
              <SettingIcon className={styles.icon} />
            </Link>
            {/* )} */}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{data.profileInfo.collectionCnt}</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{data.profileInfo.followerCnt}</b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {data.profileInfo.scrappedCollectionCnt}
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
