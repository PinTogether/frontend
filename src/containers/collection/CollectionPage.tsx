"use client";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Topper from "@/components/SubTopper";
import Pin from "@/types/Pin";
// import PinReview from "@/types/PinReview";
import { PinForPlace } from "@/types/Pin";
import { CollectionPins } from "@/types/Pin";
import Collection, { CollectionDetail } from "@/types/Collection";
import CollectionReply from "@/types/CollectionReply";
import CollectionCard from "@/components/CollectionCard";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  markerDataByAmount,
  latByAmount,
  lngByAmount,
} from "@/redux/locationSlice";
import MarkerData from "@/types/Marker";
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

const newPinDataList2: CollectionPins = {
  centerPin: {
    id: 1,
    collectionId: 1,
    writer: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    address: "서울특별시 마포구 독막로6길 14",
    placeName: "오레노라멘 본점",
    image: "image_path.jpg",
    xPos: 37.547447,
    yPos: 126.917295,
    starred: true,
    category: "음식점",
    tags: ["커피", "디저트", "휴식"],
  },
  pins: [
    {
      id: 2,
      collectionId: 2,
      writer: "user456",
      review: "편안한 분위기에서 즐기는 최고의 커피",
      createdAt: "2023-03-01T15:20:30",
      saveCnt: 40,
      address: "서울특별시 마포구 성지길 39 빌딩 1층",
      placeName: "교다이야",
      image: "image_path2.jpg",
      xPos: 37.546908,
      yPos: 126.913189,
      starred: false,
      category: "음식점",
      tags: ["책", "커피", "조용함"],
    },
    {
      id: 3,
      collectionId: 3,
      writer: "user789",
      review: "경치가 뛰어나고 음식도 훌륭한 곳",
      createdAt: "2023-04-10T18:45:00",
      saveCnt: 55,
      address: "서울특별시 마포구 독막로9길 8 2층",
      placeName: "델리인디아",
      image: "image_path3.jpg",
      xPos: 37.548689,
      yPos: 126.919761,
      starred: true,
      category: "카페",
      tags: ["전망", "고급", "스테이크"],
    },
    {
      id: 4,
      collectionId: 4,
      writer: "user123442",
      review: "경치가 뛰어나고 음식도 훌륭한 곳",
      createdAt: "2023-04-10T18:45:00",
      saveCnt: 50,
      address: "서울특별시 마포구 양화로7길 44-10",
      placeName: "옥동식",
      image: "image_path3.jpg",
      xPos: 37.552651,
      yPos: 126.914491,
      starred: true,
      category: "카페",
      tags: ["전망", "고급", "스테이크"],
    },
  ],
};

const newPinDataList1: CollectionPins = {
  centerPin: {
    id: 1,
    collectionId: 1,
    writer: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    address: "서울특별시 강남구 개포로82길 13-15",
    placeName: "스텔라 떡볶이 개포점",
    image: "image_path.jpg",
    xPos: 37.488832,
    yPos: 127.068301,
    starred: true,
    category: "음식점",
    tags: ["커피", "디저트", "휴식"],
  },
  pins: [
    {
      id: 2,
      collectionId: 2,
      writer: "user456",
      review: "편안한 분위기에서 즐기는 최고의 커피",
      createdAt: "2023-03-01T15:20:30",
      saveCnt: 40,
      address: "서울특별시 강남구 개포동 186-17번지 113호 개포종합상가 지상1층",
      placeName: "연스시",
      image: "image_path2.jpg",
      xPos: 37.489334,
      yPos: 127.068756,
      starred: false,
      category: "음식점",
      tags: ["책", "커피", "조용함"],
    },
    {
      id: 3,
      collectionId: 3,
      writer: "user789",
      review: "경치가 뛰어나고 음식도 훌륭한 곳",
      createdAt: "2023-04-10T18:45:00",
      saveCnt: 55,
      address: "서울특별시 강남구 개포로82길 13-9",
      placeName: "메가MGC커피 개포동역점",
      image: "image_path3.jpg",
      xPos: 37.488641,
      yPos: 127.067717,
      starred: true,
      category: "카페",
      tags: ["전망", "고급", "스테이크"],
    },
  ],
};

const pinDataList: PinForPlace[] = [
  {
    id: 1,
    collectionId: 1,
    writer: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    address: "서울특별시 강남구 개포로82길 13-15",
    placeName: "스텔라 떡볶이 개포점",
    image: "image_path.jpg",
    xPos: 37.488832,
    yPos: 127.068301,
    starred: true,
    category: "음식점",
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
    address: "서울특별시 강남구 개포동 186-17번지 113호 개포종합상가 지상1층",
    placeName: "연스시",
    image: "image_path2.jpg",
    xPos: 37.489334,
    yPos: 127.068756,
    starred: false,
    category: "음식점",
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
    address: "서울특별시 강남구 개포로82길 13-9",
    placeName: "메가MGC커피 개포동역점",
    image: "image_path3.jpg",
    xPos: 37.488641,
    yPos: 127.067717,
    starred: true,
    category: "카페",
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
  const dispatch = useAppDispatch();

  function onChangeShowState(state: number) {
    if (state == showState) {
      setShowState(0);
    } else {
      setShowState(state);
    }
  }

  useEffect(() => {
    makeMarker();
  }, []);

  function makeMarker() { // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    console.log(id);
    let pinDataList;
    if (id == 1) { // 이 부분을 api로 받아온 pinData를 사용하는 식으로 변경
      pinDataList = newPinDataList1;
    } else {
      pinDataList = newPinDataList2;
    }
    const markerList: MarkerData[] = [];
    markerList.push({
      id: pinDataList.centerPin.id,
      placeName: pinDataList.centerPin.placeName,
      xPos: pinDataList.centerPin.xPos,
      yPos: pinDataList.centerPin.yPos,
    });
    for (let i = 0; i < pinDataList.pins.length; i++) {
      markerList.push({
        id: pinDataList.pins[i].id,
        placeName: pinDataList.pins[i].placeName,
        xPos: pinDataList.pins[i].xPos,
        yPos: pinDataList.pins[i].yPos,
      });
    }
    console.log(markerList);
    dispatch(markerDataByAmount(markerList));
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
