"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useRouter } from "next/navigation";
import { BookMarkIcon, SettingIcon } from "@/components/IconSvg";
import { useState } from "react";
import { ProfileMine } from "@/types/Profile";
import { CollectionDetail } from "@/types/Collection";
import { PlaceStarred } from "@/types/Place";
import ProfileCollectionRenderer from "./ProfileCollectionRenderer";
import ProfileBookmarkRenderer from "./ProfileBookmarkRenderer";

import profileDatas from "@/../../public/dummy-data/dummy-profile.json";
import placeDatas from "@/../../public/dummy-data/dummy-place.json";
import collectionDatas from "@/../../public/dummy-data/dummy-collection.json";
import SubPageLayout from "../layout/SubPageLayout";
import Image from "next/image";

const profiles = profileDatas[0];
const bookmarksList: PlaceStarred[] = placeDatas;
const scrappedCollections: CollectionDetail[] = collectionDatas;
const followCollections = scrappedCollections;
const myCollections = scrappedCollections;

export default function ProfilePage({ id }: { id: number }) {
  const router = useRouter();
  const [showState, setShowState] = useState(1);
  function onChangeShowState(state: number) {
    if (state == showState) {
      setShowState(1);
    } else {
      setShowState(state);
    }
  }
  return (
    <SubPageLayout topperMsg="프로필" completeButtonMsg="수정">
      <section id={styles.profileDataContainer}>
        <div className={styles.profileData}>
          <Image
            src={profiles.avatar}
            alt="profile img"
            className={styles.profileImage}
            width={100}
            height={100}
          />
          <div className={styles.profileName}>
            <div></div>
            <p>{profiles.nickname}</p>
            {id == profiles.id && (
              <button onClick={() => router.push("/profile/setting")}>
                <SettingIcon className={styles.icon} />
              </button>
            )}
          </div>
          <div className={styles.profileLog}>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{profiles.collectionCnt}</b>
              <p className={styles.text}>컬렉션</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>
                {profiles.followerCnt}
                {/* <BookMarkIcon /> */}
              </b>
              <p className={styles.text}>스크랩</p>
            </div>
            <div className={styles.profileLogBox}>
              <b className={styles.number}>{profiles.scrappedCollectionCnt}</b>
              <p className={styles.text}>팔로워</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.buttonContainer}>
        <button
          className={`${styles.buttons} ${showState == 1 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(1)}
        >
          내 컬렉션
        </button>
        <button
          className={`${styles.buttons} ${showState == 2 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(2)}
        >
          스크랩한 컬렉션
        </button>
        <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          팔로우한 컬렉션
        </button>
        {id == profiles.id && (
          <button
            className={`${styles.buttons} ${showState == 4 ? styles.clickedButtons : ""}`}
            onClick={() => onChangeShowState(4)}
          >
            찜 목록 보기
          </button>
        )}
        {id == profiles.id && (
          <button
            className={styles.buttons}
            onClick={() => router.push("/collection/edit")}
          >
            + 컬렉션 추가
          </button>
        )}
      </section>
      {showState === 1 && (
        <ProfileCollectionRenderer collectionList={myCollections} />
      )}
      {showState === 2 && (
        <ProfileCollectionRenderer collectionList={followCollections} />
      )}
      {showState === 3 && (
        <ProfileCollectionRenderer collectionList={scrappedCollections} />
      )}
      {showState === 4 && <ProfileBookmarkRenderer bookmarks={bookmarksList} />}
    </SubPageLayout>
  );
}
