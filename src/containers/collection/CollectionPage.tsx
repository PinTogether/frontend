"use client";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Topper from "@/components/SubTopper";
import Pin from "@/types/Pin";
// import PinReview from "@/types/PinReview";
import { PinForPlace } from "@/types/Pin";
import Collection, { CollectionDetail } from "@/types/Collection";
import CollectionReply from "@/types/CollectionReply";
import CollectionCard from "@/components/CollectionCard";
import { useState } from "react";
import CollectionWithPinCommentRenderer from "@/containers/collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/containers/collection/CollectionWithPinRenderer";
import CollectionWithReply from "@/containers/collection/CollectionWithReply";

const collection: CollectionDetail = {
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
};

const pinData: PinForPlace = {
  id: 1,
  collectionId: 1,
  writer: "user123",
  review: "아름다운 경치와 맛있는 음식",
  createdAt: "2023-02-15T12:34:56",
  saveCnt: 25,
  address: "서울특별시 강남구 어딘가",
  placeName: "멋진 카페",
  image: "image_path.jpg",
  xPos: 37.1234,
  yPos: 127.1234,
  starred: true,
  category: "카페",
  tags: ["커피", "디저트", "휴식"],
  collectionTitle: "서울 핫플레이스",
  imagePaths: ["image_path1.jpg", "image_path2.jpg", "image_path3.jpg"],
  phoneNumber: "02-123-4567",
};

const pinDataList: PinForPlace[] = [
  {
    id: 1,
    collectionId: 1,
    writer: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    address: "서울특별시 강남구 어딘가",
    placeName: "멋진 카페",
    image: "image_path.jpg",
    xPos: 37.1234,
    yPos: 127.1234,
    starred: true,
    category: "카페",
    tags: ["커피", "디저트", "휴식"],
    collectionTitle: "서울 핫플레이스",
    imagePaths: ["image_path1.jpg", "image_path2.jpg", "image_path3.jpg"],
    phoneNumber: "02-123-4567",
  },
  {
    id: 2,
    collectionId: 2,
    writer: "user456",
    review: "편안한 분위기에서 즐기는 최고의 커피",
    createdAt: "2023-03-01T15:20:30",
    saveCnt: 40,
    address: "서울특별시 종로구 다른 곳",
    placeName: "조용한 북카페",
    image: "image_path2.jpg",
    xPos: 37.5759,
    yPos: 126.9769,
    starred: false,
    category: "북카페",
    tags: ["책", "커피", "조용함"],
    collectionTitle: "서울의 숨겨진 보석",
    imagePaths: ["image_path4.jpg", "image_path5.jpg"],
    phoneNumber: "02-654-3210",
  },
  {
    id: 3,
    collectionId: 3,
    writer: "user789",
    review: "경치가 뛰어나고 음식도 훌륭한 곳",
    createdAt: "2023-04-10T18:45:00",
    saveCnt: 55,
    address: "서울특별시 용산구 또 다른 곳",
    placeName: "전망 좋은 레스토랑",
    image: "image_path3.jpg",
    xPos: 37.5283,
    yPos: 126.9827,
    starred: true,
    category: "레스토랑",
    tags: ["전망", "고급", "스테이크"],
    collectionTitle: "서울 미식 탐방",
    imagePaths: ["image_path6.jpg", "image_path7.jpg", "image_path8.jpg"],
    phoneNumber: "02-987-6543",
  },
];

const commentList = pinDataList;

const replyList: CollectionReply[] = [
  {
    id: 1,
    writerId: 101,
    writer: "Alice Johnson",
    writerAvatar: "/images/avatars/jane-doe.jpg",
    contents: "Exploring the city's hidden gems today!",
    createdAt: "2024-02-13T12:00:00Z",
  },
  {
    id: 2,
    writerId: 102,
    writer: "John Smith",
    writerAvatar: "/images/avatars/john-smith.jpg",
    contents: "Had an amazing time at the beach with friends.",
    createdAt: "2024-02-14T12:00:00Z",
  },
  {
    id: 3,
    writerId: 103,
    writer: "Alex Taylor",
    writerAvatar: "/images/avatars/alex-taylor.jpg",
    contents: "Nothing beats a quiet walk in the park.",
    createdAt: "2024-02-15T12:00:00Z",
  },
];

export default function CollectionPage({ id }: { id: number }) {
  const [showState, setShowState] = useState(1);
  const userId = id; // 나중에 localStorage 같은곳에 있는 내 id와 비교하는걸로 변경
  function onChangeShowState(state: number) {
    if (state == showState) {
      setShowState(0);
    } else {
      setShowState(state);
    }
  }

  return (
    <section className={styles.container}>
      <Topper msg={"컬렉션(장소모음) 조회"} />
      <section className={styles.collectionDataContainer}>
        <div className={styles.collectionData}>
          <CollectionCard collectionData={collection} detail={true} />
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button
          className={`${styles.buttons} ${showState == 1 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(1)}
        >
          핀 보기
        </button>
        <button
          className={`${styles.buttons} ${showState == 2 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(2)}
        >
          핀 리뷰 같이 보기
        </button>
        <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          컬렉션 댓글 보기
        </button>
        {userId == collection.writerId && (
          <button className={styles.buttons}>+ 핀 추가</button>
        )}
      </section>
      {showState === 1 && <CollectionWithPinRenderer pins={pinDataList} />}
      {showState === 2 && (
        <CollectionWithPinCommentRenderer data={commentList} pin={pinData} />
      )}
      {showState === 3 && <CollectionWithReply replys={replyList} />}
    </section>
  );
}
