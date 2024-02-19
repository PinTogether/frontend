import ICollectionReply from "@/types/ICollectionReply";
import { CloseRoundIcon } from "../IconSvg";
import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Image from "next/image";

function ReplyContent({ data }: { data: ICollectionReply }) {
  const size = 100;
  const myId = 101;

  return (
    <section className={styles.replyContainer}>
      <Image
        src={data.userAvatar}
        alt="profile image"
        width={size}
        height={size}
        className={styles.replyAvatar}
      />
      <section className={styles.replyBox}>
        <div className={styles.replyName}>{data.userNickname}</div>
        <div>
          <span>{data.comment}</span>
          <span> </span>
          <span className={styles.replyName}>
            {data.createdAt.slice(0, 10)}
          </span>
        </div>
      </section>
      {myId === data.userId && (
        <button className={styles.replyButton}>
          <CloseRoundIcon style={{ width: "20px", height: "20px" }} />
        </button>
      )}
      {myId !== data.userId && (
        <button className={styles.replyButton}>신고</button>
      )}
    </section>
  );
}

export default function CollectionWithReply({
  replys,
}: {
  replys: ICollectionReply[];
}) {
  const myId = 101; // 나중에 localStorage 같은곳에 있는 내 id와 비교하는걸로 변경
  return (
    <section className={styles.collectionReplyContainer}>
      {replys.map((reply, index) => (
        <ReplyContent key={index} data={reply} />
      ))}
    </section>
  );
}
