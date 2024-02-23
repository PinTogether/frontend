"use client";

import styles from "@/styles/containers/search/_searchPage.module.scss";
import { useState } from "react";
import Topper from "@/components/SubTopper";
import { SearchLog } from "./SearchLog";
import { SearchIcon } from "../../components/IconSvg";
import IPin from "@/types/IPin";
import ICollection from "@/types/ICollection";
import SearchPinRender from "./SearchPinRenderer";
import SearchLocationRender from "./SearchLocationRenderer";
import SearchCollectionRender from "./SearchCollectionRenderer";

const CollectionDatas: ICollection[] = [
  {
    id: 1,
    title: "강릉 주민 맛집",
    writer: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1,
    title: "부산 주민 맛집",
    writer: 123,
    ownerNickname: "김개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 2233,
    title: "강릉 안주민 맛집",
    writer: 175,
    ownerNickname: "최개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
  {
    id: 1124,
    title: "아마존 원주민 맛집",
    writer: 144,
    ownerNickname: "이개",
    thumbnail: "https://picsum.photos/id/326/300",
    detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
    likeCnt: 12,
    pinCnt: 5,
  },
];

const pinDatas: IPin[] = [
  {
    id: 1,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "포카리스웨트 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 2,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 개포로 1-4",
    roadNameAddress: "서울특별시 강남구 개포동 123-45",
    roadZipCode: "12345",
    placeName: "파워에이드 개포동역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 3,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "게토레이 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 3,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "게토레이 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 3,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "게토레이 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
  },
  {
    id: 3,
    serviceId: "서울특별시 강남구 역삼동 123-45",
    localCode: 1,
    localManageCode: "12345",
    statusNumber: 1,
    status: "정상",
    phone: "02-1234-5678",
    zipCode: "12345",
    roadNumberAddress: "서울특별시 강남구 역삼동 123-45",
    roadNameAddress: "서울특별시 강남구 역삼로 123-45",
    roadZipCode: "12345",
    placeName: "게토레이 강남역점 1호점",
    category: "음식점업",
    x: 127.028,
    y: 37.498,
    comment: "음식점업", // 작성자의 코멘트
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
        <SearchCollectionRender collectiondatas={CollectionDatas}/>
      </section>
    </section>
  );
}
