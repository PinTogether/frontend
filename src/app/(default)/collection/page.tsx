import styles from "@/styles/layout/_collectionPage.module.scss";
import PinCard from "@/components/PinCard";
import Topper from "@/components/SubTopper";
import IPin from "@/types/IPin";
import IComment from "@/types/IComment";
import Comment from "@/components/Comment";

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
          <div style={{ width: "380px" }}>asd</div>
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button className={styles.buttons}>장소만 보기</button>
        <button className={styles.buttons}>코멘트 같이 보기</button>
        <button className={styles.buttons}>+ 장소 추가</button>
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
