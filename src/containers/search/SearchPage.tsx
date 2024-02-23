"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { useState } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import { SearchIcon } from "../../components/IconSvg";
import Pin, { PinForPlace } from "@/types/Pin";
import Collection, { CollectionDetail } from "@/types/Collection";
import SearchPinRender from "./SearchPinRenderer";
import SearchLocationRender from "./SearchLocationRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";

const CollectionDatas: CollectionDetail[] = [
  {
    id: 1,
    title: "서울의 숨은 맛집",
    writerId: 100,
    writer: "FoodieKim",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 150,
    pinCnt: 5,
    scrapCnt: 75,
    isScrapped: false,
    isLiked: true,
    details:
      "서울 곳곳의 숨은 맛집을 소개합니다. 각종 매체에 소개되지 않은, 현지인만 아는 그런 곳들이죠.",
    tags: ["맛집", "서울", "현지인추천"],
    commentCnt: 45,
  },
  {
    id: 2,
    title: "주말 가볼만한 곳",
    writerId: 101,
    writer: "TravelPark",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 200,
    pinCnt: 8,
    scrapCnt: 50,
    isScrapped: true,
    isLiked: false,
    details:
      "주말에 친구, 연인, 가족과 함께 가볼 만한 곳들을 모아봤습니다. 자연에서의 힐링, 문화생활을 즐길 수 있는 곳 등 다양합니다.",
    tags: ["주말", "여행", "가족여행"],
    commentCnt: 30,
  },
  {
    id: 3,
    title: "해외 여행지 추천",
    writerId: 102,
    writer: "GlobeTrotter",
    thumbnail: "https://picsum.photos/200",
    likeCnt: 300,
    pinCnt: 12,
    scrapCnt: 120,
    isScrapped: true,
    isLiked: true,
    details:
      "코로나 이후 다시 떠나고 싶은 해외 여행지들을 추천합니다. 아시아, 유럽, 아메리카 등 다양한 대륙의 숨겨진 보석 같은 곳들을 소개해요.",
    tags: ["해외여행", "여행지추천", "바캉스"],
    commentCnt: 60,
  },
];
const pinDatas: PinForPlace[] = [
  {
    id: 1,
    collectionId: 1,
    writer: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    address: "서울특별시 강남구 어딘가",
    placeName: "멋진 카페",
    image: "image_path.jpg",
    xPos: 37.1234,
    yPos: 127.1234,
    starred: true,
    category: "카페",
    tags: ["커피", "디저트", "휴식"],
    collectionTitle: "서울 핫플레이스",
    imagePaths: ["image_path1.jpg", "image_path2.jpg", "image_path3.jpg"],
    phoneNumber: "02-123-4567",
  },
  {
    id: 2,
    collectionId: 2,
    writer: "user456",
    review: "편안한 분위기에서 즐기는 최고의 커피",
    createdAt: "2023-03-01T15:20:30",
    saveCnt: 40,
    address: "서울특별시 종로구 다른 곳",
    placeName: "조용한 북카페",
    image: "image_path2.jpg",
    xPos: 37.5759,
    yPos: 126.9769,
    starred: false,
    category: "북카페",
    tags: ["책", "커피", "조용함"],
    collectionTitle: "서울의 숨겨진 보석",
    imagePaths: ["image_path4.jpg", "image_path5.jpg"],
    phoneNumber: "02-654-3210",
  },
  {
    id: 3,
    collectionId: 3,
    writer: "user789",
    review: "경치가 뛰어나고 음식도 훌륭한 곳",
    createdAt: "2023-04-10T18:45:00",
    saveCnt: 55,
    address: "서울특별시 용산구 또 다른 곳",
    placeName: "전망 좋은 레스토랑",
    image: "image_path3.jpg",
    xPos: 37.5283,
    yPos: 126.9827,
    starred: true,
    category: "레스토랑",
    tags: ["전망", "고급", "스테이크"],
    collectionTitle: "서울 미식 탐방",
    imagePaths: ["image_path6.jpg", "image_path7.jpg", "image_path8.jpg"],
    phoneNumber: "02-987-6543",
  },
];

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
        <SearchCollectionRender collectiondatas={CollectionDatas} />
      </section>
    </section>
  );
}
