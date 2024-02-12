import styles from "@/styles/layout/_collectionPage.module.scss";
import PinCard from "@/components/PinCard";
import Topper from "@/components/SubTopper";
import IPin from "@/types/IPin";
import IComment from "@/types/IComment";
import ICollection from "@/types/ICollection";
import Comment from "@/components/Comment";
import CollectionCard from "@/components/CollectionCard";

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
    id: 1,
    userId: 1,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
    userId: 2,
    userNickname: "잠자는_짱구의_콧털",
    comment: `포카리스웨트 강남역점은
  맛있는 음식을 먹을 수 있는 곳입니다.
  무엇보다도 가격이 저렴하고
  서비스가 좋아서 자주 방문하게 되네요.`,

    commentImages: {},
  },
  {
    id: 2,
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
    <section className={styles.container}>
      <Topper msg={"컬렉션(장소모음) 조회"} />
      <section className={styles.collectionDataContainer}>
        <div className={styles.collectionData}>
          <CollectionCard collectionData={collection} />
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button className={styles.buttons}>핀 보기</button>
        <button className={styles.buttons}>핀 코멘트 같이 보기</button>
        <button className={styles.buttons}>컬렉션 댓글 보기</button>
        <button className={styles.buttons}>+ 핀 추가</button>
      </section>
      <section className={styles.collectionListContainer}>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
        <PinCard pinData={pinData}>
          <Comment commentData={commentData} />
        </PinCard>
      </section>
    </section>
  );
}
