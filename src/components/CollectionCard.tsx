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
import Collection, { CollectionDetail } from "@/types/Collection";
import { useState, useEffect, HTMLAttributes } from "react";
import Link from "next/link";

import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";
import fetchPostCollectionLikes from "@/utils/fetchPostCollectionLikes";
import fetchDeleteCollectionLikes from "@/utils/fetchDeleteCollectionLikes";
import fetchPostCollectionScraps from "@/utils/fetchPostCollectionScraps";
import fetchDeleteCollectionScraps from "@/utils/fetchDeleteCollectionScraps";

interface CollectionCardProps extends HTMLAttributes<HTMLButtonElement> {
  collectionData: CollectionDetail;
  horizontal?: boolean;
  simple?: boolean;
  detail?: boolean;
  linkDisabled?: boolean;
}

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  collectionData: CollectionDetail | Collection;
  linkDisabled?: boolean;
}

export {
  DefaultCollectionCard,
  SimpleCollectionCard,
  HorizontalCollectionCard,
  HorizontalSimpleCollectionCard,
  HorizontalDetailCollectionCard,
  SimpleBoxCollectionCard,
};

export default function CollectionCard({
  // 삭제하기
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
    <HorizontalDetailCollectionCard
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
const ScrapButton = ({
  collectionId,
  scrapped,
}: {
  collectionId: number;
  scrapped: boolean;
}) => {
  const [isScrapped, setIsScrapped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsScrapped(scrapped);
  }, []);

  const handleBookMark = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // 스크랩
    if (!isScrapped) {
      const { success, errorMessage } =
        await fetchPostCollectionScraps(collectionId);
      if (success) {
        setIsScrapped(true);
      } else dispatch(addAlertMessage(errorMessage));
    }
    // 스크랩 취소
    else {
      const { success, errorMessage } =
        await fetchDeleteCollectionScraps(collectionId);
      if (success) {
        setIsScrapped(false);
      } else dispatch(addAlertMessage(errorMessage));
    }
    setIsLoading(false);
  };

  return isScrapped ? (
    <BookMarkFillIcon className={styles.bookmarked} onClick={handleBookMark} />
  ) : (
    <BookMarkIcon onClick={handleBookMark} />
  );
};

const LikedButton = ({
  collectionId,
  likeCnt,
  liked,
  linkDisabled = false,
  displayIconFirst = true,
}: {
  collectionId: number;
  likeCnt: number;
  liked: boolean;
  linkDisabled: boolean;
  displayIconFirst?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLiked(liked);
  }, []);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // 좋아요
    if (!isLiked) {
      const { success, errorMessage } =
        await fetchPostCollectionLikes(collectionId);
      if (success) {
        setIsLiked(true);
        likeCnt += 1; // TODO 여기서는 왜 안되고 pin에서는 되는 걸까? 
      } else dispatch(addAlertMessage(errorMessage));
    }
    // 좋아요 취소
    else {
      const { success, errorMessage } =
        await fetchDeleteCollectionLikes(collectionId);
      if (success) {
        setIsLiked(false);
        likeCnt -= 1;
      } else dispatch(addAlertMessage(errorMessage));
    }
    setIsLoading(false);
  };

  return (
    <button onClick={linkDisabled ? undefined : handleLike}>
      {displayIconFirst ? (
        <>
          {isLiked ? <HeartFillIcon className={styles.liked} /> : <HeartIcon />}
          <p> {likeCnt === 0 ? `첫 좋아요` : `${likeCnt}개 좋아요`}</p>
        </>
      ) : (
        <>
          <p> {likeCnt === 0 ? `첫 좋아요` : `${likeCnt}개 좋아요`}</p>
          {isLiked ? <HeartFillIcon className={styles.liked} /> : <HeartIcon />}
        </>
      )}
    </button>
  );
};

const ShareButton = ({
  collectionId,
  linkDisabled = false,
  displayIconFirst = true,
}: {
  collectionId: number;
  linkDisabled: boolean;
  displayIconFirst?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleShare = async () => {
    navigator.clipboard.writeText(`
      ${process.env.NEXT_PUBLIC_FRONTEND_URL}/collection/${collectionId}
    `);
    dispatch(addAlertMessage("클립보드에 복사되었습니다."));
  };

  return (
    <button disabled={linkDisabled} onClick={handleShare}>
      {displayIconFirst ? (
        <>
          <LinkIcon />
          <p>공유하기</p>
        </>
      ) : (
        <>
          <p>공유하기</p>
          <LinkIcon />
        </>
      )}
    </button>
  );
};

const PinButton = ({
  pinCnt,
  linkDisabled = false,
  displayIconFirst = true,
}: {
  pinCnt: number;
  linkDisabled: boolean;
  displayIconFirst?: boolean;
}) => {
  return (
    <button disabled={linkDisabled} className={styles.disabledButton}>
      {displayIconFirst ? (
        <>
          <PinIcon />
          <p>{`${pinCnt}개 핀`}</p>
        </>
      ) : (
        <>
          <p>{`${pinCnt}개 핀`}</p>
          <PinIcon />
        </>
      )}
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
    <article className={styles.collectionCard} {...props}>
      <div className={styles.imgContainer}>
        <Link
          href={`/collection/${collectionData.id}`}
          aria-disabled={linkDisabled}
          className={styles.thumbnailLink}
        >
          <Image
            src={collectionData.thumbnail}
            alt="collection thumbnail"
            width={200}
            height={200}
          />
          <div className={styles.overlay}>
            <span>{collectionData.title}</span>
          </div>
        </Link>
        <ScrapButton
          collectionId={collectionData.id}
          scrapped={collectionData.scrapped}
        />
      </div>
      <div className={styles.textContainer}>
        {/* <Link
          href={`/profile/${collectionData.writerId}`}
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
        </Link> */}
        <p className={styles.nickname}>{`by ${collectionData.writer}`}</p>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
          aria-disabled={linkDisabled}
        >
          {collectionData.title}
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <PinButton
          pinCnt={collectionData.pinCnt}
          linkDisabled={linkDisabled}
          displayIconFirst={false}
        />
        <LikedButton
          collectionId={collectionData.id}
          likeCnt={collectionData.likeCnt}
          liked={collectionData.liked}
          linkDisabled={linkDisabled}
          displayIconFirst={false}
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
    <article className={styles.simpleCollectionCard} {...props}>
      <div className={styles.imgContainer}>
        {/* href={`/collection/${collectionData.id}`} */}
        <div>
          <Image
            src={collectionData.thumbnail}
            alt="collection thumbnail"
            width={200}
            height={200}
            className={styles.userAvatar}
          />
        </div>
        <ScrapButton
          collectionId={collectionData.id}
          scrapped={collectionData.scrapped}
        />
      </div>
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.textContainer}
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
    <article className={styles.horizontalCollectionCard} {...props}>
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
          href={`/profile/${collectionData.writerId}`}
          className={styles.nickname}
          aria-disabled={linkDisabled}
        >{`by ${collectionData.writer}`}</Link>
        <ScrapButton
          collectionId={collectionData.id}
          scrapped={collectionData.scrapped}
        />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} linkDisabled={linkDisabled} />
        <ShareButton
          collectionId={collectionData.id}
          linkDisabled={linkDisabled}
        />
        <LikedButton
          collectionId={collectionData.id}
          likeCnt={collectionData.likeCnt}
          liked={collectionData.liked}
          linkDisabled={linkDisabled}
        />
      </div>
    </article>
  );
};

const HorizontalSimpleCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article className={styles.horizontalSimpleCollectionCard} {...props}>
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
          className={styles.thumbnail}
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
      </div>
      <div className={styles.cntContainer}>
        {`pinCnt ${collectionData.pinCnt}`}
        {`likeCnt ${collectionData.likeCnt}`}
        {`scrapCnt ${collectionData.scrapCnt}`}
      </div>
    </article>
  );
};

const HorizontalDetailCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article className={styles.detailCollectionCard} {...props}>
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
      <div className={styles.textContainer} title={collectionData.title}>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
          aria-disabled={linkDisabled}
        >
          {collectionData.title}
        </Link>
        <Link
          href={`/profile/${collectionData.writerId}`}
          className={styles.nickname}
          aria-disabled={linkDisabled}
        >{`by ${collectionData.writer}`}</Link>
        <ScrapButton
          collectionId={collectionData.id}
          scrapped={collectionData.scrapped}
        />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} linkDisabled={linkDisabled} />
        <ShareButton
          collectionId={collectionData.id}
          linkDisabled={linkDisabled}
        />
        <LikedButton
          collectionId={collectionData.id}
          likeCnt={collectionData.likeCnt}
          liked={collectionData.liked}
          linkDisabled={linkDisabled}
        />
      </div>
      <div className={styles.tagContainer}>
        {"tags" in collectionData &&
          collectionData.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        {/* <span></span>
        <span>강릉</span>
        <span>로컬맛집</span> */}
      </div>
      <div className={styles.detailContainer}>
        <CommentIcon />
        {"details" in collectionData && <p>{collectionData.details}</p>}
      </div>
    </article>
  );
};

// Collection Card Page
const SimpleBoxCollectionCard = ({
  collectionData,
  linkDisabled = false,
  ...props
}: CardProps) => {
  return (
    <article className={styles.simpleBoxCollectionCard} {...props}>
      <div className={styles.imgContainer}>
        <Image
          src={collectionData.thumbnail}
          alt="collection thumbnail"
          width={200}
          height={200}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.textContainer}>{collectionData.title}</div>
      <div className={styles.cntContainer}>
        <span>
          {`핀 ${collectionData.pinCnt}`}
          {/* <PinIcon /> */}
        </span>
        <span>{`스크랩 ${collectionData.scrapCnt}`}</span>
        <span>{`좋아요 ${collectionData.likeCnt}`}</span>
      </div>
    </article>
  );
};
