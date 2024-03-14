"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { SettingIcon } from "@/components/IconSvg";
import { useEffect, useState } from "react";
import APIResponse from "@/types/APIResponse";
import { ProfileOthers } from "@/types/Profile";
import Image from "next/image";
import Link from "next/link";

const ProfileInfoRenderer = ({ id }: { id: number }) => {
  const [profileData, setProfileData] = useState<ProfileOthers>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoading) getUserInfo();
  }, []);

  const getUserInfo = () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("프로필 정보 가져오기를 실패했습니다.");
        return res.json();
      })
      .then((data: APIResponse) => {
        setProfileData(data.results[0]);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage("프로필 정보 가져오기를 실패했습니다.");
        setIsLoading(false);
      });
  };

  return (
    <section id={styles.profileDataContainer}>
      {isLoading ? (
        "loading skeleton..."
      ) : !profileData ? (
        `${errorMessage}`
      ) : (
        <div className={styles.profileData}>
          <Image
            src={profileData.avatar}
            alt="profile img"
            className={styles.profileImage}
            width={100}
            height={100}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{profileData.nickname}</p>
            {/* {id == profiles.id && ( ////////// profileData ! */}
            <Link href={"/profile/setting"}>
              <SettingIcon className={styles.icon} />
            </Link>
            {/* )} */}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{profileData.collectionCnt}</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {profileData.followerCnt}
                {/* <BookMarkIcon /> */}
              </b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {profileData.scrappedCollectionCnt}
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
