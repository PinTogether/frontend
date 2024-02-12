"use client";

import PinCard, { LocationCard } from "@/components/PinCard";
import styles from "@/styles/components/_pincard.module.scss";
import CollectionCard from "@/components/CollectionCard";
import Comment from "@/components/Comment";
import ICollection from "@/types/ICollection";
import IPin from "@/types/IPin";
import IComment from "@/types/IComment";

const collection: ICollection = {
  id: 1,
  title: "강릉 주민 맛집",
  ownerId: 1,
  ownerNickname: "잠자는_짱구의_콧털",
  thumbnail: "https://picsum.photos/id/326/300",
  detail: "강릉 주민들이 자주 가는 맛집 모음집입니다.",
  likeCnt: 12,
  pinCnt: 5,
};

const pinData: IPin = {
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
};

const commentData: IComment = {
  id: 1,
  userId: 1,
  userNickname: "잠자는_짱구의_콧털",
  comment: `포카리스웨트 강남역점은
	맛있는 음식을 먹을 수 있는 곳입니다.
	무엇보다도 가격이 저렴하고
	서비스가 좋아서 자주 방문하게 되네요.`,
  commentImages: {},
};

const commentList: IComment[] = [
  {
    id: 2,
    userId: 1,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 3,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 4,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 5,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 6,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
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
      <LocationCard locationData={pinData} />
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
