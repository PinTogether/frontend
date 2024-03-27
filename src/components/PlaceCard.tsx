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
import Link from "next/link";

import Place, { PlaceDetail, PlaceStarred } from "@/types/Place";
import { useState } from "react";
import { StarFilledIcon } from "@/components/IconSvg";
import fetchPostStarPlace from "@/utils/fetchPostStarPlace";
import fetchDeleteStarPlace from "@/utils/fetchDeleteStarPlace";

import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";
import { makeMarker } from "@/utils/makeMarker";

export { PlaceCard, SimplePlaceCard as SimplePlaceCard };

const PlaceCard = ({ place }: { place: PlaceDetail | PlaceStarred }) => {
  const dispatchMarker = useAppDispatch();
  return (
    <article className={styles.placeCard}>
      {"starred" in place && (
        <div className={styles.starredContainer}>
          <Starred placeId={place.id} starred={place.starred ? true : false} />
        </div>
      )}

      <div className={styles.mainInfo}>
        <LocationIcon className={styles.pinIcon} />
        <Link
          href={`/place/${place.id}`}
          className={styles.placeNameContainer}
          // aria-label={`${place.name} - ${place.category}`}
        >
          <h3 className={styles.placeName}>{place.name}</h3>
          <span className={styles.category}>{place.category}</span>
        </Link>
        <address className={styles.address}>{place.roadNameAddress}</address>
        <div className={styles.buttonContainer}>
          <div className={styles.pinCnt}>
            {`${place.pinCnt}개 핀`}
            <PinIcon />
          </div>
          <Link href={`/collection/select?placeId=${place.id}`}>
            {`컬렉션에 추가하기`}
            <AddRoundIcon />
          </Link>
          <button
            onClick={(e) => {
              makeMarker(
                place.id,
                place.name,
                0,
                place.latitude,
                place.longitude,
                dispatchMarker
              );
            }}
          >
            {`지도에서 보기`}
            <AddRoundIcon />
          </button>
        </div>
      </div>
    </article>
  );
};
export default PlaceCard;

const SimplePlaceCard = ({
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
      <address className={styles.address}>{place.roadNameAddress}</address>
      {place.pinCnt ? (
        <div className={styles.pinCnt}>{`${place.pinCnt}개 핀`}</div>
      ) : null}
      {/* </div> */}
    </article>
  );
};

/* utils */
const Starred = ({
  placeId,
  starred,
}: {
  placeId: number;
  starred: boolean;
}) => {
  const [isStared, setIsStarred] = useState(starred ? starred : false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleStar = () => {
    if (isStared) {
      unStarPlace();
    } else {
      starPlace();
    }
  };

  const starPlace = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { success, errorMessage } = await fetchPostStarPlace(placeId);
    if (!success) {
      dispatch(addAlertMessage(errorMessage));
    } else {
      setIsStarred(!isStared);
    }
    setIsLoading(false);
  };

  const unStarPlace = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { success, errorMessage } = await fetchDeleteStarPlace(placeId); //
    if (!success) {
      dispatch(addAlertMessage(errorMessage));
    } else {
      setIsStarred(!isStared);
    }
    setIsLoading(false);
  };

  return isStared ? (
    <StarFilledIcon className={styles.starred} onClick={handleStar} />
  ) : (
    <StarIcon onClick={handleStar} />
  );
};
