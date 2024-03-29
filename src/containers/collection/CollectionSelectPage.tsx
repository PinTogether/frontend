"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionSelectPage.module.scss";
import { PlaceDetail } from "@/types/Place";
import { CollectionForAddPin } from "@/types/Collection";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { CheckRingRoundIcon, ExpandRightIcon } from "@/components/IconSvg";
import { SimpleBoxCollectionCard } from "@/components/CollectionCard";
import AlertModal from "@/components/AlertModal";
import { SimplePlaceCard } from "@/components/PlaceCard";

import useGetMyId from "@/hooks/useGetMyId";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import fetchGetCollectionForAddPin from "@/utils/members/fetchGetCollectionForAddPin";
import fetchPostPinToCollections from "@/utils/pins/fetchPostPinToCollections";
import fetchGetPlaceInfo from "@/utils/places/fetchGetPlaceInfo";
import { Line } from "../layout/EditPageLayout";

const CollectionSelectPage = () => {
  const router = useRouter();

  /* 기본 id 가져오기 */
  const searchParams = useSearchParams();
  const userId = useGetMyId();
  const [placeId, setPlaceId] = useState<number | null>(null);

  useEffect(() => {
    const placeId = searchParams.get("placeId");
    if (placeId) {
      setPlaceId(parseInt(placeId));
    }
  }, []);

  /* fetch place data */
  const [placeFetchData, setPlaceFetchData] = useState<{
    placeInfo: PlaceDetail | null;
    errorMessage: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!placeId) return;
      const { placeInfo, errorMessage } = await fetchGetPlaceInfo(placeId);
      console.log("fetchData", placeInfo, errorMessage);
      setPlaceFetchData({ placeInfo, errorMessage }); // ?
    };
    if (placeId) fetchData();
  }, [placeId]);

  /* fetch collection data */
  const pageSize = 25;
  const [pageNum, setPageNum] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [collectionDataList, setCollectionDataList] = useState<
    CollectionForAddPin[]
  >([]);

  const fetchCollectionData = async () => {
    if (isFetching || !userId || !placeId) return;
    setIsFetching(true);

    const { collectionDatas, errorMessage } =
      await fetchGetCollectionForAddPin(placeId);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      setIsFetching(false);
      setIsEnd(true);
      return;
    } else if (collectionDatas.length === 0) {
      setIsFetching(false);
      setIsEnd(true);
      return;
    }
    setCollectionDataList((prev) => [...prev, ...collectionDatas]);
    setPageNum(pageNum + 1);
    setIsFetching(false);
  };

  /* infinite scroll */
  const pageEndRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);
  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.8, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndRef, option);

  useEffect(() => {
    if (isIntersecting && !isEnd) fetchCollectionData();
  }, [userId, isIntersecting]);

  /* select state */
  const [selectedCollection, setSelectedCollection] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickedCollection = (collectionId: number) => {
    if (selectedCollection.includes(collectionId)) {
      setSelectedCollection(
        selectedCollection.filter((id) => id !== collectionId)
      );
    } else {
      setSelectedCollection([...selectedCollection, collectionId]);
    }
  };

  const handleResetButton = () => {
    setSelectedCollection([]);
  };

  /* submit */
  const submitAddPin = async () => {
    if (!placeId) {
      setAlertMessage("잘못된 접근입니다.");
      return;
    }
    if (selectedCollection.length === 0) {
      setAlertMessage("선택된 컬렉션이 없습니다.");
      return;
    }
    if (selectedCollection.length > 10) {
      setAlertMessage("한번에 10개까지 선택 가능합니다.");
      return;
    }
    if (selectedCollection.length === 1) {
      // 1개면 핀 편집 페이지로 이동
      const placeName = placeFetchData?.placeInfo?.name;
      const collectionTitle = collectionDataList.find(
        (collection) => collection.id === selectedCollection[0]
      )?.title;
      router.push(
        `/pin/edit?placeId=${placeId}&placeName=${placeName}&collectionId=${selectedCollection[0]}&collectionTitle=${collectionTitle}`
      );
      return;
    }
    // 여러개면 핀 편집없이 여러 컬렉션에 추가
    const { success, errorMessage } = await fetchPostPinToCollections(
      placeId,
      selectedCollection
    );
    if (!success) {
      setAlertMessage(errorMessage);
      return;
    } else {
      setAlertMessage("핀이 추가되었습니다.");
      setSelectedCollection([]);
      router.push(`/place/${placeId}`);
    }
  };

  return (
    <SubPageLayout
      topperMsg="내 컬렉션에 추가하기"
      completeButtonMsg="완료"
      onClickCompleteButton={submitAddPin}
    >
      {/* 선택된 장소 정보 */}

      <section>
        {!placeId ? (
          <p className={styles.errorMessage}>잘못된 접근입니다.</p>
        ) : !placeFetchData?.placeInfo ? (
          <p className={styles.errorMessage}>{placeFetchData?.errorMessage}</p>
        ) : (
          <SimplePlaceCard place={placeFetchData.placeInfo} />
        )}
        <br />
        <Line />
      </section>
      {/* 컬렉션 선택 */}
      <section>
        {/* 메뉴 */}
        <div className={styles.selectedCollectionCount}>
          <h3>{`${selectedCollection.length}개의 컬렉션 선택`}</h3>
          {selectedCollection.length > 0 ? (
            <button className={styles.subButton} onClick={handleResetButton}>
              전체 취소
            </button>
          ) : (
            <Link className={styles.subButton} href="/collection/edit">
              <span>{`새 컬렉션 만들기`}</span>
              <ExpandRightIcon className={styles.expandIcon} />
            </Link>
          )}
        </div>
        {/* 리스트 */}
        {errorMessage ? (
          <>
            <br />
            <p className={styles.errorMessage}>{errorMessage}</p>
          </>
        ) : (
          <ul className={styles.listContainer}>
            {collectionDataList.map((collection) =>
              collection.pinned ? null : (
                <li
                  key={collection.id}
                  className={`${styles.list}  ${selectedCollection.includes(collection.id) ? styles.active : null}`}
                  onClick={() => handleClickedCollection(collection.id)}
                >
                  <SimpleBoxCollectionCard
                    collectionData={{
                      id: collection.id,
                      title: collection.title,
                      thumbnail: collection.thumbnail,
                      likeCnt: collection.likeCnt,
                      pinCnt: collection.pinCnt,
                      scrapCnt: collection.scrapCnt,
                      // unneeded props
                      writerId: userId || 0,
                      writerMembername: "myself",
                      liked: false,
                      scrapped: false,
                    }}
                  />
                  <CheckRingRoundIcon className={`${styles.checkIcon}`} />
                </li>
              )
            )}
          </ul>
        )}
      </section>
      <br />
      {!isEnd && <div ref={pageEndRef} style={{ height: "5px" }}></div>}
      <AlertModal message={alertMessage} setMessage={setAlertMessage} />
    </SubPageLayout>
  );
};
export default CollectionSelectPage;
