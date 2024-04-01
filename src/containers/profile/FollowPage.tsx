"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/profile/_followPage.module.scss";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import { ProfileFollower } from "@/types/Profile";

import useGetMyProfile from "@/hooks/useGetMyProfile";
import fetchGetMyFollowers from "@/utils/members/fetchGetMyFollowers";
import fetchGetMyFollowings from "@/utils/members/fetchGetMyFollowings";
import fetchDeleteFollow from "@/utils/members/fetchDeleteFollow";
import fetchPostFollow from "@/utils/members/fetchPostFollow";

const FollowPage = ({ userId }: { userId: number }) => {
  const profile = useGetMyProfile(); // 유저 정보 가져오기

  const [followers, setFollowers] = useState<ProfileFollower[]>([]); // 팔로워 목록
  const [followings, setFollowings] = useState<ProfileFollower[]>([]); // 팔로잉 목록

  const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부
  const [followerErrorMessage, setFollowerErrorMessage] = useState("");
  const [follwingErrorMessage, setFollwingErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!profile || isLoading) return;
      console.log("fetchData");
      setIsLoading(true);
      const { followers, errorMessage } = await fetchGetMyFollowers();
      if (errorMessage || !followers) setFollowerErrorMessage(errorMessage);
      else setFollowers(followers);

      const { followings, errorMessage: errorMessage2 } =
        await fetchGetMyFollowings();
      if (errorMessage2 || !followings) setFollwingErrorMessage(errorMessage2);
      else setFollowings(followings);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SubPageLayout topperMsg="팔로우">
      <SlideMenu menuTitleList={[`팔로워 목록`, `팔로잉 목록`]}>
        <SlideMenuInnerPage key={0}>
          {followerErrorMessage && (
            <div className={styles.errorMessage}>{followerErrorMessage}</div>
          )}
          <div className={styles.userCardList}>
            {followers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </SlideMenuInnerPage>
        <SlideMenuInnerPage key={1}>
          {follwingErrorMessage && (
            <div className={styles.errorMessage}>{follwingErrorMessage}</div>
          )}
          <div className={styles.userCardList}>
            {followings.map((user) => (
              <UserCard key={user.id} user={user} showUnfollowButton={true} />
            ))}
          </div>
        </SlideMenuInnerPage>
      </SlideMenu>
    </SubPageLayout>
  );
};
export default FollowPage;

const UserCard = ({
  user,
  showUnfollowButton = false,
}: {
  user: ProfileFollower;
  showUnfollowButton?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState(true);
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
        <div className={styles.userName}>{`${user.name} name`}</div>
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
