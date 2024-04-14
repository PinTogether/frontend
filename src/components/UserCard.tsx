import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/profile/_followPage.module.scss";
import { ProfileFollower } from "@/types/Profile";

import fetchDeleteFollow from "@/utils/members/fetchDeleteFollow";
import fetchPostFollow from "@/utils/members/fetchPostFollow";

const UserCard = ({
  user,
  showUnfollowButton = false,
}: {
  user: ProfileFollower;
  showUnfollowButton?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState(user.isFollowed ?? true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (isFollowing) {
      const res = await fetchDeleteFollow(user.id);
      if (!res.success) {
        dispatch(addAlertMessage(res.errorMessage));
      } else {
        setIsFollowing((prev) => !prev);
        dispatch(addAlertMessage("팔로우 취소되었습니다."));
      }
    } else {
      const res = await fetchPostFollow(user.id);
      if (!res.success) {
        dispatch(addAlertMessage(res.errorMessage));
      } else {
        setIsFollowing((prev) => !prev);
        dispatch(addAlertMessage("팔로우 되었습니다."));
      }
    }
    setIsLoading(false);
  };

  return (
    <article className={styles.userCard}>
      <Link href={`/profile/${user.membername}`} className={styles.userAvatar}>
        <Image
          src={user.avatar}
          alt="user profile image"
          width={100}
          height={100}
        />
      </Link>
      <Link href={`/profile/${user.membername}`} className={styles.names}>
        <div className={styles.userMembername}>{`${user.membername}`}</div>
        <div className={styles.userName}>{`${user.name}`}</div>
      </Link>
      <div
        className={styles.userCollectionCnt}
      >{`${user.collectionCnt}개 컬렉션`}</div>
      {showUnfollowButton &&
        (isFollowing ? (
          <button className={styles.followBtn} onClick={handleFollow}>
            팔로우 취소
          </button>
        ) : (
          <button className={styles.followBtn} onClick={handleFollow}>
            팔로우
          </button>
        ))}
    </article>
  );
};
export default UserCard;
