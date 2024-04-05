"use client";

import { useState, useEffect } from "react";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import SearchLog from "@/types/SearchLog";
import { SearchLogContent } from "./SearchLogContent";

import { useGetMyProfile } from "@/hooks/myProfileHooks";
import fetchGetSearchHistory from "@/utils/search/fetchGetSearchHistory";

const SearchLogRenderer = () => {
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const myProfile = useGetMyProfile();

  useEffect(() => {
    // 최근 검색어 불러오기
    const fetch = async () => {
      if (isLoading || !myProfile) return;
      setIsLoading(true);
      const { searchLogs, errorMessage } = await fetchGetSearchHistory();
      if (errorMessage) setErrorMessage(errorMessage);
      else setSearchLogs(searchLogs);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const deleteSearchLog = (id: number) => {
    setSearchLogs(searchLogs.filter((log) => log.id !== id));
  };

  return (
    <div className={styles.searchLogContainer}>
      {!myProfile ? (
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
                  id={searchLog.id}
                  searchKeyword={searchLog.query}
                  searchCategory={"total"} // searchCategory는 미사용
                  deleteSearchLog={deleteSearchLog}
                />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SearchLogRenderer;
