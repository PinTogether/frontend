"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import {
  CloseRoundIcon,
  ExpandLeftIcon,
  ExpendUpIcon,
  SearchIcon,
} from "../../components/IconSvg";
import { SearchLog } from "./SearchLog";
import SearchPlaceRender from "./SearchPlaceRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";

import { CollectionDetail } from "@/types/Collection";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [collectionDatas, setCollectionDatas] = useState<CollectionDetail[]>(
    []
  );
  const [showSearchLog, setShowSearchLog] = useState(true);
  const searchParams = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // URL에 searchParams가 있으면 해당 검색어로 검색
    const param = searchParams.get("searchString");
    console.log("param", param);
    if (param) {
      setSearchInputValue(param);
      setShowSearchLog(false);
      setSearchKeyword(param);
    }
  }, [searchParams]);

  const onChangeSearchInput = (e: any) => {
    setSearchInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchInputValue === "") {
      setShowSearchLog(true);
    } else {
      setShowSearchLog(false);
      setSearchKeyword(searchInputValue);
    }
  };

  const clearInputValue = () => {
    setSearchInputValue("");
  };

  // Topper & ScrollTop
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasVerticalOverflow, setHasVerticalOverflow] = useState(false);

  const scrollTop = () => {
    console.log(pageRef.current);
    pageRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (pageRef.current) {
      const hasVerticalOverflow =
        pageRef.current.scrollHeight > pageRef.current.clientHeight;
      setHasVerticalOverflow(hasVerticalOverflow);
    }
  }, [pageRef.current?.clientHeight]);

  return (
    <section id={styles.searchPage}>
      {/* 검색창 */}
      <div className={styles.topper}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <ExpandLeftIcon />
        </button>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            placeholder="강릉, 맛집,  디저트 ... !"
            value={searchInputValue}
            onChange={onChangeSearchInput}
          />
          <button
            type={"button"}
            className={styles.clearButton}
            onClick={clearInputValue}
          >
            <CloseRoundIcon />
          </button>
        </form>
        <button className={styles.searchButton} onClick={handleSubmit}>
          <SearchIcon />
        </button>
      </div>
      {/* 최상위로 가기 버튼 */}
      {hasVerticalOverflow && (
        <button
          className={styles.scrollTopButton}
          onClick={() => {
            scrollTop();
          }}
        >
          <ExpendUpIcon />
        </button>
      )}
      {/* 검색 결과 */}
      <section className={styles.searchInnerPage} ref={pageRef}>
        {showSearchLog ? (
          <SearchLogRenderer />
        ) : (
          <SlideMenu menuTitleList={["장소 검색", "컬렉션 검색"]}>
            <SlideMenuInnerPage>
              <SearchPlaceRender searchKeyword={searchKeyword} />
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              <SearchCollectionRender searchKeyword={searchKeyword} />
            </SlideMenuInnerPage>
          </SlideMenu>
        )}
      </section>
    </section>
  );
}

const SearchLogRenderer = () => {
  return (
    <div className={styles.searchLogContainer}>
      <span className={styles.searchLogBanner}>최근 검색</span>
      <section className={styles.searchLogLists}>
        <SearchLog searchString="강남맛집" searchCategory="장소" />
        <SearchLog searchString="강남맛집" searchCategory="장소" />
        <SearchLog searchString="해방촌" searchCategory="장소" />
        <SearchLog searchString="독립 서점" searchCategory="핀" />
        <SearchLog searchString="강남맛집" searchCategory="장소" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="독립 서점" searchCategory="핀" />
        <SearchLog searchString="독립 서점" searchCategory="핀" />
        <SearchLog searchString="독립 서점" searchCategory="핀" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션" />
        <SearchLog
          searchString="서울에서 제일이나 두번째로 맛있는 맛집"
          searchCategory="컬렉션"
        />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션" />
        <SearchLog searchString="서울 맛집" searchCategory="컬렉션" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
        <SearchLog searchString="강남맛집" searchCategory="전체" />
      </section>
    </div>
  );
};
