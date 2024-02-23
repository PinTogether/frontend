"use client";

import styles from "@/styles/components/_collectioncard.module.scss";
import Image from "next/image";
import {
  HeartIcon,
  HeartFillIcon,
  PinIcon,
  LinkIcon,
  BookMarkIcon,
  BookMarkFillIcon,
  CommentIcon,
} from "@/components/IconSvg";
import ICollection from "@/types/ICollection";
import { useState, HTMLAttributes } from "react";
import Link from "next/link";

interface CollectionCardProps extends HTMLAttributes<HTMLButtonElement> {
  collectionData: ICollection;
  horizontal?: boolean;
  simple?: boolean;
  detail?: boolean;
  linkDisabled?: boolean;
}

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  collectionData: ICollection;
  linkDisabled?: boolean;
}

export default function CollectionCard({
  collectionData,
  horizontal = false,
  simple = false,
  detail = false,
  linkDisabled = false,
  ...props
}: CollectionCardProps) {
  return simple ? (
    <SimpleCollectionCard
      collectionData={collectionData}
      linkDisabled={linkDisabled}
      {...props}
    />
  ) : horizontal ? (
    <HorizontalCollectionCard
      collectionData={collectionData}
      linkDisabled={linkDisabled}
      {...props}
    />
  ) : detail ? (
    <HorizontalDetailCard
      collectionData={collectionData}
      linkDisabled={linkDisabled}
      {...props}
    />
  ) : (
    <DefaultCollectionCard
      collectionData={collectionData}
      linkDisabled={linkDisabled}
      {...props}
    />
  );
}

/* utils */
const BookMark = () => {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const handleBookMark = () => {
    setIsBookMarked(!isBookMarked);
  };
  return isBookMarked ? (
    <BookMarkFillIcon className={styles.bookmarked} onClick={handleBookMark} />
  ) : (
    <BookMarkIcon onClick={handleBookMark} />
  );
};

const LikedButton = ({
  likeCnt,
  linkDisabled = false,
}: {
  likeCnt: number;
  linkDisabled: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <button onClick={linkDisabled ? undefined : handleLike}>
      {isLiked ? <HeartFillIcon className={styles.liked} /> : <HeartIcon />}
      <p> {`${likeCnt}개 좋아요`}</p>
    </button>
  );
};

const ShareButton = ({
  collectionId,
  linkDisabled = false,
}: {
  collectionId: number;
  linkDisabled: boolean;
}) => {
  return (
    <button disabled={linkDisabled}>
      <LinkIcon />
      <p>공유하기</p>
    </button>
  );
};

const PinButton = ({
  pinCnt,
  linkDisabled = false,
}: {
  pinCnt: number;
  linkDisabled: boolean;
}) => {
  return (
    <button disabled={linkDisabled}>
      <PinIcon />
      <p>{`${pinCnt}개 핀`}</p>
    </button>
  );
};

/* components */
const DefaultCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.collectionCard}
      {...props}
    >
      <div className={styles.imgContainer}>
        <Link
          href={`/collection/${collectionData.id}`}
          aria-disabled={linkDisabled}
        >
          <Image
            src={collectionData.thumbnail}
            alt="collection thumbnail"
            width={200}
            height={200}
            className={styles.userAvatar}
          />
        </Link>
        <BookMark />
      </div>
      <div className={styles.textContainer}>
        <Link
          href={`/profile/${collectionData.ownerNickname}`}
          className={styles.profile}
          aria-disabled={linkDisabled}
        >
          <Image
            src="/images/cat_dummy.jpeg"
            alt="user profile image"
            width={100}
            height={100}
            className={styles.userAvatar}
          />
        </Link>
        <p className={styles.nickname}>{`by ${collectionData.ownerNickname}`}</p>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
          aria-disabled={linkDisabled}
        >
          {collectionData.title}
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} linkDisabled={linkDisabled} />
        <LikedButton
          likeCnt={collectionData.likeCnt}
          linkDisabled={linkDisabled}
        />
      </div>
    </article>
  );
};

const SimpleCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.simpleCollectionCard}
      {...props}
    >
      <div className={styles.imgContainer}>
        <Link
          href={`/collection/${collectionData.id}`}
          aria-disabled={linkDisabled}
        >
          <Image
            src={collectionData.thumbnail}
            alt="collection thumbnail"
            width={200}
            height={200}
            className={styles.userAvatar}
          />
        </Link>
        <BookMark />
      </div>
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.textContainer}
        aria-disabled={linkDisabled}
      >
        <h2 className={styles.title}>{collectionData.title}</h2>
      </Link>
    </article>
  );
};

const HorizontalCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.horizontalCollectionCard}
      {...props}
    >
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.imgContainer}
        aria-disabled={linkDisabled}
      >
        <Image
          src={collectionData.thumbnail}
          alt="collection thumbnail"
          width={200}
          height={200}
          className={styles.userAvatar}
        />
      </Link>
      <div className={styles.textContainer}>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
          aria-disabled={linkDisabled}
        >
          {collectionData.title}
        </Link>
        <Link
          href={`/profile/${collectionData.ownerNickname}`}
          className={styles.nickname}
          aria-disabled={linkDisabled}
        >{`by ${collectionData.ownerNickname}`}</Link>
        <BookMark />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} linkDisabled={linkDisabled} />
        <ShareButton
          collectionId={collectionData.id}
          linkDisabled={linkDisabled}
        />
        <LikedButton
          likeCnt={collectionData.likeCnt}
          linkDisabled={linkDisabled}
        />
      </div>
    </article>
  );
};

const HorizontalDetailCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.detailCollectionCard}
      {...props}
    >
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.imgContainer}
        aria-disabled={linkDisabled}
      >
        <Image
          src={collectionData.thumbnail}
          alt="collection thumbnail"
          width={200}
          height={200}
          className={styles.userAvatar}
        />
      </Link>
      <div className={styles.textContainer}>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
          aria-disabled={linkDisabled}
        >
          {collectionData.title}
        </Link>
        <Link
          href={`/profile/${collectionData.ownerNickname}`}
          className={styles.nickname}
          aria-disabled={linkDisabled}
        >{`by ${collectionData.ownerNickname}`}</Link>
        <BookMark />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} linkDisabled={linkDisabled} />
        <ShareButton
          collectionId={collectionData.id}
          linkDisabled={linkDisabled}
        />
        <LikedButton
          likeCnt={collectionData.likeCnt}
          linkDisabled={linkDisabled}
        />
      </div>
      <div className={styles.tagContainer}>
        <span>맛집</span>
        <span>강릉</span>
        <span>로컬맛집</span>
      </div>
      <div className={styles.detailContainer}>
        <CommentIcon />
        <p>{collectionData.detail}</p>
      </div>
    </article>
  );
};
