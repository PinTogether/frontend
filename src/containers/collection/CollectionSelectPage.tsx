"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionSelectPage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { CheckRingRoundIcon, ExpandRightIcon } from "@/components/IconSvg";
import { SimpleBoxCollectionCard } from "@/components/CollectionCard";
import AlertModal from "@/components/AlertModal";

import fetchGetProfileCollections from "@/utils/fetchGetProfileCollections";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import fetchPostPin from "@/utils/fetchPostPin";

const CollectionSelectPage = () => {
  // TODO : placeId 가져오기
  const placeId = 1;

  /* fetch data */
  // TODO : userId 가져오기
  const userId = 1;
  const pageSize = 25;
  const [pageNum, setPageNum] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [collectionDataList, setCollectionDataList] = useState<
    CollectionDetail[]
  >([]);

  const fetchCollectionData = async () => {
    if (isFetching) return;
    setIsFetching(true);
    const { collectionDatas, errorMessage } = await fetchGetProfileCollections(
      userId,
      pageNum,
      pageSize
    );
    if (errorMessage) {
      setErrorMessage(errorMessage);
      setIsFetching(false);
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
  const submitAddPin = () => {
    if (selectedCollection.length === 0) {
      setAlertMessage("선택된 컬렉션이 없습니다.");
      return;
    }
    if (selectedCollection.length > 10) {
      setAlertMessage("한번에 10개까지 선택 가능합니다.");
      return;
    }
    const review = "";
    const tags: string[] = [];
    const fileType: string[] = [];

    // TODO : API 필요
    selectedCollection.forEach(async (collectionId) => {
      const { success, errorMessage } = await fetchPostPin(
        placeId,
        collectionId,
        review,
        tags,
        fileType
      );
      if (!success) {
        setAlertMessage(errorMessage);
        return;
      } else {
        setAlertMessage("핀이 추가되었습니다.");
        setSelectedCollection((prev) =>
          prev.filter((id) => id !== collectionId)
        );
      }
    });
    if (selectedCollection.length === 0) {
      setAlertMessage("모든 핀이 추가되었습니다.");
    }
  };

  return (
    <SubPageLayout
      topperMsg="내 컬렉션에 추가하기"
      completeButtonMsg="완료"
      onClickCompleteButton={submitAddPin}
    >
      <section>
        {/* <button className={styles.subButton}>확인</button> */}
        <div className={styles.selectedCollectionCount}>
          <div>{`${selectedCollection.length}개의 컬렉션 선택`}</div>
          {selectedCollection.length > 0 ? (
            <button className={styles.subButton} onClick={handleResetButton}>
              전체 취소
            </button>
          ) : (
            <Link className={styles.subButton} href="/collection/create">
              <span>{`새 컬렉션 만들기`}</span>
              <ExpandRightIcon className={styles.expandIcon} />
            </Link>
          )}
        </div>
        <ul className={styles.listContainer}>
          {collectionDataList.map((collection) => (
            <li
              key={collection.id}
              className={`${styles.list}  ${selectedCollection.includes(collection.id) ? styles.active : null}`}
              onClick={() => handleClickedCollection(collection.id)}
            >
              <SimpleBoxCollectionCard collectionData={collection} />
              <CheckRingRoundIcon className={styles.checkIcon} />
            </li>
          ))}
        </ul>
      </section>
      <br />
      {!isEnd && <div ref={pageEndRef} style={{ height: "5px" }}></div>}
      <AlertModal message={alertMessage} setMessage={setAlertMessage} />
    </SubPageLayout>
  );
};
export default CollectionSelectPage;
