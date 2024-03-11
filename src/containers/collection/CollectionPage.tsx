"use client";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { markerDataByAmount } from "@/redux/locationSlice";
import MarkerData from "@/types/Marker";
import CollectionWithPinCommentRenderer from "@/containers/collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/containers/collection/CollectionWithPinRenderer";
import CollectionWithReply from "@/containers/collection/CollectionWithReply";

import collectionDatas from "@/../../public/dummy-data/dummy-collection.json";
import pinData from "@/../../public/dummy-data/dummy-pin.json";
import newPinData from "@/../../public/dummy-data/dummy-pin.json";
import pinDataList from "@/../../public/dummy-data/dummy-pin.json";
import newPinData2 from "@/../../public/dummy-data/dummy-pin2.json";
const commentList = pinDataList;
import replyList from "@/../../public/dummy-data/dummy-collection-reply.json";
import SubPageLayout from "../layout/SubPageLayout";

import CollectionInfo from "@/containers/collection/CollectionInfo";

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
    const markerList: MarkerData[] = [];
    for (let i = 0; i < pinDataList.length; i++) {
      markerList.push({
        id: pinDataList[i].id,
        placeName: pinDataList[i].placeName,
        pinCount: pinDataList[i].saveCnt,
        xPos: pinDataList[i].longtitude,
        yPos: pinDataList[i].latitude,
      });
    }
    dispatch(markerDataByAmount(markerList));
  }

  return (
    <SubPageLayout topperMsg={"컬렉션 조회"}>
      <CollectionInfo collectionData={collectionDatas[0]} />
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
        {userId == collectionDatas[0].writerId && (
          <button className={styles.buttons}>+ 핀 추가</button>
        )}
      </section>
      {showState === 1 && <CollectionWithPinRenderer pins={pinDataList} />}
      {showState === 2 && (
        <CollectionWithPinCommentRenderer data={commentList} pin={pinData[0]} />
      )}
      {showState === 3 && <CollectionWithReply replys={replyList} />}
    </SubPageLayout>
  );
}
