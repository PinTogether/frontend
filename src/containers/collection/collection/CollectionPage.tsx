"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {
  markerDataByAmount,
  cleanSelectedCollectionByAmount,
} from "@/redux/locationSlice";
import { initialPinSelectPageState } from "@/redux/pinSelectPageSlice";

import { useGetMyId } from "@/hooks/myProfileHooks";

import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import MarkerData from "@/types/Marker";
import { CollectionDetail } from "@/types/Collection";
import { PinForPlace } from "@/types/Pin";

import SubPageLayout from "@/containers/layout/SubPageLayout";
import PinsCommentRenderer from "./PinsCommentRenderer";
import PinsRenderer from "./PinsRenderer";
import ReplyRenderer from "./ReplyRenderer";
import CollectionInfoRenderer from "./CollectionInfoRenderer";
import { addAlertMessage } from "@/redux/globalAlertSlice";
import fetchDeleteCollection from "@/utils/collections/fetchDeleteCollection";

enum MenuCategory {
  PIN_PLACE = 1,
  PIN_COMMENT = 2,
  COLLECTION_COMMENT = 3,
}

export default function CollectionPage({
  collectionId,
  collectionInfo,
  pinList,
  pinListErrMsg,
}: {
  collectionId: number;
  collectionInfo: CollectionDetail;
  pinList: PinForPlace[];
  pinListErrMsg: string;
}) {
  const router = useRouter();
  const myId = useGetMyId();
  const [isMyCollection, setIsMyCollection] = useState(false);

  /* menu button */
  const [currentMenu, setCurrentMenu] = useState<MenuCategory>(
    MenuCategory.PIN_COMMENT
  );
  const hanldeClickMenuBtn = (clicked: MenuCategory) => {
    if (clicked !== currentMenu) setCurrentMenu(clicked);
  };

  /* check collection owner */
  useEffect(() => {
    const checkMyCollection = () => {
      if (myId && myId === collectionInfo?.writerId) {
        setIsMyCollection(true);
      }
    };
    checkMyCollection();
  }, [myId, collectionInfo]);

  /*  */
  const routeToPinSelectPage = () => {
    dispatch(
      initialPinSelectPageState({
        collectionId: collectionId,
        pinPlaceId: pinList?.map((pin) => pin.placeId || -1) || [],
      })
    );
    router.push(`/pin/select?collectionId=${collectionId}`);
  };

  /* delete collection */
  const [isDeletingCollection, setIsCollectionFetching] = useState(false);

  const deleteCollection = async () => {
    if (isDeletingCollection || !isMyCollection) return;
    if (!confirm(`"${collectionInfo.title}" 컬렉션을 삭제하시겠습니까?`))
      return;
    setIsCollectionFetching(true);
    const { success, errorMessage } = await fetchDeleteCollection(collectionId);
    if (!success) {
      dispatch(addAlertMessage(errorMessage));
    } else {
      router.push(`/profile/${collectionInfo.writerMembername}`);
    }
    setIsCollectionFetching(false);
  };

  /* 지도 */
  const dispatch = useAppDispatch();
  const makeMarker = () => {
    // 마커 리스트를 생성하고 Map에 전달 및 center 좌표 변경
    const markerList: MarkerData[] = [];
    for (let i = 0; i < pinList.length; i++) {
      markerList.push({
        id: pinList[i].id,
        placeId: pinList[i].placeId,
        placeName: pinList[i].placeName,
        pinCount: pinList[i].placePinCnt,
        latitude: pinList[i].latitude,
        longitude: pinList[i].longitude,
      });
    }
    dispatch(markerDataByAmount(markerList));
    dispatch(cleanSelectedCollectionByAmount(true));
  };

  useEffect(() => {
    makeMarker();
  }, [pinList]);

  return (
    <SubPageLayout
      topperMsg={"컬렉션 조회"}
      completeButtonMsg={isMyCollection ? "수정" : undefined}
      deleteButtonMsg={isMyCollection ? "삭제" : undefined}
      onClickCompleteButton={() =>
        router.push(`/collection/edit/${collectionId}`)
      }
      onClickDeleteButton={() => deleteCollection()}
    >
      {/* 컬렉션 정보 */}
      <CollectionInfoRenderer
        collectionData={collectionInfo}
        isMyCollection={isMyCollection}
      />
      {/* 메뉴 */}
      <section className={styles.buttonContainer}>
        <button
          className={`${styles.buttons} ${currentMenu == MenuCategory.PIN_COMMENT ? styles.clickedButtons : ""}`}
          onClick={() => hanldeClickMenuBtn(MenuCategory.PIN_COMMENT)}
        >
          핀 리뷰
        </button>
        <button
          className={`${styles.buttons} ${currentMenu == MenuCategory.PIN_PLACE ? styles.clickedButtons : ""}`}
          onClick={() => hanldeClickMenuBtn(MenuCategory.PIN_PLACE)}
        >
          핀 장소
        </button>
        <button
          className={`${styles.buttons} ${currentMenu == MenuCategory.COLLECTION_COMMENT ? styles.clickedButtons : ""}`}
          onClick={() => hanldeClickMenuBtn(MenuCategory.COLLECTION_COMMENT)}
        >
          컬렉션 댓글
        </button>
        {isMyCollection && (
          <button className={styles.buttons} onClick={routeToPinSelectPage}>
            + 핀 추가
          </button>
        )}
      </section>
      {/* 메뉴 페이지 */}
      {currentMenu === MenuCategory.PIN_COMMENT &&
        (pinListErrMsg ? (
          <p className={styles.errorMessage}>{pinListErrMsg}</p>
        ) : (
          <PinsCommentRenderer pins={pinList} />
        ))}
      {currentMenu === MenuCategory.PIN_PLACE &&
        (pinListErrMsg ? (
          <p className={styles.errorMessage}>{pinListErrMsg}</p>
        ) : (
          <PinsRenderer pins={pinList} />
        ))}
      {currentMenu === MenuCategory.COLLECTION_COMMENT && collectionInfo && (
        <ReplyRenderer collectionInfo={collectionInfo} myId={myId} />
      )}
    </SubPageLayout>
  );
}
