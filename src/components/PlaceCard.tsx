"use client";

import styles from "@/styles/components/_pincard.module.scss";
import {
  AddRoundIcon,
  LocationIcon,
  BookMarkIcon,
  BookMarkFillIcon,
} from "@/components/IconSvg";

import Place, { PlaceDetail, PlaceStarred } from "@/types/Place";
import { useEffect, useState } from "react";

const PlaceCard = ({
  simple = false,
  place,
  phoneNumber,
}: {
  simple?: boolean;
  place: PlaceDetail | PlaceStarred;
  phoneNumber?: string;
}) => {
  return (
    <article className={styles.locationCard}>
      {"starred" in place && (
        <div className={styles.starredContainer}>
          <Starred starred={place.starred ? true : false} />
        </div>
      )}

      <div className={styles.mainInfo}>
        <LocationIcon className={styles.pinIcon} />
        <button
          className={styles.title}
          // aria-label={`${place.name} - ${place.category}`}
        >
          <h3>{place.name}</h3>
          <span>{place.category}</span>
        </button>
        <address>{place.address}</address>
        {"starred" in place && (
          <span className={styles.phoneNum}>
            {phoneNumber ? `전화번호 : ${phoneNumber}` : null}
          </span>
        )}
        {!simple && (
          <div className={styles.subContainer}>
            <button>
              {`내 컬렉션에 추가하기`}
              <AddRoundIcon />
            </button>
            <button>
              {`지도에서 보기`}
              <AddRoundIcon />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PlaceCard;

/* utils */
const Starred = ({ starred }: { starred?: boolean }) => {
  const [isStared, setIsStarred] = useState(starred ? starred : false);
  const handleStar = () => {
    setIsStarred(!isStared);
  };
  return isStared ? (
    <BookMarkFillIcon className={styles.starred} onClick={handleStar} />
  ) : (
    <BookMarkIcon onClick={handleStar} />
  );
};
