"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { addAlertMessage } from "@/redux/globalAlertSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import styles from "@/styles/containers/pin/_pinSelectPage.module.scss";
import { PlaceDetail } from "@/types/Place";
import {
  CheckRingRoundIcon,
  CloseRoundIcon,
  PinIcon,
} from "@/components/IconSvg";
import { SimplePlaceCard } from "@/components/PlaceCard";
import { InputComponent } from "@/components/InputComponent";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";

import fetchGetStars from "@/utils/stars/fetchGetStars";
import { useGetMyId } from "@/hooks/myProfileHooks";
import fetchPostPinsToCollection from "@/utils/pins/fetchPostPinsToCollection";

// TODO : collection Pin List 의 palceId 랑 비교해야함

const PinSelectPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* fetch data */
  const myId = useGetMyId();
  const collectionId = useAppSelector(
    (state) => state.pinSelectPageState.collectionId
  );
  const collectionPlaceId = useAppSelector(
    (state) => state.pinSelectPageState.pinPlaceId
  );
  const [starredPlaceList, setStarredPlaceList] = useState<PlaceDetail[]>([]);

  /* selected place */
  const [selectedPlace, setSelectedPlace] = useState<number[]>([]);
  /* search */
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchedPlace, setSearchedPlace] = useState<PlaceDetail[]>([]);
  /* pagination */
  const page = 1;
  const size = 10;

  /* fetch data */
  useEffect(() => {
    if (collectionId) {
      getStarredPlaceList();
    }
  }, []);

  const getStarredPlaceList = async () => {
    if (isLoading || !myId) return;
    setIsLoading(true);
    const res = await fetchGetStars(myId);
    if (res.errorMessage) {
      setErrorMessage(res.errorMessage);
    } else {
      setStarredPlaceList(res.starredDatas);
    }
    setIsLoading(false);
  };

  /* event */
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

  /* search */
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInputValue === "") {
      setSearchedPlace([]);
      return;
    }
    setSearchedPlace(
      starredPlaceList.filter((place) => place.name.includes(searchInputValue))
    );
  };

  const clearSearchInput = () => {
    setSearchInputValue("");
  };
  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  /* submit */
  const addPinsToCollection = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const placeIdList = selectedPlace;
    const { success, errorMessage } = await fetchPostPinsToCollection(
      placeIdList,
      Number(collectionId)
    );
    if (success) {
      dispatch(addAlertMessage("핀이 추가되었습니다."));
      router.push(`/collection/${collectionId}`);
    } else {
      dispatch(addAlertMessage(errorMessage));
    }
    setSelectedPlace([]);
    setIsLoading(false);
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
            <button className={styles.subButton} onClick={addPinsToCollection}>
              추가하기
            </button>
          </div>
          {/* 찜한 장소 리스트 */}
          <ul className={styles.listContainer}>
            {starredPlaceList.map((place) =>
              collectionPlaceId.includes(place.id) ? (
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
          <div className={styles.errorMessage}>🛠️ 준비중입니다... 🛠️</div>
        </SlideMenuInnerPage>
      </SlideMenu>
    </section>
  );
};

export default PinSelectPage;

//  {/* 새로운 장소 검색 */}
//  <SlideMenuInnerPage>
//  {/* 검색 */}
//  <br />
//  <form onSubmit={handleSubmitSearch} className={styles.searchForm}>
//    <InputComponent
//      placeholder="장소 검색"
//      value={searchInputValue}
//      onChange={handleChangeSearchInput}
//    />
//    <button
//      type="button"
//      className={styles.clearButton}
//      onClick={clearSearchInput}
//    >
//      <CloseRoundIcon />
//    </button>
//  </form>
//  <br />
//  <br />
//  {/* 메뉴 */}
//  <div className={styles.selectedCollectionCount}>
//    <div
//      className={styles.mainButton}
//    >{`${selectedPlace.length}개의 장소 선택`}</div>
//    {selectedPlace.length > 0 ? (
//      <button
//        className={styles.subButton}
//        onClick={onClickCancleButton}
//      >
//        전체 취소
//      </button>
//    ) : undefined}
//    <button className={styles.subButton} onClick={addPinsToCollection}>
//      추가하기
//    </button>
//  </div>
//  {/* 검색 장소 리스트 */}
//  <ul className={styles.listContainer}>
//    {searchedPlace.map((place) =>
//      pinSelectPageState.pinPlaceId.includes(place.id) ? (
//        <li
//          key={place.id}
//          className={`${styles.list} ${styles.deactive}`}
//        >
//          <SimplePlaceCard place={place} />
//          <PinIcon className={styles.pinnedIcon} />
//        </li>
//      ) : (
//        <li
//          key={place.id}
//          className={`${styles.list}  ${selectedPlace.includes(place.id) ? styles.active : null}`}
//          onClick={() => handleClickedPlace(place.id)}
//        >
//          <SimplePlaceCard place={place} />
//          <CheckRingRoundIcon className={styles.checkIcon} />
//        </li>
//      )
//    )}
//  </ul>
// </SlideMenuInnerPage>
