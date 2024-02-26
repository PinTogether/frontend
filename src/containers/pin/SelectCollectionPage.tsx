"use client";

import { UserBoxIcon, EditIcon, SearchIcon } from "@/components/IconSvg";
import EditPageLayout, {
  SectionWrapper,
  H3Wrapper,
  Line,
} from "../layout/EditPageLayout";
import styles from "@/styles/containers/pin/_pinEditPage.module.scss"; // x
import { useEffect, useRef, useState } from "react";

import Collection from "@/types/Collection";
import CollectionCard, {
  HorizontalSimpleCollectionCard,
} from "@/components/CollectionCard";

const myId = 1;
const offset = 0;
const limit = 100;

const SelectCollectionPage = () => {
  // 내 컬렉션 받아오기
  const collectionSearchInputRef = useRef<HTMLInputElement>(null);
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  const [searchedCollectionList, setSearchedCollectionList] = useState<
    Collection[]
  >([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${myId}/collections?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setCollectionList(data);
        setSearchedCollectionList(data);
      })
      .catch((err) => {
        console.error(`ERR : /users/${myId}/scraps?offset=0&limit=100`, err);
      });
  }, []);

  const handleSubmitCollectionSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!collectionSearchInputRef.current) return;
    const searchValue = collectionSearchInputRef.current?.value;
    const regex = new RegExp(searchValue);
    setSearchedCollectionList(
      collectionList.filter((collection) => regex.test(collection.title))
    );
  };

  const handleClickShowAllCollection = () => {
    setSearchedCollectionList(collectionList);
    if (collectionSearchInputRef.current)
      collectionSearchInputRef.current.value = "";
  };

  return (
    <EditPageLayout>
      <SectionWrapper>
        {/* <H3Wrapper>
          <EditIcon />
          <span>"AA" 컬렉션 선택</span>
        </H3Wrapper> */}
        <form
          onSubmit={handleSubmitCollectionSearch}
          className={styles.searchBox}
        >
          <input
            className={styles.searchInput}
            placeholder="핀을 추가할 컬렉션을 선택해주세요"
            ref={collectionSearchInputRef}
          />
          <button type="submit" className={styles.searchButton}>
            <SearchIcon />
          </button>
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleClickShowAllCollection}
          >
            {"전체 보기"}
          </button>
        </form>
        {/* <CardSlider2
          selectedCardId={selectedCollectionId}
          // setSelectedCardId={setSelectedCollectionId}
        >
          {[
            ...searchedCollectionList.map((collection) => (
              // <CollectionCard
              //   data-cardId={collection.id}
              //   key={collection.id}
              //   collectionData={collection}
              //   horizontal={true}
              //   linkDisabled={true}
              //   onClick={() => setSelectedCollectionId(collection.id)}
              // />
              <></>
            )),
          ]}
        </CardSlider2> */}
        {[
          ...searchedCollectionList.map((collection) => (
            // <CollectionCard
            //   data-cardId={collection.id}
            //   key={collection.id}
            //   collectionData={collection}
            //   horizontal={true}
            //   linkDisabled={true}
            //   onClick={() => setSelectedCollectionId(collection.id)}
            // />
            // <CollectionCard
            // 	data-cardId={collection.id}
            // 	key={collection.id}
            // 	collectionData={collection}
            // 	/>
            <HorizontalSimpleCollectionCard
              key={1}
              collectionData={collection}
            />
          )),
        ]}
      </SectionWrapper>
    </EditPageLayout>
  );
};

export default SelectCollectionPage;
