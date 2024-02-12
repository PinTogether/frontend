import styles from "@/styles/components/_collectioncard.module.scss";
import Image from "next/image";
// import { HeartIcon } from "@/components/Icons";
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
import { useState } from "react";
import Link from "next/link";

export default function CollectionCard({
  collectionData,
  horizontal = false,
  simple = false,
  detail = false,
}: {
  collectionData: ICollection;
  horizontal?: boolean;
  simple?: boolean;
  detail?: boolean;
}) {
  return simple ? (
    <SimpleCollectionCard collectionData={collectionData} />
  ) : horizontal ? (
    <HorizontalCollectionCard collectionData={collectionData} />
  ) : detail ? (
    <HorizontalDetailCard collectionData={collectionData} />
  ) : (
    <DefaultCollectionCard collectionData={collectionData} />
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

const LikedButton = ({ likeCnt }: { likeCnt: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <button onClick={handleLike}>
      {isLiked ? <HeartFillIcon className={styles.liked} /> : <HeartIcon />}
      <p> {`${likeCnt}개 좋아요`}</p>
    </button>
  );
};

const ShareButton = ({ collectionId }: { collectionId: number }) => {
  return (
    <button>
      <LinkIcon />
      <p>공유하기</p>
    </button>
  );
};

const PinButton = ({ pinCnt }: { pinCnt: number }) => {
  return (
    <button>
      <PinIcon />
      <p>{`${pinCnt}개 핀`}</p>
    </button>
  );
};

/* components */
const DefaultCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.collectionCard}>
      <div className={styles.imgContainer}>
        <Link href={`/collection/${collectionData.id}`}>
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
          href={`/profile/${collectionData.ownerId}`}
          className={styles.profile}
        >
          <Image
            src="/images/cat_dummy.jpeg"
            alt="user profile image"
            width={100}
            height={100}
            className={styles.userAvatar}
          />
        </Link>
        <p className={styles.nickname}>
          {`by ${collectionData.ownerNickname}`}
        </p>
        <Link
          href={`/collection/${collectionData.id}`}
          className={styles.title}
        >
          {collectionData.title}
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} />
        <LikedButton likeCnt={collectionData.likeCnt} />
      </div>
    </article>
  );
};

const SimpleCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.simpleCollectionCard}>
      <div className={styles.imgContainer}>
        <Link href={`/collection/${collectionData.id}`}>
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
      >
        <h2 className={styles.title}>{collectionData.title}</h2>
      </Link>
    </article>
  );
};

const HorizontalCollectionCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.horizontalCollectionCard}>
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.imgContainer}
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
        >
          {collectionData.title}
        </Link>
        <Link
          href={`/profile/${collectionData.ownerId}`}
          className={styles.nickname}
        >{`by ${collectionData.ownerNickname}`}</Link>
        <BookMark />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} />
        <ShareButton collectionId={collectionData.id} />
        <LikedButton likeCnt={collectionData.likeCnt} />
      </div>
    </article>
  );
};

const HorizontalDetailCard = ({
  collectionData,
}: {
  collectionData: ICollection;
}) => {
  return (
    <article className={styles.detailCollectionCard}>
      <Link
        href={`/collection/${collectionData.id}`}
        className={styles.imgContainer}
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
        >
          {collectionData.title}
        </Link>
        <Link
          href={`/profile/${collectionData.ownerId}`}
          className={styles.nickname}
        >{`by ${collectionData.ownerNickname}`}</Link>
        <BookMark />
      </div>
      <div className={styles.buttonContainer}>
        <PinButton pinCnt={collectionData.pinCnt} />
        <ShareButton collectionId={collectionData.id} />
        <LikedButton likeCnt={collectionData.likeCnt} />
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
