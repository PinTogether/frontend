"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/containers/overlay/_overlay.module.scss";
import CardSlider from "@/components/CardSlider";
import CardSlider2 from "@/components/CardSlider2";

import { useState } from "react";
import { latByAmount, lngByAmount } from "@/redux/locationSlice";
import { SimpleCollectionCard } from "@/components/CollectionCard";

import collectionDummyData from "@/../../public/dummy-data/dummy-collection.json";

export default function Overlay() {
  const dispatch = useAppDispatch();

  const [isCardSliderOn, setIsCardSliderOn] = useState(1);
  const [cardSliderBtnMsg, setCardSliderBtnMsg] = useState("컬렉션 숨기기 v");
  const sidoName = useAppSelector((state) => state.location.sido);
  const sggName = useAppSelector((state) => state.location.sgg);
  const emdongName = useAppSelector((state) => state.location.emdong);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (pos) {
      dispatch(latByAmount(pos.coords.latitude));
      dispatch(lngByAmount(pos.coords.longitude));
    });
  }

  const toggleCardSlider = () => {
    setIsCardSliderOn((prevState) => {
      if (prevState === 1) return 0;
      return 1;
    });
    if (cardSliderBtnMsg === "컬렉션 숨기기 v") {
      setCardSliderBtnMsg("컬렉션 보이기 ∧");
    } else {
      setCardSliderBtnMsg("컬렉션 숨기기 v");
    }
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
          <img
            src="/icon/location_plain.svg"
            alt="location button"
            className={styles.icon}
          ></img>
        </button>
      </div>
      <div></div>
      <div className={styles.bottom}>
        <div
          className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
        >
          <CardSlider2 width={800} height={80}>
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
          <button className={styles.bottomButton}>좋아요한 컬렉션</button>
          <button className={styles.bottomButton}>새컬렉션 만들기 +</button>
          <button className={styles.bottomButton} onClick={toggleCardSlider}>
            {cardSliderBtnMsg}
          </button>
        </div>
      </div>
    </section>
  );
}
