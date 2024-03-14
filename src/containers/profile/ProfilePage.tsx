"use client";
import styles from "@/styles/containers/profile/_profilePage.module.scss";
import { useState } from "react";
import { CollectionDetail } from "@/types/Collection";
import { PlaceStarred } from "@/types/Place";
import ProfileCollectionRenderer from "./ProfileCollectionRenderer";
import ProfileBookmarkRenderer from "./ProfileBookmarkRenderer";

import profileDatas from "@/../../public/dummy-data/dummy-profile.json";
import placeDatas from "@/../../public/dummy-data/dummy-place.json";
import collectionDatas from "@/../../public/dummy-data/dummy-collection.json";
import SubPageLayout from "../layout/SubPageLayout";
import Link from "next/link";

import ProfileInfoRenderer from "./ProfileInfoRenderer";

const profiles = profileDatas[0];
const bookmarksList: PlaceStarred[] = placeDatas;
const scrappedCollections: CollectionDetail[] = collectionDatas;
const followCollections = scrappedCollections;
const myCollections = scrappedCollections;

export default function ProfilePage({ id }: { id: number }) {
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
      <ProfileInfoRenderer id={id} />
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
        {/* <button
          className={`${styles.buttons} ${showState == 3 ? styles.clickedButtons : ""}`}
          onClick={() => onChangeShowState(3)}
        >
          팔로우한 컬렉션
        </button> */}
        {id == profiles.id && (
          <button
            className={`${styles.buttons} ${showState == 4 ? styles.clickedButtons : ""}`}
            onClick={() => onChangeShowState(4)}
          >
            찜 목록 보기
          </button>
        )}
        {id == profiles.id && (
          <Link className={styles.buttons} href={"/collection/edit"}>
            + 컬렉션 추가
          </Link>
        )}
      </section>
      {showState === 1 && (
        <ProfileCollectionRenderer collectionList={myCollections} />
      )}
      {showState === 2 && (
        <ProfileCollectionRenderer collectionList={followCollections} />
      )}
      {/* {showState === 3 && (
        <ProfileCollectionRenderer collectionList={scrappedCollections} />
      )} */}
      {showState === 4 && <ProfileBookmarkRenderer bookmarks={bookmarksList} />}
    </SubPageLayout>
  );
}
