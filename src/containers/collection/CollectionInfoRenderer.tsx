import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/containers/collection/_collectionInfo.module.scss";
import { CollectionDetail } from "@/types/Collection";
import {
  BookMarkIcon,
  EditIcon,
  HeartIcon,
  LinkIcon,
  LocationIcon,
} from "@/components/IconSvg";
import AlertModal from "@/components/AlertModal";

import fetchPostCollectionLikes from "@/utils/fetchPostCollectionLikes";
import fetchDeleteCollectionLikes from "@/utils/fetchDeleteCollectionLikes";
import fetchPostCollectionScraps from "@/utils/fetchPostCollectionScraps";
import fetchDeleteCollectionScraps from "@/utils/fetchDeleteCollectionScraps";

const CollectionInfoRenderer = ({
  collectionData,
  isMyCollection,
}: {
  collectionData: CollectionDetail;
  isMyCollection: boolean;
}) => {
  const [isScraped, setIsScraped] = useState(collectionData.isScrapped);
  const [isLiked, setIsLiked] = useState(collectionData.isLiked);
  const [isScrapedLoading, setIsScrapedLoading] = useState(false);
  const [isLikedLoading, setIsLikedLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickLocationButton = () => {
    // TODO : 위치 버튼 클릭시 map marker 띄우기
  };

  const handleClickShareButton = () => {
    // 공유하기
    navigator.clipboard.writeText(`
      ${process.env.NEXT_PUBLIC_FRONTEND_URL}/collection/${collectionData.id}
    `);
    setAlertMessage((prev) => "클립보드에 복사되었습니다.");
  };

  const likeCollection = async () => {
    setIsLikedLoading(true);
    // 좋아요
    if (!isLiked) {
      const { success, errorMessage } = await fetchPostCollectionLikes(
        collectionData.id
      );
      if (success) {
        setIsLiked(true);
        collectionData.likeCnt += 1; // 왜 되는 걸까?
      } else setAlertMessage(errorMessage);
      setIsLikedLoading(false);
    }
    // 좋아요 취소
    else {
      const { success, errorMessage } = await fetchDeleteCollectionLikes(
        collectionData.id
      );
      if (success) {
        setIsLiked(false);
        collectionData.likeCnt -= 1;
      } else setAlertMessage(errorMessage);
      setIsLikedLoading(false);
    }
  };

  const scrapCollection = async () => {
    if (isScrapedLoading) return;
    setIsScrapedLoading(true);
    // 스크랩
    if (!isScraped) {
      const { success, errorMessage } = await fetchPostCollectionScraps(
        collectionData.id
      );
      if (success) {
        collectionData.scrapCnt += 1;
        setIsScraped(true);
      } else setAlertMessage(errorMessage);
    }
    // 스크랩 취소
    else {
      const { success, errorMessage } = await fetchDeleteCollectionScraps(
        collectionData.id
      );
      if (!success) {
        collectionData.scrapCnt -= 1;
        setIsScraped(false);
      } else setAlertMessage(errorMessage);
    }
    setIsScrapedLoading(false);
  };

  useEffect(() => {
    setIsScraped(collectionData.isScrapped);
    setIsLiked(collectionData.isLiked);
  }, [collectionData]);

  return (
    <section id={styles.collectionInfo}>
      {/* 이미지 */}
      <Image
        className={styles.collectionImg}
        src={collectionData.thumbnail}
        alt="collectionImg"
        width={200}
        height={200}
      />
      {/* 컬렉션 정보 */}
      <div className={styles.collectionData}>
        <div className={styles.collectionTitle}>
          <h1 className={styles.title}>{collectionData.title}</h1>
          {isMyCollection ? (
            <Link href={`/collection/edit/${collectionData.id}`}>
              <EditIcon className={styles.editIcon} />
            </Link>
          ) : (
            <button onClick={scrapCollection} disabled={isScrapedLoading}>
              <BookMarkIcon
                className={`${styles.bookmarkIcon} ${isScraped ? styles.filled : ""}`}
              />
            </button>
          )}
        </div>
        <Link
          href={`/profile/${collectionData.writerId}`}
          className={styles.collectionWriter}
        >{`by ${collectionData.writer}`}</Link>
        <p className={styles.collectionTags}>
          {collectionData.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </p>
      </div>
      {/* 컬렉션 상세 설명 */}
      <div className={styles.collectionDescription}>
        {collectionData.details}
      </div>
      {/* 기타 버튼 */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClickLocationButton}>
          <LocationIcon />
          <div className={styles.text}>{collectionData.pinCnt}개 장소</div>
        </button>
        <button className={styles.button} onClick={handleClickShareButton}>
          <LinkIcon />
          <div className={styles.text}>공유하기</div>
        </button>
        <button
          className={styles.button}
          onClick={likeCollection}
          disabled={isLikedLoading}
        >
          <HeartIcon className={`${isLiked ? styles.liked : ""}`} />
          <div className={styles.text}>
            {collectionData.likeCnt === 0
              ? "첫 좋아요"
              : `${collectionData.likeCnt}개 좋아요`}
          </div>
        </button>
        <AlertModal message={alertMessage} setMessage={setAlertMessage} />
      </div>
    </section>
  );
};
export default CollectionInfoRenderer;
