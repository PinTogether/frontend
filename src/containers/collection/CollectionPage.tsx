"use client";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Topper from "@/components/SubTopper";
import IPin from "@/types/IPin";
import IComment from "@/types/IComment";
import ICollection from "@/types/ICollection";
import ICollectionReply from "@/types/ICollectionReply";
import CollectionCard from "@/components/CollectionCard";
import { useState } from "react";
import CollectionWithPinCommentRenderer from "@/components/Collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/components/Collection/CollectionWithPinRenderer";
import CollectionWithReply from "@/components/Collection/CollectionWithReply";

const collection: ICollection = {
  id: 1,
  title: "강릉 주민 맛집",
  ownerId: 1,
  ownerNickname: "잠자는_짱구의_콧털",
  thumbnail: "https://picsum.photos/id/326/300",
  detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
  likeCnt: 12,
  pinCnt: 5,
};

const pinData: IPin = {
  id: 1,
  serviceId: "서울특별시 강남구 역삼동 123-45",
  localCode: 1,
  localManageCode: "12345",
  statusNumber: 1,
  status: "정상",
  phone: "02-1234-5678",
  zipCode: "12345",
  roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
  roadNameAddress: "서울특별시 강남구 역삼로 123-45",
  roadZipCode: "12345",
  placeName: "포카리스웨트 강남역점 1호점",
  category: "음식점업",
  x: 127.028,
  y: 37.498,
  comment: "음식점업", // 작성자의 코멘트
};

const pinDataList: IPin[] = [
  {
    id: 1,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "포카리스웨트 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 1,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "포카리스웨트 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 1,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "포카리스웨트 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 1,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "포카리스웨트 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
];

const commentList: IComment[] = [
  {
    id: 1,
    userId: 1,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
];

const replyList:ICollectionReply[] = [
    {
      id: 1,
      userId: 101,
      userNickname: "김고양",
      userAvatar: "/images/cat_dummy.jpeg",
      comment: "맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!맛있어용!",
      createdAt: "2024-02-13T12:00:00Z"
    },
    {
      id: 2,
      userId: 102,
      userNickname: "이고양",
      userAvatar: "/images/cat_dummy.jpeg",
      comment: "맛있어용 2!",
      createdAt: "2024-02-15T16:24:00Z"
    },
    {
      id: 3,
      userId: 103,
      userNickname: "최고양",
      userAvatar: "/images/cat_dummy.jpeg",
      comment: "맛있어용 3!",
      createdAt: "2024-02-17T12:00:00Z"
    },
];

export default function CollectionPage() {
  const [showState, setShowState] = useState(1);

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
          핀 코멘트 같이 보기
        </button>
        <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          컬렉션 댓글 보기
        </button>
        <button className={styles.buttons}>+ 핀 추가</button>
      </section>
      {showState === 1 && <CollectionWithPinRenderer pins={pinDataList} />}
      {showState === 2 && (
        <CollectionWithPinCommentRenderer data={commentList} pin={pinData} />
      )}
      {showState === 3 && (
        <CollectionWithReply replys={replyList} />
      )}
    </section>
  );
}
