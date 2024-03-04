"use client";

import styles from "@/styles/components/_placecard.module.scss";
import {
  AddRoundIcon,
  LocationIcon,
  PinFillIcon,
  PinIcon,
  StarIcon,
  ZimmIcon,
} from "@/components/IconSvg";

import Place, { PlaceDetail, PlaceStarred } from "@/types/Place";
import { useState } from "react";
import { StarFilledIcon } from "@/components/IconSvg";

export { PlaceCard, SimpleBoxPlaceCard as SimplePlaceCard };

const PlaceCard = ({ place }: { place: PlaceDetail | PlaceStarred }) => {
  return (
    <article className={styles.placeCard}>
      {"starred" in place && (
        <div className={styles.starredContainer}>
          <Starred starred={place.starred ? true : false} />
        </div>
      )}

      <div className={styles.mainInfo}>
        <LocationIcon className={styles.pinIcon} />
        <button
          className={styles.placeNameContainer}
          // aria-label={`${place.name} - ${place.category}`}
        >
          <h3 className={styles.placeName}>{place.name}</h3>
          <span className={styles.category}>{place.category}</span>
        </button>
        <address className={styles.address}>{place.address}</address>
        <div className={styles.buttonContainer}>
          <div className={styles.pinCnt}>
            {`52개 핀`}
            <PinIcon />
          </div>
          <button>
            {`컬렉션에 추가하기`}
            <AddRoundIcon />
          </button>
          <button>
            {`지도에서 보기`}
            <AddRoundIcon />
          </button>
        </div>
      </div>
    </article>
  );
};
export default PlaceCard;

const SimpleBoxPlaceCard = ({
  place,
}: {
  place: PlaceDetail | PlaceStarred;
  phoneNumber?: string;
}) => {
  return (
    <article className={styles.simpleBoxPlaceCard}>
      <div className={styles.titleContainer}>
        {/* <LocationIcon className={styles.pinIcon} /> */}
        <h3 className={styles.placeName}>{place.name}</h3>
        <span className={styles.category}>{place.category}</span>
      </div>
      {/* <div className={styles.subDataContainer}> */}
      <address className={styles.address}>{place.address}</address>
      <div className={styles.pinCnt}>{`52개 핀`}</div>
      {/* </div> */}
    </article>
  );
};

/* utils */
const Starred = ({ starred }: { starred?: boolean }) => {
  const [isStared, setIsStarred] = useState(starred ? starred : false);
  const handleStar = () => {
    setIsStarred(!isStared);
  };
  return isStared ? (
    // <ZimmIcon className={styles.starred} onClick={handleStar} />
    <StarFilledIcon className={styles.starred} onClick={handleStar} />
  ) : (
    // <ZimmIcon onClick={handleStar} />
    // <StarFilledIcon onClick={handleStar} />
    <StarIcon onClick={handleStar} />
  );
};
