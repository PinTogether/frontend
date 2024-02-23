"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useRouter } from "next/navigation";
import { SettingIcon } from "@/components/IconSvg";
import { useState } from "react";
import IProfile from "@/types/IProfile";
import ICollection from "@/types/ICollection";
import IBookmark from "@/types/IBookmark";
import ProfileCollectionRenderer from "./ProfileCollectionRenderer";
import ProfileBookmarkRenderer from "./ProfileBookmarkRenderer";

const profiles: IProfile = {
  userNickname: "김고양",
  userId: 1,
  registrationSource: "KAKAO",
  role: "ROLE_MEMBER",
  avatar: "/images/cat_dummy.jpeg",
  collectionCnt: 5,
  scrappedCollectionCnt: 3,
  followerCnt: 7,
};

const bookmarksList: IBookmark[] = [
  {
    id: 1,
    address: "서울특별시 강남구 개포로 302-1",
    name: "김첨지네 설렁탕",
    category: "FOOD",
    created_at: "2023-12-04T00:00:00Z",
  },
  {
    id: 2,
    address: "서울특별시 강남구 언주로 17-3",
    name: "치킨치킨",
    category: "FOOD",
    created_at: "2022-01-07T00:00:00Z",
  },
  {
    id: 3,
    address: "서울특별시 강남구 중앙대로 11",
    name: "피자피자피자피자",
    category: "FOOD",
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: 4,
    address: "서울특별시 강남구 중앙대로 11",
    name: "피자피자",
    category: "FOOD",
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: 5,
    address: "서울특별시 강남구 중앙대로 11",
    name: "피자피자",
    category: "FOOD",
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: 6,
    address: "서울특별시 강남구 중앙대로 11",
    name: "피자피자",
    category: "FOOD",
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: 7,
    address: "서울특별시 강남구 중앙대로 11",
    name: "피자피자",
    category: "FOOD",
    created_at: "2024-01-07T00:00:00Z",
  },
];

const scrappedCollections: ICollection[] = [
  {
    id: 3,
    title: "강릉 주민 맛집",
    writer: 11,
    ownerNickname: "이고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 19,
    title: "강릉 주민 맛집",
    writer: 112,
    ownerNickname: "잠자는_짱구의_콧털",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

const followCollections: ICollection[] = [
  {
    id: 1,
    title: "강릉 주민 맛집",
    writer: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "부산 주민 맛집",
    writer: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 2233,
    title: "강릉 안주민 맛집",
    writer: 175,
    ownerNickname: "최개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1124,
    title: "아마존 원주민 맛집",
    writer: 144,
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
    writer: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "강릉 주민 맛집",
    writer: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "강릉 주민 맛집",
    writer: 1,
    ownerNickname: "김고양",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

export default function ProfilePage({ id }: { id: number }) {
  const router = useRouter();
  const [showState, setShowState] = useState(1);
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
            {id == profiles.userId && (
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
              <b>{profiles.followerCnt}</b>
              <p>스크랩한 컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b>{profiles.scrappedCollectionCnt}</b>
              <p>팔로워 수</p>
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
          스크랩한 컬렉션
        </button>
        <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          팔로우한 컬렉션
        </button>
        {id == profiles.userId && (
          <button
            className={`${styles.buttons} ${showState == 4 ? styles.clickedButtons : ""}`}
            onClick={() => onChangeShowState(4)}
          >
            찜 목록 보기
          </button>
        )}
        {id == profiles.userId && (
          <button
            className={styles.buttons}
            onClick={() => router.push("/collection/edit")}
          >
            + 컬렉션 추가
          </button>
        )}
      </section>
      {showState === 1 && (
        <ProfileCollectionRenderer collectionList={myCollections} />
      )}
      {showState === 2 && (
        <ProfileCollectionRenderer collectionList={followCollections} />
      )}
      {showState === 3 && (
        <ProfileCollectionRenderer collectionList={scrappedCollections} />
      )}
      {showState === 4 && <ProfileBookmarkRenderer bookmarks={bookmarksList} />}
    </>
  );
}
