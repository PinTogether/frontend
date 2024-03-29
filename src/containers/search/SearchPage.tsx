"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import {
  CloseRoundIcon,
  ExpandLeftIcon,
  ExpendUpIcon,
  SearchIcon,
} from "../../components/IconSvg";
import { SearchLogContent } from "./SearchLogContent";
import SearchPlaceRender from "./SearchPlaceRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import GlobalAlertModal from "@/components/GlobalAlertModal";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import fetchGetSearchHistory from "@/utils/search/fetchGetSearchHistory";

export default function Page() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showSearchLog, setShowSearchLog] = useState(true);
  const searchParams = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");

  /* 검색어 초기화 */
  useEffect(() => {
    // URL에 searchParams가 있으면 해당 검색어로 검색
    const param = searchParams.get("keyword");
    if (param) {
      setSearchInputValue(param);
      setShowSearchLog(false);
      setSearchKeyword(param);
    }
  }, [searchParams]);

  const onChangeSearchInput = (e: any) => {
    setSearchInputValue(e.target.value);
  };

  /* submit */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchInputValue === "") {
      setShowSearchLog(true);
      setSearchKeyword("");
    } else {
      setShowSearchLog(false);
      setSearchKeyword(searchInputValue);
    }
  };

  const clearInputValue = () => {
    setSearchInputValue("");
    setSearchKeyword("");
    setShowSearchLog(true);
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
      {/* 최상위로 스크롤 버튼 */}
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
      <GlobalAlertModal />
    </section>
  );
}

import SearchLog from "@/types/SearchLog";
import useCheckIsLogin from "@/hooks/useCheckLogin";

const SearchLogRenderer = () => {
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLogin = useCheckIsLogin();

  useEffect(() => {
    // 최근 검색어 불러오기
    const fetch = async () => {
      if (isLoading) return;
      setIsLoading(true);
      const { searchLogs, errorMessage } = await fetchGetSearchHistory();
      if (errorMessage) setErrorMessage(errorMessage);
      else setSearchLogs(searchLogs);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className={styles.searchLogContainer}>
      {!isLogin ? (
        // 비회원
        <>
          <p className={styles.errorMessage}>🥨 음식점을 검색해보세요 🥪</p>
          <p className={styles.errorMessage}>📍 컬렉션도 검색할 수 있어요 📌</p>
        </>
      ) : (
        // 회원
        <>
          <span className={styles.searchLogBanner}>최근 검색</span>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : searchLogs.length === 0 ? (
            <>
              <p className={styles.errorMessage}>🥨 음식점을 검색해보세요 🥪</p>
              <p className={styles.errorMessage}>
                📍 컬렉션도 검색할 수 있어요 📌
              </p>
            </>
          ) : (
            <section className={styles.searchLogLists}>
              {searchLogs.map((searchLog) => (
                <SearchLogContent
                  key={searchLog.id}
                  searchKeyword={searchLog.query}
                  searchCategory={"total"} // searchCategory는 미사용
                />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};
