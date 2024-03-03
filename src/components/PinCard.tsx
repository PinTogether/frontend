"use client";

import styles from "@/styles/components/_pincard.module.scss";
import { AddRoundIcon, EditIcon, PinIcon } from "@/components/IconSvg";
import Pin from "@/types/Pin";
import { ReviewCard, MyReviewCard } from "./Review";
import { HTMLAttributes, use, useRef, useState } from "react";
import Link from "next/link";

export { PinCard, SimplePinCard };

interface PinCardProps extends HTMLAttributes<HTMLDivElement> {
  pinData: Pin;
  showReview?: boolean;
  showButton?: boolean;
  showEditButton?: boolean;
}
export default function PinCard({
  pinData,
  showReview = true,
  showButton = false,
  showEditButton = false,
  ...props
}: PinCardProps) {
  return (
    <article className={styles.pinCard} {...props}>
      <div className={styles.mainInfo}>
        <PinIcon className={styles.pinIcon} />
        <button className={styles.placeNameContainer}>
          <h3 className={styles.placeName}>{pinData.placeName}</h3>
          <span className={styles.category}>{pinData.category}</span>
        </button>
        <address className={styles.address}>{pinData.address}</address>
        <div className={styles.tagContainer}>
          {pinData.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
        {showButton && (
          <div className={styles.buttonContainer}>
            <button>
              {`내 컬렉션에 추가하기`}
              <AddRoundIcon />
            </button>
            <button>
              {`리뷰 더보기`}
              <AddRoundIcon />
            </button>
            <button>
              {`지도에서 보기`}
              <AddRoundIcon />
            </button>
          </div>
        )}
      </div>
      {showReview && (
        <ul className={styles.commentContaier}>
          <MyReviewCard reviewData={pinData} />
        </ul>
      )}
      {showEditButton && <EditButton pinId={pinData.id} />}
    </article>
  );
}

interface SimplePinCardProps extends HTMLAttributes<HTMLDivElement> {
  pinData: Pin;
  className?: string;
  buttonDisabled?: boolean;
  activeShowDetail?: boolean;
  showEditButton?: boolean;
}
const SimplePinCard = ({
  pinData,
  className,
  buttonDisabled = false,
  activeShowDetail = false,
  showEditButton = false,
  ...props
}: SimplePinCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("click");
    if (activeShowDetail) setShowDetail(!showDetail);
    if (activeShowDetail && !showDetail) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    props.onClick?.(e);
  };

  return (
    <article
      className={`${styles.simplePinCard} ${className}`}
      ref={ref}
      {...props}
      onClick={onClick}
    >
      {!showDetail ? (
        <div className={styles.mainInfo}>
          <PinIcon className={styles.pinIcon} />
          <button
            className={styles.placeNameContainer}
            disabled={buttonDisabled}
          >
            <h3 className={styles.placeName}>{pinData.placeName}</h3>
            <address className={styles.address}>{pinData.address}</address>
            <span className={styles.category}>{pinData.category}</span>
          </button>
          {showEditButton && <EditButton pinId={pinData.id} />}
        </div>
      ) : (
        <div className={styles.mainInfo}>
          <PinIcon className={styles.pinIcon} />
          <button className={styles.placeNameContainer}>
            <h3 className={styles.placeName}>{pinData.placeName}</h3>
            <span className={styles.category}>{pinData.category}</span>
          </button>
          <address className={styles.address}>{pinData.address}</address>
          <div className={styles.tagContainer}>
            {pinData.tags.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
          <ul className={styles.commentContaier}>
            <MyReviewCard reviewData={pinData} />
          </ul>
          {showEditButton && <EditButton pinId={pinData.id} />}
        </div>
      )}
    </article>
  );
};

// Utils
const EditButton = ({ pinId }: { pinId: number }) => {
  return (
    <Link className={styles.editButton} href={`/pin/edit/${pinId}`}>
      <EditIcon />
    </Link>
  );
};
