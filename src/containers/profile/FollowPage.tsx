"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/styles/containers/profile/_followPage.module.scss";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { SlideMenu, SlideMenuInnerPage } from "@/components/SlideMenu";
import { ProfileFollower } from "@/types/Profile";

import useGetMyProfile from "@/hooks/useGetMyProfile";
import fetchGetMyFollowers from "@/utils/fetchGetMyFollowers";
import fetchGetMyFollowings from "@/utils/fetchGetMyFollowings";

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
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </SlideMenuInnerPage>
      </SlideMenu>
    </SubPageLayout>
  );
};
export default FollowPage;

const UserCard = ({ user }: { user: ProfileFollower }) => {
  return (
    <Link href={`/profile/${user.id}`} className={styles.userCard}>
      <Image
        src={user.avatar}
        alt="user profile image"
        width={100}
        height={100}
        className={styles.userAvatar}
      />

      <div className={styles.userNick}>{user.nickname}</div>
      <div
        className={styles.userCollectionCnt}
      >{`${user.collectionCnt}개 컬렉션`}</div>
    </Link>
  );
};
