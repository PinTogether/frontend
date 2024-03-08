"use client";

import { useState } from "react";
import styles from "@/styles/containers/search/_searchPage.module.scss";
import PlaceCard from "@/components/PlaceCard";

import { PlaceDetail } from "@/types/Place";

export default function SearchPlaceRender({
  placeDatas,
}: {
  placeDatas: PlaceDetail[];
}) {
  const [repeatCount, setRepeatCount] = useState(2);

  const onChangeCollection = (e: any) => {
    if (repeatCount === 2) {
      setRepeatCount(placeDatas.length);
    } else {
      setRepeatCount(2);
    }
  };

  return (
    <section className={styles.searchListContainer}>
      {placeDatas.map(
        (data, index) =>
          index <= repeatCount && <PlaceCard key={index} place={data} />
      )}
    </section>
  );
}
