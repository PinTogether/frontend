"use client";

import PinCard from "@/components/PinCard";
import styles from "@/styles/components/_pincard.module.scss";
import CollectionCard from "@/components/CollectionCard";
import Collection, { CollectionDetail } from "@/types/Collection";
import { PlaceDetail, PlaceStarred } from "@/types/Place";
import Pin, { CollectionPins } from "@/types/Pin";
import { SimplePinCard } from "@/components/PinCard";

import PlaceCard, { SimplePlaceCard } from "@/components/PlaceCard";
// import PlaceCard from "@/components/PlaceCard";
// import PinReview from "@/types/PinReview";

const collection: CollectionDetail = {
  id: 1,
  title: "야호야호야호야호야호야호야호야",
  writerId: 1,
  writerMembername: "zoooooo_S2zoooooo_S2zoooooo_S2111",
  thumbnail: "https://picsum.photos/id/326/300",
  // details: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
  details:
    "강릉 주민들이 자주 가는 맛집 모음집입니다.강릉 주민들이 자주 가는 맛집 모음집입니다.강릉 주민들이 자주 가는 맛집 모음집입니다.강릉 주민들이 자주 가는 맛집 모음집입니다.강릉 주민들이 자주 가는 맛집 모음집입니다.강릉 주민들이 자주 가는 맛집 모음집입니다.",
  likeCnt: 12,
  pinCnt: 5,
  scrapCnt: 3,
  scrapped: true,
  liked: false,
  tags: ["강릉", "맛집", "주민"],
};

const pinData: Pin = {
  id: 1,
  placeId: 13,
  collectionId: 1,
  writerMembername: "잠자는_짱구의_콧털",
  review:
    "포카리스웨트 강남역점은 맛있는 음식을 먹을 수 있는 곳입니다.포카리스웨트 강남역점은 맛있는 음식을 먹을 수 있는 곳입니다.포카리스웨트 강남역점은 맛있는 음식을 먹을 수 있는 곳입니다.포카리스웨트 강남역점은 맛있는 음식을 먹을 수 있는 곳입니다.",
  createdAt: "2021-08-01",
  saveCnt: 3,
  roadNameAddress:
    "서울특별시 강남구 도산대로59길 16, 지하1층 (청담동, TABLE2025)",
  placeName: "레스쁘아",
  latitude: 37.123456,
  longitude: 127.123456,
  starred: true,
  category: "음식점>경양식",
  tags: ["포카리스웨트", "강남역점"],
  imagePaths: [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ],
  collectionTitle: "강릉 주민 맛집",
};

const pinData2: Pin = {
  id: 37,
  collectionId: 101,
  collectionTitle: "디저트",
  writerId: 3,
  writerMembername: "best_cottull",
  avatarImage: "",
  review: "",
  tags: [],
  imagePaths: [],
  createdAt: "11일 전",
  placeId: 539612,
  placeName: "디저트39",
  category: "음식점>기타",
  roadNameAddress: "서울특별시 용산구 한강대로 305, 지하1층 (갈월동)",
  latitude: 37.54554952024324,
  longitude: 126.97158543222845,
  saveCnt: 0,
  starred: false,
  // pinCnt: 5,
};

const placeData: PlaceDetail = {
  id: 1,
  name: "포카리스웨트 강남역점",
  roadNameAddress: "서울특별시 강남구 역삼동 123-45",
  category: "음식점",
  latitude: 37.123456,
  longitude: 127.123456,
  starred: true,
  pinCnt: 3,
};

const placeStarredData: PlaceStarred = {
  id: 1,
  name: "포카리스웨트 강남역점",
  roadNameAddress: "서울특별시 강남구 역삼동 123-45",
  category: "음식점",
  latitude: 37.123456,
  longitude: 127.123456,
  starred: true,
  pinCnt: 3,
};

const commentList: Pin[] = [
  {
    id: 1,
    placeId: 13,
    collectionId: 1,
    writerMembername: "user123",
    review: "아름다운 경치와 맛있는 음식",
    createdAt: "2023-02-15T12:34:56",
    saveCnt: 25,
    roadNameAddress: "서울특별시 강남구 어딘가",
    placeName: "멋진 카페",
    latitude: 37.1234,
    longitude: 127.1234,
    starred: true,
    category: "카페",
    tags: ["커피", "디저트", "휴식"],
    collectionTitle: "서울 핫플레이스",
    imagePaths: [
      "https://picsum.photos/200",
      "https://picsum.photos/200",
      "https://picsum.photos/200",
    ],
  },
  {
    id: 2,
    placeId: 13,
    collectionId: 2,
    writerMembername: "user456",
    review: "편안한 분위기에서 즐기는 최고의 커피",
    createdAt: "2023-03-01T15:20:30",
    saveCnt: 40,
    roadNameAddress: "서울특별시 종로구 다른 곳",
    placeName: "조용한 북카페",
    latitude: 37.5759,
    longitude: 126.9769,
    starred: false,
    category: "북카페",
    tags: ["책", "커피", "조용함"],
    collectionTitle: "서울의 숨겨진 보석",
    imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200"],
  },
  {
    id: 3,
    placeId: 13,
    collectionId: 3,
    writerMembername: "user789",
    review: "경치가 뛰어나고 음식도 훌륭한 곳",
    createdAt: "2023-04-10T18:45:00",
    saveCnt: 55,
    roadNameAddress: "서울특별시 용산구 또 다른 곳",
    placeName: "전망 좋은 레스토랑",
    latitude: 37.5283,
    longitude: 126.9827,
    starred: true,
    category: "레스토랑",
    tags: ["전망", "고급", "스테이크"],
    collectionTitle: "서울 미식 탐방",
    imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200"],
  },
];

export default function Page() {
  return (
    <div className={styles.page}>
      <p>1. collectioncard default</p>
      <CollectionCard collectionData={collection} />
      <br />

      <p>2. collectioncard simple</p>
      <CollectionCard collectionData={collection} simple={true} />
      <br />

      <p>3. collectioncard horizontal</p>
      <CollectionCard collectionData={collection} horizontal={true} />
      <br />

      <p>4. collectioncard detail</p>
      <CollectionCard collectionData={collection} detail={true} />
      <br />

      <p>1. PlaceCard </p>

      <PlaceCard place={placeData} />
      <br />
      <PlaceCard place={placeStarredData} />
      <br />

      <p>2. SimplePlaceCard </p>

      <SimplePlaceCard place={placeData} />
      <br />
      <SimplePlaceCard place={placeStarredData} />
      <br />
      <br />

      <p>1. PinCard</p>
      <PinCard pinData={pinData} showReview={false} showSubButtons={false} />
      <PinCard pinData={pinData} showReview={false} />
      <PinCard pinData={pinData} showReview={true} showSubButtons={false} />
      <PinCard pinData={pinData} showReview={true} />

      <br />

      <p>2. SimplePinCard</p>
      <SimplePinCard pinData={pinData} />
      <SimplePinCard pinData={pinData} showSubButtons={true} />
      <SimplePinCard pinData={pinData} activeShowDetail={true} />

      <p> 3. test ? </p>
      <SimplePinCard pinData={pinData2} />

      <br />
    </div>
  );
}
