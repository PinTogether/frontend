"use client";

import EditPageLayout, {
  H3Wrapper,
  SectionWrapper,
  Line,
} from "../layout/EditPageLayout";
import { AddRoundIcon, EditIcon, SearchIcon } from "@/components/IconSvg";
import { LocationCard } from "@/components/PinCard";
import CardSlider2 from "@/components/CardSlider2";

import CollectionCard from "@/components/CollectionCard";
import IPin from "@/types/IPin";
import ICollection from "@/types/ICollection";
import styles from "@/styles/containers/pin/_pinEditPage.module.scss";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const pinData: IPin = {
  id: 1,
  serviceId: "string",
  localCode: 1,
  localManageCode: "string",
  statusNumber: 1,
  status: "string",
  phone: "string",
  zipCode: "string",
  roadNumberAddress: "string",
  roadNameAddress: "도로명 주소",
  roadZipCode: "string",
  placeName: "강릉 옹심이 막국수",
  category: "음식점",
  x: 1,
  y: 1,
  comment: "string",
};

const collectionData: ICollection = {
  id: 1,
  title: "강릉_주민_맛집",
  ownerId: 1,
  ownerNickname: "개포동_맛조개",
  thumbnail: "/images/cat_dummy.jpeg",
  detail: "string",
  likeCnt: 24,
  pinCnt: 3,
};

const dummyCollectionList: ICollection[] = [
  {
    id: 1,
    title: "강릉_주민_맛집",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
  {
    id: 2,
    title: "강릉_여행자_맛집",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
  {
    id: 3,
    title: "여행가자",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },

  {
    id: 4,
    title: "야호 콜렉션",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,

    pinCnt: 3,
  },
  {
    id: 5,
    title: "강릉_주민_맛집",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
  {
    id: 6,
    title: "강릉_여행자_맛집",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
  {
    id: 7,
    title: "여행가자",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
  {
    id: 8,
    title: "야호 콜렉션",
    ownerId: 1,
    ownerNickname: "개포동_맛조개",
    thumbnail: "/images/cat_dummy.jpeg",
    detail: "string",
    likeCnt: 24,
    pinCnt: 3,
  },
];

export default function PinEditPage({ pinId }: { pinId?: string }) {
  const [collectionList, setCollectionList] = useState<ICollection[]>([]);
  const [searchedCollectionList, setSearchedCollectionList] = useState<
    ICollection[]
  >([]);

  const collectionSearchInputRef = useRef<HTMLInputElement>(null);
  const pinReviewTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCollectionList([...dummyCollectionList]);
    setSearchedCollectionList([...dummyCollectionList]);
  }, []);

  const handleSubmitCollectionSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!collectionSearchInputRef.current?.value) return;
    console.log(collectionSearchInputRef.current?.value);
    const regex = new RegExp(collectionSearchInputRef.current?.value);
    setSearchedCollectionList(
      collectionList.filter((collection) => regex.test(collection.title))
    );
    e.currentTarget.reset();
  };

  return (
    <EditPageLayout>
      {/* Collection 선택 */}
      <SectionWrapper>
        <H3Wrapper>
          <SearchIcon />
          <span>핀을 추가할 컬렉션</span>
        </H3Wrapper>
        <form onSubmit={handleSubmitCollectionSearch}>
          <input
            className={styles.searchInput}
            // onChange={onChangeNickname}
            // value={inputNickname}
            placeholder="내 컬렉션 검색하기"
            ref={collectionSearchInputRef}
          />
          <button className={styles.searchButton}>검색</button>
          <button
            className={styles.searchButton}
            onClick={() => setSearchedCollectionList(collectionList)}
          >
            {" 전체 보기"}
          </button>
        </form>
        <CardSlider2>
          {[
            ...searchedCollectionList.map((collection) => (
              <CollectionCard
                key={collection.id}
                collectionData={collection}
                horizontal={true}
                linkDisabled={true}
              />
            )),
          ]}
        </CardSlider2>
      </SectionWrapper>
      <Line />
      {/* Pin */}
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          {`"강릉_주민_맛집"에 추가할 핀`}
        </H3Wrapper>
        <input
          className={styles.searchInput}
          placeholder="내 찜 컬렉션에서 검색하기"
          ref={collectionSearchInputRef}
        />
        <div className={styles.pinSection}>
          <LocationCard locationData={pinData} simple={true} />
          <textarea
            className={styles.reviewTextArea}
            placeholder="리뷰를 남겨주세요"
            rows={5}
            ref={pinReviewTextareaRef}
          />
          <ImageUploadBox />
        </div>
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <button className={styles.submitButton}>핀 추가하기</button>
      </SectionWrapper>
    </EditPageLayout>
  );
}

const ImageUploadBox = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    // const newFiles = Array.from(e.target.files);
    const newFiles = Array.from(e.target.files ?? []);

    setFiles([...newFiles, ...files]);
    const previews = [...newFiles, ...files].map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
  };

  return (
    <div className={styles.imageUploadBox}>
      <input
        type="file"
        id="img-upload"
        className={styles.inputFile}
        onChange={handleImageChange}
        multiple
      />

      <div className={styles.imgBox}>
        <label htmlFor="img-upload" className={styles.inputLabel}>
          <AddRoundIcon />
        </label>
        {imagePreviews &&
          imagePreviews.map((previewUrl, index) => (
            <Image
              key={index}
              src={previewUrl}
              alt="Image preview"
              // style={{ maxWidth: "100px", maxHeight: "100px", margin: "10px" }}
              width={10}
              height={10}
            />
          ))}
      </div>
      {files && <p>{files.length}개의 파일이 선택되었습니다.</p>}
    </div>
  );
};
