"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/containers/overlay/_overlay.module.scss";
import CardSlider from "@/components/CardSlider";
import CardSlider2 from "@/components/CardSlider2";

import { useState } from "react";
import { locationGetterByAmount } from "@/redux/locationSlice";
import { SimpleCollectionCard } from "@/components/CollectionCard";

import collectionDummyData from "@/../../public/dummy-data/dummy-collection.json";
import {
  ArrowDropDownIcon,
  ExpendDownIcon,
  ExpendUpIcon,
} from "@/components/IconSvg";

export default function Overlay() {
  const dispatch = useAppDispatch();

  const [isCardSliderOn, setIsCardSliderOn] = useState(1);
  const [showCardSlider, setShowCardSlider] = useState(false);
  const sidoName = useAppSelector((state) => state.location.sido);
  const sggName = useAppSelector((state) => state.location.sgg);
  const emdongName = useAppSelector((state) => state.location.emdong);
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );

  function getLocation() {
    dispatch(locationGetterByAmount(true));
  }

  const toggleCardSlider = () => {
    setIsCardSliderOn((prevState) => {
      if (prevState === 1) return 0;
      return 1;
    });
    setShowCardSlider((prevState) => !prevState);
  };
  return (
    <section className={styles.overlay}>
      <div className={styles.top}>
        <div className={styles.topLocation}>
          <div>{sidoName}</div>
          <div>{sggName}</div>
          <div>{emdongName}</div>
        </div>
        <button className={styles.topButton} onClick={getLocation}>
          {locationGetter && (
            <div className={styles.loader}>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
            </div>
          )}
          {!locationGetter && (
            <img
              src="/icon/location_plain.svg"
              alt="location button"
              className={styles.icon}
            ></img>
          )}
        </button>
      </div>
      <div></div>
      <div className={styles.bottom}>
        <div
          className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
        >
          <CardSlider2 height={150}>
            {collectionDummyData.map((collection, index) => (
              <SimpleCollectionCard
                key={index}
                collectionData={collection}
                linkDisabled={true}
              />
            ))}
          </CardSlider2>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.bottomButton}>내 컬렉션</button>
          <button className={styles.bottomButton}>스크랩한 컬렉션</button>
          <button className={styles.bottomButton}>팔로우한 컬렉션</button>
          <button className={styles.bottomButton} onClick={toggleCardSlider}>
            {showCardSlider ? (
              <>
                {"컬렉션 보기"}
                <ExpendUpIcon />
              </>
            ) : (
              <>
                {"컬렉션 숨기기"}
                <ExpendDownIcon />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
