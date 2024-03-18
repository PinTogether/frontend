"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { Suspense, useState, useEffect } from "react";
import ProfileStarsRenderer from "./ProfileBookmarkRenderer";

import ProfileSkeleton from "@/components/loading/ProfileSkeleton";
import SubPageLayout from "../layout/SubPageLayout";
import Link from "next/link";

import ProfileInfoRenderer from "./ProfileInfoRenderer";
import ProfileCollectionsRenderer from "./ProfileCollectionsRenderer";
import ProfileScrapsRenderer from "./ProfileScrapsRenderer";
import { useRouter } from "next/navigation";

import { ProfileOthers } from "@/types/Profile";
import fetchGetProfileInfo from "@/utils/fetchGetProfileInfo";
import checkIsMyId from "@/utils/checkIsMyId";

export default function ProfilePage({ userId }: { userId: number }) {
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);

  /* fetch data */
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<{
    profileInfo: ProfileOthers | null;
    errorMessage: string;
  }>({
    profileInfo: null,
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchGetProfileInfo(userId);
      setProfile(result);
      setIsLoading(false);
      checkIsMyId(userId) && setIsMyProfile(true);
    };
    if (!isLoading) fetchData();
  }, [userId]);

  /* button state */
  const [showState, setShowState] = useState(1);

  const onChangeShowState = (state: number) => {
    if (state == showState) {
      setShowState(1);
    } else {
      setShowState(state);
    }
  };

  /* 수정 버튼 클릭 */
  const hanldeClickCompleteButton = () => {
    router.push("/profile/setting/edit");
  };

  return (
    <SubPageLayout
      topperMsg="프로필"
      completeButtonMsg={isMyProfile ? "수정" : undefined}
      onClickCompleteButton={hanldeClickCompleteButton}
    >
      <>
        <ProfileInfoRenderer
          userId={userId}
          profileInfo={profile.profileInfo}
          errorMessage={profile.errorMessage}
          isMyProfile={isMyProfile}
        />
        <section className={styles.buttonContainer}>
          <button
            className={`${styles.buttons} ${showState == 1 ? styles.clickedButtons : ""}`}
            onClick={() => onChangeShowState(1)}
          >
            {isMyProfile || !profile.profileInfo
              ? `내 컬렉션`
              : `${profile.profileInfo.nickname}의 컬렉션`}
          </button>
          <button
            className={`${styles.buttons} ${showState == 2 ? styles.clickedButtons : ""}`}
            onClick={() => onChangeShowState(2)}
          >
            스크랩한 컬렉션
          </button>
          {/* <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          팔로우한 컬렉션
        </button> */}
          {isMyProfile && (
            <button
              className={`${styles.buttons} ${showState == 4 ? styles.clickedButtons : ""}`}
              onClick={() => onChangeShowState(4)}
            >
              찜 목록 보기
            </button>
          )}
          {isMyProfile && (
            <Link className={styles.buttons} href={"/collection/edit"}>
              + 컬렉션 추가
            </Link>
          )}
        </section>
        {showState === 1 && (
          <ProfileCollectionsRenderer
            userId={userId}
            isMyProfile={isMyProfile}
          />
        )}
        {showState === 2 && (
          <ProfileScrapsRenderer userId={userId} isMyProfile={isMyProfile} />
        )}
        {/* {showState === 3 && (
        <ProfileCollectionRenderer collectionList={followCollections} />
      )} */}
        {showState === 4 && <ProfileStarsRenderer userId={userId} />}
      </>
    </SubPageLayout>
  );
}

const Loading = () => {
  return <div>🌀🌀🌀loading...🌀🌀🌀</div>;
};
