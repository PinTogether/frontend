"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import {
  CloseRoundIcon,
  ExpandLeftIcon,
  ExpendUpIcon,
  SearchIcon,
} from "../../components/IconSvg";
import SearchPlaceRender from "./SearchPlaceRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";
import SearchLogRenderer from "./SearchLogRenderer";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import GlobalAlertModal from "@/components/GlobalAlertModal";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchPinRender from "./SearchPinRenderer";

enum SearchCategory {
  HISTORY = -1,
  PLACE = 0,
  COLLECTION = 1,
  PIN = 2,
}
export enum RangeFilter {
  ALL = "all",
  MAP = "map",
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showSearchLog, setShowSearchLog] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<number>(
    SearchCategory.PLACE
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(RangeFilter.MAP);

  /* 검색하기 */
  useEffect(() => {
    const type = searchParams.get("type");
    const keyword = searchParams.get("keyword");
    const newRangefilter = searchParams.get("rangefilter");

    const search = async (type: string, keyword: string) => {
      if (isLoading) return;
      setIsLoading(true);
      if (keyword) {
        const getDecodeKeyword = (keyword: string) => {
          try {
            const decodeKeyword = decodeURIComponent(keyword);
            return decodeKeyword;
          } catch (e) {
            console.log("에러", e);
            return keyword;
          }
        };
        const decodeKeyword = getDecodeKeyword(keyword);
        const convertedRangeFileter = convertToRangeFilter(newRangefilter);
        setSearchInputValue(decodeKeyword);
        setShowSearchLog(false);
        setSearchKeyword(decodeKeyword);
        setRangeFilter(convertedRangeFileter);
        if (decodeKeyword && (!type || type === "history")) {
          setSelectedMenu(SearchCategory.PLACE);
        } else setSelectedMenu(convertToSearchCategory(type));
      } else {
        console.log("검색어가 없습니다.");
        setShowSearchLog(true);
        setSearchInputValue("");
        setSelectedMenu(SearchCategory.HISTORY);
        setRangeFilter(RangeFilter.MAP);
      }
      setIsLoading(false);
    };
    search(type || "", keyword || "");
  }, [searchParams]);

  useEffect(() => {
    console.log("rangeFilter!", rangeFilter);
  }, [rangeFilter]);

  const convertToSearchCategory = (type: string) => {
    switch (type) {
      case "place":
        return SearchCategory.PLACE;
      case "collection":
        return SearchCategory.COLLECTION;
      case "history":
        return SearchCategory.HISTORY;
      case "pin":
        return SearchCategory.PIN;
      default:
        return SearchCategory.HISTORY;
    }
  };

  const convertToType = (selectedMenu: number) => {
    switch (selectedMenu) {
      case SearchCategory.PLACE:
        return "place";
      case SearchCategory.COLLECTION:
        return "collection";
      case SearchCategory.HISTORY:
        return "history";
      case SearchCategory.PIN:
        return "pin";
      default:
        return "history";
    }
  };

  const convertToRangeFilter = (rangefilter: string | null) => {
    switch (rangefilter) {
      case "all":
        return RangeFilter.ALL;
      case "map":
        return RangeFilter.MAP;
      default:
        return RangeFilter.MAP;
    }
  };

  // /* menu 변경 */
  const customSetSelectedMenu = (index: SearchCategory) => {
    setSelectedMenu(index);
    const type = convertToType(selectedMenu);
    const keyword = encodeURIComponent(searchInputValue);
    router.push(`/search?keyword=${keyword}&type=${type}`);
  };

  const setRangeFilterType = (index: RangeFilter) => {
    const type = convertToType(selectedMenu);
    const keyword = encodeURIComponent(searchInputValue);
    router.push(`/search?keyword=${keyword}&type=${type}&rangefilter=${index}`);
  };

  /* submit */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const type = searchParams.get("type") || "";
    const keyword = encodeURIComponent(searchInputValue);
    router.push(`/search?keyword=${keyword}&type=${type}`);
  };

  /* 검색어 입력 */
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const clearInputValue = () => {
    setSearchInputValue("");
    setSearchKeyword("");
    router.push(`/search`);
  };

  // Topper & ScrollTop
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
          <SlideMenu
            menuTitleList={["장소 검색", "컬렉션 검색", "핀 검색"]}
            customSelectedMenu={selectedMenu}
            customSetSelectedMenu={customSetSelectedMenu}
          >
            <SlideMenuInnerPage>
              <SearchPlaceRender
                searchKeyword={searchKeyword}
                rangeFilter={rangeFilter}
                setRangeFilterType={setRangeFilterType}
              />
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              <SearchCollectionRender searchKeyword={searchKeyword} />
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              <SearchPinRender
                searchKeyword={searchKeyword}
                rangeFilter={rangeFilter}
                setRangeFilterType={setRangeFilterType}
              />
            </SlideMenuInnerPage>
          </SlideMenu>
        )}
      </section>
      <GlobalAlertModal />
    </section>
  );
}
