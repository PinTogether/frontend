"use client";

import { useState } from "react";
// import styles from "@/styles/containers/pin/_pinSelectPage.module.scss"; // x
import styles from "@/styles/containers/pin/_pinSelectPage.module.scss";
import { CheckRingRoundIcon } from "@/components/IconSvg";
import { SimplePlaceCard } from "@/components/PlaceCard";
import { InputComponent } from "@/components/InputComponent";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import placeDataList from "@/../../public/dummy-data/dummy-place.json";

const PinSelectPage = () => {
  const [selectedPlace, setSelectedPlace] = useState<number[]>([]);

  const handleClickedPlace = (collectionId: number) => {
    if (selectedPlace.includes(collectionId)) {
      setSelectedPlace(selectedPlace.filter((id) => id !== collectionId));
    } else {
      setSelectedPlace([...selectedPlace, collectionId]);
    }
  };

  const handleCancleButton = () => {
    setSelectedPlace([]);
  };
  const handleSubmit = () => {
    console.log(selectedPlace);
  };

  return (
    <section>
      <SlideMenu menuTitleList={["내가 찜한 장소", "새로운 장소 검색"]}>
        <SlideMenuInnerPage>
          <br />
          <div className={styles.selectedCollectionCount}>
            <div
              className={styles.mainButton}
            >{`${selectedPlace.length}개의 장소 선택`}</div>
            {selectedPlace.length > 0 ? (
              <button className={styles.subButton} onClick={handleCancleButton}>
                전체 취소
              </button>
            ) : undefined}
            <button className={styles.subButton} onClick={handleSubmit}>
              선택 완료
            </button>
          </div>
          <ul className={styles.listContainer}>
            {placeDataList.map((place) => (
              <li
                key={place.id}
                className={`${styles.list}  ${selectedPlace.includes(place.id) ? styles.active : null}`}
                onClick={() => handleClickedPlace(place.id)}
              >
                <SimplePlaceCard place={place} />
                <CheckRingRoundIcon className={styles.checkIcon} />
              </li>
            ))}
          </ul>
          {/* <button className={styles.button}>선택 완료</button> */}
        </SlideMenuInnerPage>
        <SlideMenuInnerPage>
          <br />
          <ul className={styles.listContainer}>
            <InputComponent placeholder="장소 검색" />
            <br />
          </ul>
        </SlideMenuInnerPage>
      </SlideMenu>
    </section>
  );
};

export default PinSelectPage;
