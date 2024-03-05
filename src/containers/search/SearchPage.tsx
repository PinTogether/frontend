"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { useState } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import { SearchIcon } from "../../components/IconSvg";
import SearchPinRender from "./SearchPinRenderer";
import SearchPlaceRender from "./SearchPlaceRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";

import CollectionDatas from "@/../../public/dummy-data/dummy-collection.json";
import { InputComponent } from "@/components/InputComponent";
import placeDatas from "@/../../public/dummy-data/dummy-place.json";
import { PlaceDetail } from "@/types/Place";

export default function Page() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const page = 1;
  const size = 10;

  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("검색");

    searchPlace();
  };

  const searchPlace = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${inputCollectionSearch}&page=${page}&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaceDatas(
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

  const searchCollection = () => {};

  return (
    <section className={styles.container}>
      <Topper msg={"검색"} />
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.inputButton}>
          <SearchIcon className={styles.icon} />
        </div>
        <input
          className={styles.input}
          onChange={onChangeCollection}
          value={inputCollectionSearch}
          placeholder="다른 사람의 컬렉션을 검색해 보세요 !  추천 키워드  :  강릉, 맛집,  디저트 ... !"
        />
        <select>
          <option value="0">전체 검색</option>
          <option value="1">컬렉션 검색</option>
          <option value="2">장소 검색</option>
        </select>
      </form>
      <div className={styles.searchLogBanner}>
        <p>최근 검색</p>
      </div>
      <section className={styles.searchLogContainer}>
        <SearchLog searchString="강남맛집" searchCategory="장소 검색" />
        <SearchLog searchString="강남맛집" searchCategory="장소 검색" />
        <SearchLog searchString="해방촌" searchCategory="장소 검색" />
        <SearchLog searchString="독립 서점" searchCategory="핀 검색" />
        <SearchLog searchString="강남맛집" searchCategory="장소 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="독립 서점" searchCategory="핀 검색" />
        <SearchLog searchString="독립 서점" searchCategory="핀 검색" />
        <SearchLog searchString="독립 서점" searchCategory="핀 검색" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션 검색" />
        <SearchLog
          searchString="서울에서 제일이나 두번째로 맛있는 맛집"
          searchCategory="컬렉션 검색"
        />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션 검색" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션 검색" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
        <SearchLog searchString="강남맛집" searchCategory="전체 검색" />
      </section>
      <section className={styles.searchContainer}>
        <SearchPlaceRender placeDatas={placeDatas} />
        {/* <SearchPinRender pindatas={pinDatas} /> */}
        <SearchCollectionRender collectiondatas={CollectionDatas} />
      </section>
    </section>
  );
}
