"use client";

import { useEffect, useState, useRef } from "react";
import EditPageLayout, {
  H3Wrapper,
  SectionWrapper,
  Line,
} from "../layout/EditPageLayout";
import styles from "@/styles/containers/pin/_pinEditPage.module.scss";
import { EditIcon, SearchIcon } from "@/components/IconSvg";
import CardSlider2 from "@/components/CardSlider2";
import CollectionCard from "@/components/CollectionCard";
import PinBox from "@/containers/pin/PinBox";
import IPin from "@/types/IPin";
import ICollection from "@/types/ICollection";
import { LocationCard } from "@/components/PinCard";

interface Place {
  id: number;
  address: string;
  name: string;
  category: string;
  created_at: string;
}

export interface NewPinData extends Place {
  review?: string;
  files?: File[];
}

const myId = 1;

export default function PinEditPage({ pinId }: { pinId?: string }) {
  const [collectionList, setCollectionList] = useState<ICollection[]>([]);
  const [searchedCollectionList, setSearchedCollectionList] = useState<
    ICollection[]
  >([]); // selectedCollection
  const collectionSearchInputRef = useRef<HTMLInputElement>(null);
  const pinSearchInputRef = useRef<HTMLInputElement>(null);

  const [pinSearch, setPinSearch] = useState(Boolean);
  const [likedPinList, setLikedPinList] = useState<NewPinData[]>([]);
  const [searchedPinIdList, setSearchedPinIdList] = useState<number[]>([]);
  const [selectedPinIdList, setSelectedPinIdList] = useState<number[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(0);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${myId}/collections?offset=0&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        // setLikedPinList(data);
        setCollectionList(data);
        setSearchedCollectionList(data);
      })
      .catch((err) => {
        console.error(`ERR : /users/${myId}/scraps?offset=0&limit=100`, err);
        // 새로고침 버튼
      });

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks`)
      .then((res) => res.json())
      .then((data) => {
        setLikedPinList(data);
      })
      .catch((err) => {
        console.error("ERR : /bookmarks", err);
        // 새로고침 버튼
      });
    // TODO
    // collection에 이미 등록된 pin 은 어떻게 처리할 것인지
    // place pin 추가하기 했을 때 리스트에 어떻게 추가할 것인지
    // 가져오기 실패시 새로고침 버튼
    // CardSlider2에서 선택된 카드의 id를 가져오는 방법
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

  const handleClickPinSearch = () => {
    setPinSearch((prev) => !prev);
    setSearchedPinIdList(likedPinList.map((pinData) => pinData.id));
  };

  const handleSubmitPinSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pinSearchInputRef.current) return;
    const searchValue = pinSearchInputRef.current?.value;
    if (!searchValue) {
      setSearchedPinIdList(likedPinList.map((pinData) => pinData.id));
      return;
    }
    const regex = new RegExp(searchValue);
    setSearchedPinIdList(
      likedPinList
        .filter((pinData) => regex.test(pinData.name))
        .map((pinData) => pinData.id)
    );
  };

  const editPinData = (newPinData: NewPinData) => {
    setLikedPinList((list) => {
      const newList = list.map((pinData) => {
        if (pinData.id === newPinData.id) return newPinData;
        return pinData;
      });
      return newList;
    });
  };

  const handleDeletePin = (pinId: number) => {
    setSelectedPinIdList((list) => list.filter((id) => id !== pinId));
  };

  // const setSelectedCardId = (cardId: number) => {
  //   setSelectedCollectionId(cardId);
  // };

  return (
    <EditPageLayout>
      {/* Collection 선택 */}
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          <span>핀을 추가할 컬렉션</span>
        </H3Wrapper>
        <form
          onSubmit={handleSubmitCollectionSearch}
          className={styles.searchBox}
        >
          <input
            className={styles.searchInput}
            placeholder="내 컬렉션 검색하기"
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
        <CardSlider2
          selectedCardId={selectedCollectionId}
          // setSelectedCardId={setSelectedCollectionId}
        >
          {[
            ...searchedCollectionList.map((collection) => (
              <CollectionCard
                data-cardId={collection.id}
                key={collection.id}
                collectionData={collection}
                horizontal={true}
                linkDisabled={true}
                onClick={() => setSelectedCollectionId(collection.id)}
              />
            )),
          ]}
        </CardSlider2>
      </SectionWrapper>
      <Line />

      {/* Pin 추가 */}
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          {`"${collectionList.find((collection) => collection.id === selectedCollectionId)?.title}"에 추가할 핀`}
        </H3Wrapper>
        <form onSubmit={handleSubmitPinSearch} className={styles.searchBox}>
          <input
            className={styles.searchInput}
            placeholder="내 찜에서 핀 찾기"
            ref={pinSearchInputRef}
            onClick={() => setPinSearch(true)}
          />
          <button type="submit" className={styles.searchButton}>
            <SearchIcon />
          </button>
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleClickPinSearch}
          >
            {!pinSearch ? "내 찜 검색" : "선택 완료"}
          </button>
        </form>
        {!pinSearch ? (
          <>
            {likedPinList
              .filter((pinData) => selectedPinIdList.includes(pinData.id))
              .map((pinData) => (
                <PinBox
                  key={pinData.id}
                  pinData={pinData}
                  editPinData={editPinData}
                  handleDeletePin={() => handleDeletePin(pinData.id)}
                />
              ))}
          </>
        ) : (
          <>
            {likedPinList
              .filter((pinData) => searchedPinIdList.includes(pinData.id))
              .map((pinData) => (
                <div
                  key={pinData.id}
                  className={
                    selectedPinIdList.includes(pinData.id)
                      ? styles.selectedPin
                      : styles.unSelectedPin
                  }
                  onClick={() => {
                    setSelectedPinIdList((list) => {
                      if (list.includes(pinData.id))
                        return list.filter((id) => id !== pinData.id);
                      return [...list, pinData.id];
                    });
                  }}
                >
                  <LocationCard
                    placeName={pinData.name}
                    category={pinData.category}
                    roadNameAddress={pinData.address}
                  />
                </div>
              ))}
          </>
        )}
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <button
          className={styles.submitButton}
        >{`${likedPinList.length}개의 핀 추가 하기`}</button>
      </SectionWrapper>
    </EditPageLayout>
  );
}
