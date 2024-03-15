"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { SettingIcon } from "@/components/IconSvg";
import APIResponse from "@/types/APIResponse";
import { ProfileOthers } from "@/types/Profile";
import Image from "next/image";
import Link from "next/link";

const GetUserInfo = async ({id}:{id:number}) => {

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${id}`
  ).then((res) => (res.ok ? res.json() : { avatar: "GET failed" }));
  console.log(result.results[0]);
  if (result.results[0].avatar != "GET failed") {
    return (
      <section id={styles.profileDataContainer}>
        <div className={styles.profileData}>
          <Image
            src={result.results[0].avatar}
            alt="profile img"
            className={styles.profileImage}
            width={100}
            height={100}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{result.results[0].nickname}</p>
            {/* {id == profiles.id && ( ////////// profileData ! */}
            <Link href={"/profile/setting"}>
              <SettingIcon className={styles.icon} />
            </Link>
            {/* )} */}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{result.results[0].collectionCnt}</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {result.results[0].followerCnt}
                {/* <BookMarkIcon /> */}
              </b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{result.results[0].scrappedCollectionCnt}</b>
              <p className={styles.text}>팔로워</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  else{
    return(
      <div>Get failed</div>
    )
  }
};


const ProfileInfoRenderer = ({ id }: { id: number }) => {

  return <GetUserInfo id={id}/>;
};

export default ProfileInfoRenderer;
