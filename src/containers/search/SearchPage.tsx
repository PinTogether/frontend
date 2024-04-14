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
import SearchUserRender from "./SearchUserRenderer";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { SearchRangeFilter } from "@/types/SearchRangeFilter";
import { shallowEqual } from "react-redux"; // TODO rerendering 최적화

enum SearchCategory {
  HISTORY = -1,
  PLACE = 0,
  COLLECTION = 1,
  PIN = 2,
  USER = 3,
}
export enum RangeFilter {
  ALL = "all",
  MAP = "map",
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<number>(
    SearchCategory.HISTORY
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(RangeFilter.MAP);
  const [mapRange, setMapRange] = useState<SearchRangeFilter | null>(null);
  const mapNESW = useAppSelector((state) => state.location.mapNESW);

  /* 검색하기 */
  useEffect(() => {
    const newcategory = searchParams.get("category");
    const newKeyword = searchParams.get("keyword");
    const newRangefilter = searchParams.get("rangefilter");
    const paramMapRange = searchParams
      .get("mapRange")
      ?.split(",")
      .map((str) => Number(str));
    const newMapRange = paramMapRange
      ? {
          leftBottomLatitude: paramMapRange[2],
          leftBottomLongitude: paramMapRange[3],
          rightTopLatitude: paramMapRange[0],
          rightTopLongitude: paramMapRange[1],
        }
      : null;

    const search = async (category: string, keyword: string) => {
      if (isLoading) return;
      setIsLoading(true);
      if (searchParams.has("keyword")) {
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
        const convertedRangeFilter = convertToRangeFilter(newRangefilter);
        setSearchInputValue(decodeKeyword);
        setSearchKeyword(decodeKeyword);
        setRangeFilter(convertedRangeFilter);
        setMapRange(newMapRange);
        if (decodeKeyword && (!category || category === "history")) {
          setSelectedMenu(SearchCategory.PLACE);
        } else setSelectedMenu(convertToSearchCategory(category));
      } else {
        console.log("검색어가 없습니다.");
        setSearchInputValue("");
        setSearchKeyword("");
        setSelectedMenu(SearchCategory.HISTORY);
        setRangeFilter(RangeFilter.MAP);
      }
      setIsLoading(false);
    };
    search(newcategory || "", newKeyword || "");
  }, [searchParams]);

  // /* menu 변경 */
  const customSetSelectedMenu = (index: SearchCategory) => {
    setSelectedMenu(index);
    const category = convertToSearchCategoryStr(selectedMenu);
    const keyword = encodeURIComponent(searchInputValue);
    const newRangefilter = rangeFilter;

    const newUrl = makeUrl(keyword, category, newRangefilter, mapNESW);
    router.push(newUrl);
  };

  const setRangeFilterType = (newRangefilter: RangeFilter) => {
    const category = convertToSearchCategoryStr(selectedMenu);
    const keyword = encodeURIComponent(searchInputValue);

    const newUrl = makeUrl(keyword, category, newRangefilter, mapNESW);
    router.push(newUrl);
  };

  /* submit */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const category =
      searchParams.get("category") ||
      convertToSearchCategoryStr(SearchCategory.PLACE);
    const keyword = encodeURIComponent(searchInputValue);
    const newRangefilter = rangeFilter;

    const newUrl = makeUrl(keyword, category, newRangefilter, mapNESW);
    router.push(newUrl);
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
        {selectedMenu === SearchCategory.HISTORY ? (
          <SearchLogRenderer />
        ) : (
          <SlideMenu
            menuTitleList={["장소 검색", "컬렉션 검색", "핀 검색", "유저 검색"]}
            customSelectedMenu={selectedMenu}
            customSetSelectedMenu={customSetSelectedMenu}
          >
            <SlideMenuInnerPage>
              <SearchPlaceRender
                searchKeyword={searchKeyword}
                rangeFilter={rangeFilter}
                mapRange={mapRange}
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
                mapRange={mapRange}
                setRangeFilterType={setRangeFilterType}
              />
            </SlideMenuInnerPage>
            <SlideMenuInnerPage>
              <SearchUserRender searchKeyword={searchKeyword} />
            </SlideMenuInnerPage>
          </SlideMenu>
        )}
      </section>
      <GlobalAlertModal />
    </section>
  );
}

/* Utils */

const makeUrl = (
  newKeyword: string,
  newCategory: string | SearchCategory,
  newRangefilter: RangeFilter,
  newMapRange: number[]
) => {
  const convertedCategory =
    typeof newCategory === "string"
      ? newCategory
      : convertToSearchCategoryStr(newCategory);

  const newUrl =
    `/search?keyword=${newKeyword}&category=${convertedCategory}` +
    (convertedCategory === "pin" || convertedCategory === "place"
      ? newRangefilter === RangeFilter.MAP
        ? `&rangefilter=${newRangefilter}&mapRange=${newMapRange}`
        : `&rangefilter=${newRangefilter}`
      : ``);
  return newUrl;
};

const convertToSearchCategory = (category: string) => {
  switch (category) {
    case "place":
      return SearchCategory.PLACE;
    case "collection":
      return SearchCategory.COLLECTION;
    case "history":
      return SearchCategory.HISTORY;
    case "pin":
      return SearchCategory.PIN;
    case "user":
      return SearchCategory.USER;
    default:
      return SearchCategory.HISTORY;
  }
};

const convertToSearchCategoryStr = (selectedMenu: number) => {
  switch (selectedMenu) {
    case SearchCategory.PLACE:
      return "place";
    case SearchCategory.COLLECTION:
      return "collection";
    case SearchCategory.HISTORY:
      return "history";
    case SearchCategory.PIN:
      return "pin";
    case SearchCategory.USER:
      return "user";
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

const useGetMapSSSS = () => {
  const [mapNESWState, setMapNESWState] = useState<number[]>([]);
  const mapNESW = useAppSelector(
    (state) => state.location.mapNESW,
    shallowEqual
  );

  const getMapNESW = () => {
    setMapNESWState(mapNESW);
    return mapNESW;
  };

  return { mapNESWState, getMapNESW };
};
