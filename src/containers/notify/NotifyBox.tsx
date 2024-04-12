// notificationType:
// | "SCRAP_COLLECTION"
// | "COMMENT_ON_COLLECTION"
// | "LIKE_COLLECTION"
// | "FOLLOW"
// | "CREATE_COLLECTION";

import Link from "next/link";

import styles from "@/styles/containers/notify/_notifyPage.module.scss";
import { Notify } from "@/types/Notify";

const NotifyBox = ({ data }: { data: Notify }) => {
  switch (data.notificationType) {
    case "SCRAP_COLLECTION":
      return <ScrapCollectionBox data={data} />;
    case "COMMENT_ON_COLLECTION":
      return <CommentOnCollectionBox data={data} />;
    case "LIKE_COLLECTION":
      return <LikeCollectionBox data={data} />;
    case "FOLLOW":
      return <FollowBox data={data} />;
    case "CREATE_COLLECTION":
      return <CreateCollectionBox data={data} />;
    default:
      return <></>;
  }
};

export default NotifyBox;

const ScrapCollectionBox = ({ data }: { data: Notify }) => {
  return (
    <span className={styles.notifyBox}>
      <Link className={styles.purpleEmphasis} href={`/profile/${data.subject}`}>
        {data.subject}
      </Link>
      {"님이 "}
      <Link
        href={`/collection/${data.objectId}`}
        className={styles.purpleEmphasis}
      >{`${data.object}`}</Link>
      {"컬렉션을 스크랩 하였습니다."}
    </span>
  );
};

const CommentOnCollectionBox = ({ data }: { data: Notify }) => {
  return (
    <span className={styles.notifyBox}>
      <Link className={styles.purpleEmphasis} href={`/profile/${data.subject}`}>
        {data.subject}
      </Link>
      {"님이 "}
      <Link
        href={`/collection/${data.objectId}`}
        className={styles.purpleEmphasis}
      >
        {data.object}
      </Link>
      {"컬렉션에 댓글을 달았습니다."}
    </span>
  );
};

const LikeCollectionBox = ({ data }: { data: Notify }) => {
  return (
    <span className={styles.notifyBox}>
      <Link className={styles.purpleEmphasis} href={`/profile/${data.subject}`}>
        {data.subject}
      </Link>
      {"님이 "}
      <Link
        href={`/collection/${data.objectId}`}
        className={styles.purpleEmphasis}
      >
        {data.object}
      </Link>
      {"컬렉션에 좋아요를 눌렀습니다."}
    </span>
  );
};

const FollowBox = ({ data }: { data: Notify }) => {
  return (
    <span className={styles.notifyBox}>
      <Link className={styles.purpleEmphasis} href={`/profile/${data.subject}`}>
        {data.subject}
      </Link>
      {" 님이 "}
      <span className={styles.purpleEmphasis}>{`나`}</span>
      {"를 팔로우 하였습니다."}
    </span>
  );
};

const CreateCollectionBox = ({ data }: { data: Notify }) => {
  return (
    <span className={styles.notifyBox}>
      <Link className={styles.purpleEmphasis} href={`/profile/${data.subject}`}>
        {data.subject}
      </Link>
      {"님이 새 컬렉션 "}
      <Link
        href={`/collection/${data.objectId}`}
        className={styles.purpleEmphasis}
      >
        {data.object}
      </Link>
      {"을 만들었습니다."}
    </span>
  );
};
