import React, { useState } from "react";
import { CollectionDetail } from "@/types/Collection";
import Image from "next/image";
import {
  BookMarkIcon,
  EditIcon,
  HeartIcon,
  LinkIcon,
  LocationIcon,
} from "@/components/IconSvg";
import styles from "@/styles/containers/collection/_collectionInfo.module.scss";
import Link from "next/link";

const CollectionInfo = ({
  collectionData,
}: {
  collectionData: CollectionDetail;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLocationButton = () => {
    // 위치 버튼 클릭시
  };
  const handleClickShareButton = () => {
    // 공유 버튼 클릭시
  };
  const handleClickLikeButton = () => {
    setIsLiked(!isLiked);
  };

  const handleClickBookmarkButton = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <section id={styles.collectionInfo}>
      <Image
        className={styles.collectionImg}
        src={collectionData.thumbnail}
        alt="collectionImg"
        width={200}
        height={200}
      />
      <div className={styles.collectionData}>
        <div className={styles.collectionTitle}>
          <h1 className={styles.title}>{collectionData.title}</h1>
          <button onClick={handleClickBookmarkButton}>
            <BookMarkIcon
              className={`${styles.bookmarkIcon} ${isBookmarked ? styles.filled : ""}`}
            />
          </button>
          <Link href={`/collection/edit/${collectionData.id}`}>
            <EditIcon className={styles.editIcon} />
          </Link>
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
      <div className={styles.collectionDescription}>
        {collectionData.details}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClickLocationButton}>
          <LocationIcon />
          <div className={styles.text}>{collectionData.pinCnt}개 장소</div>
        </button>
        <button className={styles.button} onClick={handleClickShareButton}>
          <LinkIcon />
          <div className={styles.text}>공유하기</div>
        </button>
        <button className={styles.button} onClick={handleClickLikeButton}>
          <HeartIcon className={`${isLiked ? styles.liked : ""}`} />
          <div className={styles.text}>
            {collectionData.likeCnt === 0
              ? "첫 좋아요"
              : `${collectionData.likeCnt}개 좋아요`}
          </div>
        </button>
      </div>
    </section>
  );
};
export default CollectionInfo;
