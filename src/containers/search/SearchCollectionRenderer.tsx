"use client";

import { useState } from "react";
import { CollectionDetail } from "@/types/Collection";
import CollectionCard, {
  HorizontalDetailCollectionCard,
} from "@/components/CollectionCard";
import styles from "@/styles/containers/search/_searchPage.module.scss";

export default function SearchCollectionRender({
  collectiondatas,
}: {
  collectiondatas: CollectionDetail[];
}) {
  const [repeatCount, setRepeatCount] = useState(2);

  const onChangeCollection = (e: any) => {
    if (repeatCount === 2) {
      setRepeatCount(collectiondatas.length);
    } else {
      setRepeatCount(2);
    }
  };

  return (
    <section className={styles.searchListContainer}>
      {collectiondatas.map(
        (collectiondata, index) =>
          index <= repeatCount && (
            <HorizontalDetailCollectionCard
              key={index}
              collectionData={collectiondata}
            />
            //   ></HorizontalDetailCollectionCard>
            // <CollectionCard
            //   key={index}
            //   collectionData={collectiondata}
            //   detail={true}
            // />
          )
      )}
    </section>
  );
}
