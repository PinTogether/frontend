"use client";

import { useState } from "react";
import Pin from "@/types/Pin";
// import { LocationCard } from "@/components/PinCard";
import styles from "@/styles/containers/search/_searchPage.module.scss";

export default function SearchLocationRender({
  pindatas,
}: {
  pindatas: Pin[];
}) {
  const [repeatCount, setRepeatCount] = useState(2);

  const onChangeCollection = (e: any) => {
    if (repeatCount === 2) {
      setRepeatCount(pindatas.length);
    } else {
      setRepeatCount(2);
    }
  };

  return (
    <section className={styles.searchPartContainer}>
      <div className={styles.searchLogBanner}>
        <p>장소 검색</p>
        <button className={styles.searchLogExtend} onClick={onChangeCollection}>
          더보기
        </button>
      </div>
      <section className={styles.searchListContainer}>
        {/* {pindatas.map(
          (pinData, index) =>
            index <= repeatCount && (
              <LocationCard
                key={index}
                placeName={pinData.placeName}
                roadNameAddress={pinData.address}
                category={pinData.category}
              />
            )
        )} */}
      </section>
    </section>
  );
}
