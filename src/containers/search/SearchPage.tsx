"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { useState, useRef, useEffect } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import {
  ExpandLeftIcon,
  ExpendUpIcon,
  SearchIcon,
} from "../../components/IconSvg";
import SearchPlaceRender from "./SearchPlaceRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";

import CollectionDatas from "@/../../public/dummy-data/dummy-collection.json";
import { PlaceDetail } from "@/types/Place";
import { CollectionDetail } from "@/types/Collection";
import { SubPageLayout, SubPageTopper } from "../layout/SubPageLayout";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");
  const [placeDatas, setPlaceDatas] = useState<PlaceDetail[]>([]);
  const [collectionDatas, setCollectionDatas] = useState<CollectionDetail[]>(
    []
  );
  const [showSearchLog, setShowSearchLog] = useState(true);
  const searchParams = useSearchParams();
  const page = 1;
  const size = 10;

  useEffect(() => {
    const param = searchParams.get("searchString");
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

  const searchPlace = (searchKeyWord: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/place?query=${searchKeyWord}&page=${page}&size=${size}`
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
              <SearchPlaceRender placeDatas={placeDatas} />
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              <SearchCollectionRender collectiondatas={CollectionDatas} />
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
