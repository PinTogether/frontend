"use client";

import { useState } from "react";
import Pin from "@/types/Pin";
import PinCard from "@/components/PinCard";
import styles from "@/styles/containers/search/_searchPage.module.scss";

export default function SearchPinRender({ pindatas }: { pindatas: Pin[] }) {
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
        <p>핀 검색</p>
        <button className={styles.searchLogExtend} onClick={onChangeCollection}>
          더보기
        </button>
      </div>
      <section className={styles.searchListContainer}>
        {pindatas.map(
          (pinData, index) =>
            index <= repeatCount && <PinCard key={index} pinData={pinData} />
        )}
      </section>
    </section>
  );
}
