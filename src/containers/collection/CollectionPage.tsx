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
import { useState } from "react";
import CollectionWithPinCommentRenderer from "@/containers/collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/containers/collection/CollectionWithPinRenderer";
import CollectionWithReply from "@/containers/collection/CollectionWithReply";

import collectionData from "@/../../public/dummy-data/dummy-collection.json";
import pinData from "@/../../public/dummy-data/dummy-pin.json";
import newPinData from "@/../../public/dummy-data/dummy-pin.json";
import pinDataList from "@/../../public/dummy-data/dummy-pin.json";
const commentList = pinDataList;
import replyList from "@/../../public/dummy-data/dummy-collection-reply.json";

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
          <CollectionCard collectionData={collectionData[0]} detail={true} />
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
        {userId == collectionData[0].writerId && (
          <button className={styles.buttons}>+ 핀 추가</button>
        )}
      </section>
      {showState === 1 && <CollectionWithPinRenderer pins={pinDataList} />}
      {showState === 2 && (
        <CollectionWithPinCommentRenderer data={commentList} pin={pinData[0]} />
      )}
      {showState === 3 && <CollectionWithReply replys={replyList} />}
    </section>
  );
}
