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

import { PlaceDetail } from "@/types/Place";
import { CollectionDetail } from "@/types/Collection";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const [collectionDatas, setCollectionDatas] = useState<CollectionDetail[]>(
    []
  );
  const [showSearchLog, setShowSearchLog] = useState(true);
  const searchParams = useSearchParams();
  const [searchPlaceMessage, setSearchPlaceMessage] = useState<string>("");
  const [searchCollectionMessage, setSearchCollectionMessage] =
    useState<string>("");

  const page = 1;
  const size = 10;

  useEffect(() => {
    const param = searchParams.get("searchString");
    console.log("param", param);
    if (param) {
      setInputCollectionSearch(param);
      setShowSearchLog(false);
      searchPlace(param);
    }
  }, [searchParams]);

  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("검색");
    if (inputCollectionSearch === "") {
      setShowSearchLog(true);
    } else {
      setShowSearchLog(false);
      searchPlace(inputCollectionSearch);
    }
  };

  const clearInputValue = () => {
    setInputCollectionSearch("");
  };

  const searchPlace = (searchKeyWord: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${searchKeyWord}&page=${page}&size=${size}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("검색에 실패했습니다.");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPlaceDatas(data);
      })
      .then(() => {
        if (placeDatas.length === 0)
          setSearchPlaceMessage("검색 키워드에 맞는 업체가 없습니다.");
        else setSearchPlaceMessage("");
      })
      .catch((err) => {
        console.log(err);
        setSearchPlaceMessage("검색에 실패했습니다.");
      });
  };

  const searchCollection = () => {};

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
      <div className={styles.topper}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <ExpandLeftIcon />
        </button>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            placeholder="강릉, 맛집,  디저트 ... !"
            value={inputCollectionSearch}
            onChange={onChangeCollection}
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
      <section className={styles.searchInnerPage} ref={pageRef}>
        {showSearchLog ? (
          <SearchLogRenderer />
        ) : (
          <SlideMenu menuTitleList={["장소 검색", "컬렉션 검색"]}>
            <SlideMenuInnerPage>
              {placeDatas.length === 0 ? (
                <p className={styles.searchMessage}>{searchPlaceMessage}</p>
              ) : (
                <SearchPlaceRender placeDatas={placeDatas} />
              )}
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              {collectionDatas.length === 0 ? (
                <p className={styles.searchMessage}>
                  {searchCollectionMessage}
                </p>
              ) : (
                <SearchCollectionRender collectiondatas={collectionDatas} />
              )}
            </SlideMenuInnerPage>
          </SlideMenu>
        )}
      </section>
      {/* </SubPageLayout> */}
    </section>
  );
}

const SearchLogRenderer = ({}: {}) => {
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
