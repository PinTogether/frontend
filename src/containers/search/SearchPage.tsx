"use client"

import styles from "@/styles/containers/search/_searchPage.module.scss"
import { useState } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import { SearchIcon } from "../../components/IconSvg";

export default function Page() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");

  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  }

  return(
    <section className={styles.container}>
      <Topper msg={"검색"}/>
      <div className={styles.inputContainer}>
        <button className={styles.inputButton}>
          <SearchIcon className={styles.icon}/>
        </button>
        <input className={styles.input} onChange={onChangeCollection} value={inputCollectionSearch} placeholder="다른 사람의 컬렉션을 검색해 보세요 !  추천 키워드  :  강릉, 맛집,  디저트 ... !"/>
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
        <SearchLog searchString="서울에서 제일이나 두번째로 맛있는 맛집" searchCategory="컬렉션 검색" />
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
        <section className={styles.searchPartContainer}>
        <div className={styles.searchLogBanner}>
          <p>장소 검색</p>
          <button className={styles.searchLogExtend}>더보기</button>
        </div>
          <section className={styles.searchListContainer}>
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
          </section>
        </section>
        <section className={styles.searchPartContainer}>
          <div className={styles.searchLogBanner}>
            <p>핀 검색</p>
            <button className={styles.searchLogExtend}>더보기</button>
          </div>
          <section className={styles.searchListContainer}>
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
          </section>
        </section>
        <section className={styles.searchPartContainer}>
          <div className={styles.searchLogBanner}>
            <p>컬렉션 검색</p>
            <button className={styles.searchLogExtend}>더보기</button>
          </div>
          <section className={styles.searchListContainer}>
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
            <div className={styles.dummycard1} />
          </section>
        </section>
      </section>
    </section>
  );
  }
