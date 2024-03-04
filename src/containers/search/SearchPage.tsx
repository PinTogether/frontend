"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { useState } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import { SearchIcon } from "../../components/IconSvg";
import SearchPinRender from "./SearchPinRenderer";
import SearchLocationRender from "./SearchLocationRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";

import pinDatas from "@/../../public/dummy-data/dummy-pin.json";
import collectionDatas from "@/../../public/dummy-data/dummy-collection.json";

export default function Page() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");

  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  };

  return (
    <section className={styles.container}>
      <Topper msg={"검색"} />
      <div className={styles.inputContainer}>
        <button className={styles.inputButton}>
          <SearchIcon className={styles.icon} />
        </button>
        <input
          className={styles.input}
          onChange={onChangeCollection}
          value={inputCollectionSearch}
          placeholder="다른 사람의 컬렉션을 검색해 보세요 !  추천 키워드  :  강릉, 맛집,  디저트 ... !"
        />
        <select>
          <option value="0">전체 검색</option>
          <option value="1">컬렉션 검색</option>
          <option value="2">핀 검색</option>
          <option value="3">장소 검색</option>
        </select>
      </div>
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
        <SearchLocationRender pindatas={pinDatas} />
        <SearchPinRender pindatas={pinDatas} />
        <SearchCollectionRender collectiondatas={collectionDatas} />
      </section>
    </section>
  );
}
