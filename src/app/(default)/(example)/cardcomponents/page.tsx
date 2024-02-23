"use client";

import PinCard, { LocationCard } from "@/components/PinCard";
import styles from "@/styles/components/_pincard.module.scss";
import CollectionCard from "@/components/CollectionCard";
import Comment from "@/components/Comment";
import Collection, { CollectionDetail } from "@/types/Collection";
import Pin, { PinForPlace } from "@/types/Pin";
// import PinReview from "@/types/PinReview";

const collection: CollectionDetail = {
  id: 1,
  title: "강릉 주민 맛집",
  writerId: 1,
  writer: "잠자는_짱구의_콧털",
  thumbnail: "https://picsum.photos/id/326/300",
  details: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
  likeCnt: 12,
  pinCnt: 5,
  scrapCnt: 3,
  isScrapped: true,
  isLiked: false,
  tags: ["강릉", "맛집", "주민"],
  commentCnt: 3,
};

const pinData: Pin = {
  id: 1,
  collectionId: 1,
  writer: "잠자는_짱구의_콧털",
  review: "포카리스웨트 강남역점은 맛있는 음식을 먹을 수 있는 곳입니다.",
  createdAt: "2021-08-01",
  saveCnt: 3,
  address: "서울특별시 강남구 역삼동 123-45",
  placeName: "포카리스웨트 강남역점",
  image: "https://picsum.photos/id/326/300",
  xPos: 37.123456,
  yPos: 127.123456,
  starred: true,
  category: "FOOD",
  tags: ["포카리스웨트", "강남역점"],
};

const commentData: PinForPlace = {
  id: 1,
  collectionId: 2,
  writer: "JaneDoe",
  review: "Great place to visit, loved the atmosphere!",
  createdAt: "2023-01-20T14:30:00Z",
  saveCnt: 42,
  address: "123 Main St, Anytown, AN",
  placeName: "Coffee Corner",
  image: "https://example.com/image.jpg",
  xPos: 37.5665,
  yPos: 126.978,
  starred: true,
  category: "Cafe",
  tags: ["coffee", "cozy", "wifi"],
  collectionTitle: "Favorite Spots",
  imagePaths: [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ],
  phoneNumber: "123-456-7890",
};

const commentList: PinForPlace[] = [
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
    imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"],
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
    imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    imagePaths: ["https://picsum.photos/200", "https://picsum.photos/200"],
    phoneNumber: "02-987-6543",
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

      <p>1. Locationcard </p>
      <LocationCard
        placeName={pinData.placeName}
        category={pinData.category}
        roadNameAddress={pinData.address}
      />
      <br />

      <p>1. pincard simple</p>
      <PinCard pinData={pinData} />
      <br />

      <p>2. pincard with comment</p>
      <PinCard pinData={pinData}>
        <Comment commentData={commentData} />
      </PinCard>
      <br />

      <p>3. pincard with comment list</p>
      <PinCard pinData={pinData}>
        {commentList && (
          <>
            {commentList.map((comment) => (
              <li key={comment.id}>
                <Comment commentData={comment} />
              </li>
            ))}
          </>
        )}
      </PinCard>
      <br />
    </div>
  );
}
