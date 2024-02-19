"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useRouter } from "next/navigation";
import { SettingIcon } from "@/components/IconSvg";
import { useState } from "react";
import IProfile from "@/types/IProfile";
import ICollection from "@/types/ICollection";
import ProfileCollectionRenderer from "./ProfileCollectionRenderer";

const profiles: IProfile = {
  userNickname: "김고양",
  userId: 1,
  registrationSource: "KAKAO",
  role: "ROLE_MEMBER",
  avatar: "/images/cat_dummy.jpeg",
  collectionCnt: 5,
  scrappedCollectionCnt: 3,
  likedCollectionCnt: 7,
};

const scrappedCollections: ICollection[] = [
  {
    id: 3,
    title: "강릉 주민 맛집",
    ownerId: 11,
    ownerNickname: "이고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 19,
    title: "강릉 주민 맛집",
    ownerId: 112,
    ownerNickname: "잠자는_짱구의_콧털",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

const LikedCollections: ICollection[] = [
  {
    id: 1,
    title: "강릉 주민 맛집",
    ownerId: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "부산 주민 맛집",
    ownerId: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 2233,
    title: "강릉 안주민 맛집",
    ownerId: 175,
    ownerNickname: "최개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1124,
    title: "아마존 원주민 맛집",
    ownerId: 144,
    ownerNickname: "이개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

const myCollections: ICollection[] = [
  {
    id: 1,
    title: "강릉 주민 맛집",
    ownerId: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "강릉 주민 맛집",
    ownerId: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "강릉 주민 맛집",
    ownerId: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [showState, setShowState] = useState(1);
  const myUserId = 1; // localStorage의 userId와 비교하는것으로 바꾸기 or boolean으로 내꺼인지 반환해주는 함수 만들기

  function onChangeShowState(state: number) {
    if (state == showState) {
      setShowState(1);
    } else {
      setShowState(state);
    }
  }
  return (
    <>
      <section className={styles.profileDataContainer}>
        <div className={styles.profileData}>
          <img
            src={profiles.avatar}
            alt="profile img"
            className={styles.profileImage}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{profiles.userNickname}</p>
            {myUserId === profiles.userId && (
              <button onClick={() => router.push("/profile/setting")}>
                <SettingIcon className={styles.icon} />
              </button>
            )}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b>{profiles.collectionCnt}</b>
              <p>내 컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b>{profiles.likedCollectionCnt}</b>
              <p>좋아요한 컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b>{profiles.scrappedCollectionCnt}</b>
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
        {myUserId === profiles.userId && (
          <button className={styles.buttons}>+ 컬렉션 추가</button>
        )}
      </section>
      {showState===1 && <ProfileCollectionRenderer collectionList={myCollections}/>}
      {showState===2 && <ProfileCollectionRenderer collectionList={LikedCollections}/>}
      {showState===3 && <ProfileCollectionRenderer collectionList={scrappedCollections}/>}
    </>
  );
}
