"use client";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { markerDataByAmount } from "@/redux/locationSlice";
import MarkerData from "@/types/Marker";
import CollectionWithPinCommentRenderer from "@/containers/collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/containers/collection/CollectionWithPinRenderer";
import CollectionWithReplyRenderer from "@/containers/collection/CollectionWithReply";
import { CollectionDetail } from "@/types/Collection";
import { PinForPlace } from "@/types/Pin";

import { useRouter } from "next/navigation";

import replyList from "@/../../public/dummy-data/dummy-collection-reply.json";
import SubPageLayout from "../layout/SubPageLayout";

import CollectionInfoRenderer from "@/containers/collection/CollectionInfoRenderer";

import fetchGetCollectionInfo from "@/utils/fetchGetCollectionInfo";
import fetchGetPinInfo from "@/utils/fetchGetPinInfo";

export default function CollectionPage({
  collectionId,
}: {
  collectionId: number;
}) {
  const router = useRouter();
  const [isMyCollection, setIsMyCollection] = useState(true);

  /* fetch data */
  const [isCollectionFetching, setIsCollectionFetching] = useState(false);
  const [isPinFetching, setIsPinFetching] = useState(false);
  const [collectionFetchDatas, setCollectionFetchDatas] = useState<{
    collectionInfo: CollectionDetail | null;
    errorMessage: string;
  }>({
    collectionInfo: null,
    errorMessage: "",
  });
  const [pinFetchDatas, setPinFetchDatas] = useState<{
    pinInfo: PinForPlace[] | null;
    errorMessage: string;
  }>({
    pinInfo: null,
    errorMessage: "",
  });

  const getCollectionData = async () => {
    if (isCollectionFetching) return;
    setIsCollectionFetching(true);
    const result = await fetchGetCollectionInfo(collectionId);
    setCollectionFetchDatas(result);
    setIsCollectionFetching(false);
  };
  const getPinData = async () => {
    if (isPinFetching) return;
    setIsPinFetching(true);
    const result = await fetchGetPinInfo(collectionId);
    setPinFetchDatas(result);
    setIsPinFetching(false);
  };

  /* button state */
  const [showState, setShowState] = useState(1);
  const onChangeShowState = (state: number) => {
    if (state == showState) {
      setShowState(0);
    } else {
      setShowState(state);
    }
  };

  /* 지도 */
  const dispatchMarker = useAppDispatch();
  const makeMarker = () => {
    // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    if (!pinFetchDatas.pinInfo) return;
    const markerList: MarkerData[] = [];
    for (let i = 0; i < pinFetchDatas.pinInfo.length; i++) {
      markerList.push({
        id: pinFetchDatas.pinInfo[i].id,
        placeName: pinFetchDatas.pinInfo[i].placeName,
        pinCount: pinFetchDatas.pinInfo[i].saveCnt,
        xPos: pinFetchDatas.pinInfo[i].longtitude,
        yPos: pinFetchDatas.pinInfo[i].latitude,
      });
    }
    dispatchMarker(markerDataByAmount(markerList));
  };

  useEffect(() => {
    getCollectionData();
    getPinData();
  }, []);

  useEffect(() => {
    if (collectionFetchDatas.collectionInfo) {
      // TODO : 로그인한 유저의 컬렉션인지 확인하는 로직 추가 (isMyCollection)
      // setIsMyCollection(true);
    }
  }, [collectionFetchDatas]);

  useEffect(() => {
    if (pinFetchDatas.pinInfo) {
      console.log("pinFetchDatas.pinInfo", pinFetchDatas.pinInfo);
      makeMarker();
    }
  }, [pinFetchDatas]);

  return (
    <SubPageLayout
      topperMsg={"컬렉션 조회"}
      completeButtonMsg={isMyCollection ? "수정" : undefined}
      onClickCompleteButton={() =>
        router.push(`/collection/edit/${collectionId}`)
      }
    >
      {collectionFetchDatas.collectionInfo && (
        <CollectionInfoRenderer
          collectionData={collectionFetchDatas.collectionInfo}
          isMyCollection={isMyCollection}
        />
      )}
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
        {isMyCollection && (
          <button className={styles.buttons}>+ 핀 추가</button>
        )}
      </section>
      {showState === 1 && pinFetchDatas.pinInfo && (
        <CollectionWithPinRenderer pins={pinFetchDatas.pinInfo} />
      )}
      {showState === 2 && pinFetchDatas.pinInfo && (
        <CollectionWithPinCommentRenderer data={pinFetchDatas.pinInfo} />
      )}
      {showState === 3 && <CollectionWithReplyRenderer replys={replyList} />}
    </SubPageLayout>
  );
}
