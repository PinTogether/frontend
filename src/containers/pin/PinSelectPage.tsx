"use client";

import { useState, useRef, useEffect, SetStateAction } from "react";
// import styles from "@/styles/containers/pin/_pinSelectPage.module.scss"; // x
import styles from "@/styles/containers/pin/_pinSelectPage.module.scss";
import {
  CheckRingRoundIcon,
  CloseRoundIcon,
  PinIcon,
} from "@/components/IconSvg";
import { SimplePlaceCard } from "@/components/PlaceCard";
import { InputComponent } from "@/components/InputComponent";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import placeDataList from "@/../../public/dummy-data/dummy-place.json";
import { PlaceDetail } from "@/types/Place";
import { useSearchParams } from "next/navigation";

const PinSelectPage = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<number[]>([]);
  const [searchedPlace, setSearchedPlace] = useState<PlaceDetail[]>([]);
  const page = 1;
  const size = 10;
  const collectionId = useSearchParams().get("collectionId");
  const [collectionPinList, setCollectionPinList] = useState<number[]>([]);

  useEffect(() => {
    if (collectionId) {
      // getPinListId(Number(collectionId), setCollectionPinList);
      setCollectionPinList([1, 3, 5, 525482, 527356]);
    }
  }, []);

  const handleClickedPlace = (collectionId: number) => {
    if (selectedPlace.includes(collectionId)) {
      setSelectedPlace(selectedPlace.filter((id) => id !== collectionId));
    } else {
      setSelectedPlace([...selectedPlace, collectionId]);
    }
  };

  const onClickCancleButton = () => {
    setSelectedPlace([]);
  };
  const onClickAddButton = async () => {
    console.log(selectedPlace);
    // 백엔드 api 아직 없음
    // await addPinToCollection(Number(collectionId), selectedPlace);
    // await getPinListId(Number(collectionId), setCollectionPinList);
    setSelectedPlace([]);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlace(setSearchedPlace);
  };

  const searchPlace = (
    setSearchedPlace: React.Dispatch<SetStateAction<PlaceDetail[]>>
  ): Promise<void> => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${searchInputValue}&page=${page}&size=${size}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`서버 오류 ${res.status}}`);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSearchedPlace(
          data.map((place: any) => {
            return {
              id: place.id,
              name: place.name,
              roadNameAddress: place.roadNameAddress,
              category: place.category || "ETC",
              longitude: place.longtitude,
              latitude: place.latitude,
              starred: place.starred || false,
              pinCnt: place.pinCnt,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPinListId = (
    collectionId: number,
    setCollectionPinList: React.Dispatch<SetStateAction<number[]>>
  ): Promise<void> => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/${collectionId}/pin`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`서버 오류 ${res.status}}`);
        return res.json();
      })
      .then((data) => {
        setCollectionPinList(data.map((pin: any) => pin.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPinToCollection = (
    collectionId: number,
    pinId: number[]
  ): Promise<void> => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
        placeId: pinId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`서버 오류 ${res.status}}`);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearSearchInput = () => {
    setSearchInputValue("");
  };
  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <section>
      <SlideMenu menuTitleList={["내가 찜한 장소", "새로운 장소 검색"]}>
        {/* 내가 찜한 장소 */}
        <SlideMenuInnerPage>
          {/* 메뉴 */}
          <br />
          <div className={styles.selectedCollectionCount}>
            <div
              className={styles.mainButton}
            >{`${selectedPlace.length}개의 장소 선택`}</div>
            {selectedPlace.length > 0 ? (
              <button
                className={styles.subButton}
                onClick={onClickCancleButton}
              >
                전체 취소
              </button>
            ) : undefined}
            <button className={styles.subButton} onClick={onClickAddButton}>
              추가하기
            </button>
          </div>
          {/* 찜한 장소 리스트 */}
          <ul className={styles.listContainer}>
            {placeDataList.map((place) =>
              collectionPinList.includes(place.id) ? (
                <li
                  key={place.id}
                  className={`${styles.list} ${styles.deactive}`}
                >
                  <SimplePlaceCard place={place} />
                  <PinIcon className={styles.pinnedIcon} />
                </li>
              ) : (
                <li
                  key={place.id}
                  className={`${styles.list}  ${selectedPlace.includes(place.id) ? styles.active : null}`}
                  onClick={() => handleClickedPlace(place.id)}
                >
                  <SimplePlaceCard place={place} />
                  <CheckRingRoundIcon className={styles.checkIcon} />
                </li>
              )
            )}
          </ul>
        </SlideMenuInnerPage>
        {/* 새로운 장소 검색 */}
        <SlideMenuInnerPage>
          {/* 검색 */}
          <br />
          <form onSubmit={handleSubmitSearch} className={styles.searchForm}>
            <InputComponent
              placeholder="장소 검색"
              value={searchInputValue}
              onChange={handleChangeSearchInput}
            />
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearSearchInput}
            >
              <CloseRoundIcon />
            </button>
          </form>
          <br />
          <br />
          {/* 메뉴 */}
          <div className={styles.selectedCollectionCount}>
            <div
              className={styles.mainButton}
            >{`${selectedPlace.length}개의 장소 선택`}</div>
            {selectedPlace.length > 0 ? (
              <button
                className={styles.subButton}
                onClick={onClickCancleButton}
              >
                전체 취소
              </button>
            ) : undefined}
            <button className={styles.subButton} onClick={onClickAddButton}>
              추가하기
            </button>
          </div>
          {/* 검색 장소 리스트 */}
          <ul className={styles.listContainer}>
            {searchedPlace.map((place) =>
              collectionPinList.includes(place.id) ? (
                <li
                  key={place.id}
                  className={`${styles.list} ${styles.deactive}`}
                >
                  <SimplePlaceCard place={place} />
                  <PinIcon className={styles.pinnedIcon} />
                </li>
              ) : (
                <li
                  key={place.id}
                  className={`${styles.list}  ${selectedPlace.includes(place.id) ? styles.active : null}`}
                  onClick={() => handleClickedPlace(place.id)}
                >
                  <SimplePlaceCard place={place} />
                  <CheckRingRoundIcon className={styles.checkIcon} />
                </li>
              )
            )}
          </ul>
        </SlideMenuInnerPage>
      </SlideMenu>
    </section>
  );
};

export default PinSelectPage;
