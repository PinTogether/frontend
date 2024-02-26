"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useRouter } from "next/navigation";
import { SettingIcon } from "@/components/IconSvg";
import { useState } from "react";
import { ProfileMine } from "@/types/Profile";
import { CollectionDetail } from "@/types/Collection";
import { PlaceStarred } from "@/types/Place";
import ProfileCollectionRenderer from "./ProfileCollectionRenderer";
import ProfileBookmarkRenderer from "./ProfileBookmarkRenderer";

const profiles: ProfileMine = {
  nickname: "김고양",
  userId: 1,
  registrationSource: "KAKAO",
  role: "ROLE_MEMBER",
  avatar: "/images/cat_dummy.jpeg",
  collectionCnt: 5,
  scrappedCollectionCnt: 3,
  followerCnt: 7,
  followingCnt: 3,
};

const bookmarksList: PlaceStarred[] = [
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

const scrappedCollections: CollectionDetail[] = [
  {
    id: 1,
    title: "서울의 숨은 맛집",
    writerId: 100,
    writer: "FoodieKim",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 150,
    pinCnt: 5,
    scrapCnt: 75,
    isScrapped: false,
    isLiked: true,
    details:
      "서울 곳곳의 숨은 맛집을 소개합니다. 각종 매체에 소개되지 않은, 현지인만 아는 그런 곳들이죠.",
    tags: ["맛집", "서울", "현지인추천"],
    commentCnt: 45,
  },
  {
    id: 2,
    title: "주말 가볼만한 곳",
    writerId: 101,
    writer: "TravelPark",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 200,
    pinCnt: 8,
    scrapCnt: 50,
    isScrapped: true,
    isLiked: false,
    details:
      "주말에 친구, 연인, 가족과 함께 가볼 만한 곳들을 모아봤습니다. 자연에서의 힐링, 문화생활을 즐길 수 있는 곳 등 다양합니다.",
    tags: ["주말", "여행", "가족여행"],
    commentCnt: 30,
  },
  {
    id: 3,
    title: "해외 여행지 추천",
    writerId: 102,
    writer: "GlobeTrotter",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 300,
    pinCnt: 12,
    scrapCnt: 120,
    isScrapped: true,
    isLiked: true,
    details:
      "코로나 이후 다시 떠나고 싶은 해외 여행지들을 추천합니다. 아시아, 유럽, 아메리카 등 다양한 대륙의 숨겨진 보석 같은 곳들을 소개해요.",
    tags: ["해외여행", "여행지추천", "바캉스"],
    commentCnt: 60,
  },
];

const followCollections = scrappedCollections;
const myCollections = scrappedCollections;

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
            <p>{profiles.nickname}</p>
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
