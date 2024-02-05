import styles from "@/styles/components/_pincard.module.scss";
import { LinkIcon, PinIcon } from "@/components/Icons";
import Comment from "@/components/Comment";
import IPin from "@/types/IPin";
import IComment from "@/types/IComment";

export default function PinCard({
  pinData,
  commentData,
  commentList,
}: {
  pinData: IPin;
  commentData?: IComment;
  commentList?: IComment[];
}) {
  return (
    <article className={styles.pinCard}>
      <div className={styles.mainInfo}>
        <PinIcon calssName={styles.pinIcon} />
        <button className={styles.title}>
          <h3>{pinData.placeName}</h3>
          <p>{pinData.category}</p>
        </button>
        <address>{pinData.roadNameAddress}</address>
        <div className={styles.buttons}>
          <button>
            {`컬렉션에 추가하기`}
            <LinkIcon />
          </button>
          <button>
            {`공유하기`}
            <LinkIcon />
          </button>
        </div>
      </div>

      {commentData && (
        <>
          <br />
          <Comment commentData={commentData} activeGoCollectionBtn={false} />
        </>
      )}
      {commentList && (
        <>
          <br />
          <ul className={styles.commentList}>
            {commentList.map((comment) => (
              <li key={comment.id}>
                <Comment commentData={comment} />
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
