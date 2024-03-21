import styles from "@/styles/containers/overlay/_overlay.module.scss";
import CardSlider2 from "@/components/CardSlider2";
import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";
import { ProfileMine } from "@/types/Profile";
import { useState, useEffect } from "react";
import {
  ArrowDropDownIcon,
  ExpendDownIcon,
  ExpendUpIcon,
} from "@/components/IconSvg";

export default function OverlayCollectionSelector(){
  const [myProfile, setMyProfile] = useState<ProfileMine | null>(null);

  useEffect(() => {
    setMyProfile(getMyProfileFromLocalStorage);
  }, []);

  return(
    <>
    {myProfile && (
      <div className={styles.bottom}>
        <div
          className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
        >
          <>
            {collectionSelector == 0 && (
              <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                {collectionDummyData.map((collection, index) => (
                  <SimpleCollectionCard
                    key={index}
                    collectionData={collection}
                    linkDisabled={true}
                    onClick={() => handleClickedCard(index)}
                  />
                ))}
              </CardSlider2>
            )}
            {collectionSelector == 1 && (
              <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                {collectionDummyData.map((collection, index) => (
                  <SimpleCollectionCard
                    key={index}
                    collectionData={collection}
                    linkDisabled={true}
                    onClick={() => handleClickedCard(index)}
                  />
                ))}
              </CardSlider2>
            )}
            {collectionSelector == 2 && (
              <CardSlider2 height={160} selectedCardIndexList={selectedCardId}>
                {collectionDummyData.map((collection, index) => (
                  <SimpleCollectionCard
                    key={index}
                    collectionData={collection}
                    linkDisabled={true}
                    onClick={() => handleClickedCard(index)}
                  />
                ))}
              </CardSlider2>
            )}
          </>
        </div>
        <div className={styles.buttonBox}>
          <button
            className={`${styles.bottomButton} ${collectionSelector == 0 ? styles.clickedButtons : ""}`}
            onClick={() => handleClickBottomButton(0)}
          >
            내 컬렉션
          </button>
          <button
            className={`${styles.bottomButton} ${collectionSelector == 1 ? styles.clickedButtons : ""}`}
            onClick={() => handleClickBottomButton(1)}
          >
            스크랩한 컬렉션
          </button>
          <button
            className={`${styles.bottomButton} ${collectionSelector == 2 ? styles.clickedButtons : ""}`}
            onClick={() => handleClickBottomButton(2)}
          >
            팔로우한 컬렉션
          </button>
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
      )}
      </>
  );
}
