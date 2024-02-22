"use client"

import { useState } from "react";
import ICollection from "@/types/ICollection";
import CollectionCard from "@/components/CollectionCard";
import styles from "@/styles/containers/search/_searchPage.module.scss";

export default function SearchCollectionRender({ collectiondatas }: { collectiondatas: ICollection[] }) {
  const [repeatCount, setRepeatCount] = useState(2);

  const onChangeCollection = (e: any) => {
    if (repeatCount === 2) {
      setRepeatCount(collectiondatas.length);
    } else {
      setRepeatCount(2);
    }
  };

  return (
    <section className={styles.searchPartContainer}>
      <div className={styles.searchLogBanner}>
        <p>컬렉션 검색</p>
        <button className={styles.searchLogExtend} onClick={onChangeCollection}>더보기</button>
      </div>
      <section className={styles.searchListContainer}>
        {collectiondatas.map((collectiondata, index) => (
          index <= repeatCount && <CollectionCard key={index} collectionData={collectiondata} detail={true} />
        ))}
      </section>
    </section>
  );
}
