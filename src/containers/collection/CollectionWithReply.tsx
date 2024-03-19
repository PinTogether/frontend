import CollectionReply from "@/types/CollectionReply";
import { CloseRoundIcon } from "../../components/IconSvg";
import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import Image from "next/image";
import ReplyInputContent from "./CollectionReplyInput";

function ReplyContent({ data }: { data: CollectionReply }) {
  const size = 100;
  const myId = 101;

  return (
    <section className={styles.replyContainer}>
      <Image
        src={data.writerAvatar}
        alt="profile image"
        width={size}
        height={size}
        className={styles.replyAvatar}
      />
      <section className={styles.replyBox}>
        <div className={styles.replyName}>{data.writer}</div>
        <div>
          <span className={styles.replyText}>{data.contents}</span>
          <span className={styles.replyCreatedAt}>
            {data.createdAt.slice(0, 10)}
          </span>
        </div>
      </section>
      {myId === data.writerId && (
        <button className={styles.replyButton}>
          <CloseRoundIcon style={{ width: "20px", height: "20px" }} />
        </button>
      )}
      {myId !== data.writerId && (
        <button className={styles.replyButton}>신고</button>
      )}
    </section>
  );
}

export default function CollectionWithReplyRenderer({
  replys,
}: {
  replys: CollectionReply[];
}) {
  const myId = 101; // 나중에 localStorage 같은곳에 있는 내 id와 비교하는걸로 변경
  return (
    <section className={styles.collectionReplyContainer}>
      <ReplyInputContent />
      {replys.map((reply, index) => (
        <ReplyContent key={index} data={reply} />
      ))}
    </section>
  );
}
