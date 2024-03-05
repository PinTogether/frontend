// import pinDataList from "@/../../public/dummy-data/dummy-pin.json";
// import PinCard, { SimplePinCard } from "@/components/PinCard";
"use client";

import { SimpleBoxCollectionCard } from "@/components/CollectionCard";
import {
  AddRoundIcon,
  CheckRingRoundIcon,
  ExpandRightIcon,
} from "@/components/IconSvg";
import styles from "@/styles/containers/collection/_collectionSelectPage.module.scss";
import Link from "next/link";
import { useState } from "react";
import SubPageLayout from "../layout/SubPageLayout";
import collectionDataList from "@/../../public/dummy-data/dummy-collection.json";

const CollectionSelectPage = () => {
  const [selectedCollection, setSelectedCollection] = useState<number[]>([]);

  const handleClickedCollection = (collectionId: number) => {
    if (selectedCollection.includes(collectionId)) {
      setSelectedCollection(
        selectedCollection.filter((id) => id !== collectionId)
      );
    } else {
      setSelectedCollection([...selectedCollection, collectionId]);
    }
  };

  const handleCancleButton = () => {
    setSelectedCollection([]);
  };

  return (
    <SubPageLayout topperMsg="내 컬렉션에 추가하기">
      <section>
        {/* <button className={styles.subButton}>확인</button> */}
        <div className={styles.selectedCollectionCount}>
          <div>{`${selectedCollection.length}개의 컬렉션 선택`}</div>
          {selectedCollection.length > 0 ? (
            <button className={styles.subButton} onClick={handleCancleButton}>
              전체 취소
            </button>
          ) : (
            <Link className={styles.subButton} href="/collection/create">
              <span>{`새 컬렉션 만들기`}</span>
              <ExpandRightIcon className={styles.expandIcon} />
            </Link>
          )}
        </div>
        <ul className={styles.listContainer}>
          {collectionDataList.map((collection) => (
            <li
              key={collection.id}
              className={`${styles.list}  ${selectedCollection.includes(collection.id) ? styles.active : null}`}
              onClick={() => handleClickedCollection(collection.id)}
            >
              <SimpleBoxCollectionCard collectionData={collection} />
              <CheckRingRoundIcon className={styles.checkIcon} />
            </li>
          ))}
        </ul>
      </section>
    </SubPageLayout>
  );
};
export default CollectionSelectPage;
