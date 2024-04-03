"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useState, useEffect } from "react";
import ProfileStarredRenderer from "./ProfileStarredRenderer";

import ProfileCollectionSkeleton from "./ProfileCollectionSkeleton";
import SubPageLayout from "../layout/SubPageLayout";
import Link from "next/link";

import ProfileInfoRenderer from "./ProfileInfoRenderer";
import ProfileCollectionsRenderer from "./ProfileCollectionsRenderer";
import ProfileScrapsRenderer from "./ProfileScrapsRenderer";
import { useRouter } from "next/navigation";

import { ProfileOthers } from "@/types/Profile";
import fetchGetProfileInfo from "@/utils/members/fetchGetProfileInfo";
import fetchGetProfileInfoByMembername from "@/utils/members/fetchGetProfileInfoByMembername"; ///
import useCheckIsMyId from "@/hooks/useCheckIsMyId";
import useCheckIsMyMembername from "@/hooks/useCheckIsMyMembername";

export default function ProfilePage({ membername }: { membername: string }) {
  const router = useRouter();
  const isMyProfile = useCheckIsMyMembername(membername);

  /* fetch data */
  const [isLoading, setIsLoading] = useState(false);
  const [profileFetchData, setProfileFetchData] = useState<{
    profileInfo: ProfileOthers | null;
    errorMessage: string;
  } | null>(null);
  const fetchProfileFetchData = async () => {
    setIsLoading(true);
    const result = await fetchGetProfileInfoByMembername(membername);
    setProfileFetchData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) fetchProfileFetchData();
  }, [membername]);

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
      {!profileFetchData?.profileInfo ? (
        <ProfileCollectionSkeleton />
      ) : profileFetchData.errorMessage ? (
        <div className={styles.errorMessage}>
          {profileFetchData.errorMessage}
        </div>
      ) : (
        <>
          <ProfileInfoRenderer
            userId={profileFetchData.profileInfo.id}
            profileInfo={profileFetchData.profileInfo}
            errorMessage={profileFetchData.errorMessage}
            isMyProfile={isMyProfile}
          />
          <section className={styles.buttonContainer}>
            <button
              className={`${styles.buttons} ${showState == 1 ? styles.clickedButtons : ""}`}
              onClick={() => onChangeShowState(1)}
            >
              {isMyProfile || !profileFetchData.profileInfo
                ? `내 컬렉션`
                : `${profileFetchData.profileInfo.name}의 컬렉션`}
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
          {/* TODO : 버튼 클릭시 마다 재랜더링이 되지 않도록(fetch 여러번) dispaly : none 으로 화면 제어하기*/}
          {showState === 1 && (
            <ProfileCollectionsRenderer
              userId={profileFetchData.profileInfo.id}
              isMyProfile={isMyProfile}
            />
          )}
          {showState === 2 && (
            <ProfileScrapsRenderer
              userId={profileFetchData.profileInfo.id}
              isMyProfile={isMyProfile}
            />
          )}
          {/* {showState === 3 && (
        <ProfileCollectionRenderer collectionList={followCollections} />
      )} */}
          {showState === 4 && isMyProfile && (
            <ProfileStarredRenderer userId={profileFetchData.profileInfo.id} />
          )}
        </>
      )}
    </SubPageLayout>
  );
}
