"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { markerDataByAmount } from "@/redux/locationSlice";
import { initialPinSelectPageState } from "@/redux/pinSelectPageSlice";

import fetchGetCollectionInfo from "@/utils/collections/fetchGetCollectionInfo";
import fetchGetCollectionAllPins from "@/utils/collections/fetchGetCollectionAllPins";
import fetchGetCollectionComments from "@/utils/collections/fetchGetCollectionComments";
import useGetMyProfile from "@/hooks/useGetMyProfile";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import MarkerData from "@/types/Marker";
import { CollectionDetail } from "@/types/Collection";
import { PinForPlace } from "@/types/Pin";
import CollectionReply from "@/types/CollectionReply";
import { ProfileMine } from "@/types/Profile";

import SubPageLayout from "../layout/SubPageLayout";
import CollectionWithPinCommentRenderer from "@/containers/collection/CollecionWithPinCommentRenderer";
import CollectionWithPinRenderer from "@/containers/collection/CollectionWithPinRenderer";
import CollectionReplyRenderer from "@/containers/collection/CollectionReplyRenderer";
import CollectionInfoRenderer from "@/containers/collection/CollectionInfoRenderer";
import BouncingLoader from "@/components/BouncingLoader";

export default function CollectionPage({
  collectionId,
}: {
  collectionId: number;
}) {
  const router = useRouter();
  const myProfile = useGetMyProfile();
  const [isMyCollection, setIsMyCollection] = useState(false);

  /* fetch data */
  const [isCollectionFetching, setIsCollectionFetching] = useState(false);
  const [isPinFetching, setIsPinFetching] = useState(false);
  const [isReplyFetching, setIsReplyFetching] = useState(false);
  const [collectionFetchDatas, setCollectionFetchDatas] = useState<{
    collectionInfo: CollectionDetail | null;
    errorMessage: string;
  }>({
    collectionInfo: null,
    errorMessage: "",
  });
  const [pinFetchDatas, setPinFetchDatas] = useState<{
    pinList: PinForPlace[] | null;
    errorMessage: string;
  }>({
    pinList: null,
    errorMessage: "",
  });
  const [replyFetchDatas, setReplyFetchDatas] = useState<{
    replyDatas: CollectionReply[] | null;
    errorMessage: string;
  }>({
    replyDatas: null,
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
    const result = await fetchGetCollectionAllPins(collectionId);
    setPinFetchDatas(result);
    setIsPinFetching(false);
  };
  const getReplyData = async () => {
    if (isReplyFetching) return;
    setIsReplyFetching(true);
    const result = await fetchGetCollectionComments(collectionId);
    setReplyFetchDatas(result);
    setIsReplyFetching(false);
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
  const dispatch = useAppDispatch();
  const makeMarker = () => {
    // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    if (!pinFetchDatas.pinList) return;
    const markerList: MarkerData[] = [];
    for (let i = 0; i < pinFetchDatas.pinList.length; i++) {
      markerList.push({
        id: pinFetchDatas.pinList[i].id,
        placeId: pinFetchDatas.pinList[i].placeId,
        placeName: pinFetchDatas.pinList[i].placeName,
        pinCount: pinFetchDatas.pinList[i].saveCnt,
        latitude: pinFetchDatas.pinList[i].latitude,
        longitude: pinFetchDatas.pinList[i].longitude,
      });
    }
    dispatch(markerDataByAmount(markerList));
  };

  useEffect(() => {
    getCollectionData();
    getPinData();
    getReplyData();
  }, []);

  useEffect(() => {
    if (pinFetchDatas.pinList) {
      console.log("pinFetchDatas.pinList", pinFetchDatas.pinList);
      makeMarker();
    }
  }, [pinFetchDatas]);

  useEffect(() => {
    if (
      myProfile &&
      myProfile.id === collectionFetchDatas.collectionInfo?.writerId
    ) {
      setIsMyCollection(true);
    }
  }, [myProfile, collectionFetchDatas]);

  const routeToPinSelectPage = () => {
    dispatch(
      initialPinSelectPageState({
        collectionId: collectionId,
        pinPlaceId:
          pinFetchDatas.pinList?.map((pin) => pin.placeId || -1) || [],
      })
    );
    router.push(`/pin/select?collectionId=${collectionId}`);
  };

  return (
    <SubPageLayout
      topperMsg={"컬렉션 조회"}
      completeButtonMsg={isMyCollection ? "수정" : undefined}
      onClickCompleteButton={() =>
        router.push(`/collection/edit/${collectionId}`)
      }
    >
      {isCollectionFetching ? (
        <BouncingLoader className={styles.errorMessage} /> // TODO skeleton laoder
      ) : collectionFetchDatas.errorMessage ||
        !collectionFetchDatas.collectionInfo ? (
        <p className={styles.errorMessage}>
          {collectionFetchDatas.errorMessage}
        </p>
      ) : (
        <>
          {/* 컬렉션 정보 */}
          <CollectionInfoRenderer
            collectionData={collectionFetchDatas.collectionInfo}
            isMyCollection={isMyCollection}
          />
          {/* 메뉴 */}
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
              <button className={styles.buttons} onClick={routeToPinSelectPage}>
                + 핀 추가
              </button>
            )}
          </section>
          {/* 메뉴 페이지 */}
          {showState === 1 &&
            (pinFetchDatas.errorMessage || !pinFetchDatas.pinList ? (
              <p className={styles.errorMessage}>
                {pinFetchDatas.errorMessage}
              </p>
            ) : (
              <CollectionWithPinRenderer pins={pinFetchDatas.pinList} />
            ))}
          {showState === 2 &&
            (pinFetchDatas.errorMessage || !pinFetchDatas.pinList ? (
              <p className={styles.errorMessage}>
                {pinFetchDatas.errorMessage}
              </p>
            ) : (
              <CollectionWithPinCommentRenderer data={pinFetchDatas.pinList} />
            ))}
          {showState === 3 && collectionFetchDatas.collectionInfo && (
            <CollectionReplyRenderer
              replys={replyFetchDatas.replyDatas || []}
              getReplyDatas={getReplyData}
              errorMessage={replyFetchDatas.errorMessage}
              collectionInfo={collectionFetchDatas.collectionInfo}
              myId={myProfile?.id}
            />
          )}
        </>
      )}
    </SubPageLayout>
  );
}
