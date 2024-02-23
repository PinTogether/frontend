"use client";

import Image from "next/image";
import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import Topper from "@/components/SubTopper";
import { useState, useEffect } from "react";
import { ImgLoadIcon, EditIcon } from "@/components/IconSvg";
import Collection from "@/types/Collection";

export default function CollectionEditPage({id}:{id?:number}) {
  const size = 300;
  const [inputCollectionName, setInputCollectionName] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/id/326/300");
  const [TagList, setTagList] = useState<string[]>([]);

  const deleteTag = (tag: string) => {
    const index = TagList.indexOf(tag);
    const newList = [...TagList];
    newList.splice(index, 1);
    setTagList(newList);
  };

  const TagListRenderer = () => {
    return (
      <section className={styles.tagBoxContainer}>
        {TagList.map((tag, index) => (
          <button
            key={index}
            className={styles.tagBox}
            onClick={() => deleteTag(tag)}
          >
            {tag}
          </button>
        ))}
      </section>
    );
  };

  const setTag = () => {
    if (TagList.includes(inputTag) === false && TagList.length <= 4) {
      const newList = [...TagList];
      newList.push(inputTag);
      setTagList(newList);
      setInputTag("");
    } else if (TagList.includes(inputTag) === true) {
      const index = TagList.indexOf(inputTag);
      const newList = [...TagList];
      newList.splice(index, 1);
      setTagList(newList);
      setInputTag("");
    }
  };

  const onChangeNickname = (e: any) => {
    setInputCollectionName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setInputDescription(e.target.value);
  };

  const onChangeTag = (e: any) => {
    const checkString = e.target.value;
    if (checkString[checkString.length - 1] != " ") {
      setInputTag(checkString);
    } else {
      setInputTag(checkString.substring(0, checkString.length - 1));
    }
  };

  const enterAtTag = (e: any) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setTag();
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };

  const resetImgSrc = () => {
    setImgSrc("https://picsum.photos/id/326/300");
  };

  return (
    <section className={styles.container}>
      {id && <Topper msg={"컬렉션 수정"} />}
      {!id && <Topper msg={"컬렉션 생성"} />}
      <p className={styles.message}>
        <ImgLoadIcon style={{ width: "23px", height: "23px" }} />
        프로필 사진 변경
      </p>
      <section className={styles.collectionChangeContainer}>
        <div></div>
        <div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <label htmlFor="file">
            <Image
              src={imgSrc}
              alt="profile image"
              className={styles.mainImage}
              width={size}
              height={size}
            />
          </label>
        </div>
        <div className={styles.cancelButtonBox}>
          <button className={styles.cancelButton} onClick={resetImgSrc}>
            X
          </button>
        </div>
      </section>
      <p className={styles.message}>
        <EditIcon style={{ width: "23px", height: "23px" }} />
        제목 수정
      </p>
      <section className={styles.changeContainer}>
        <input
          className={styles.nameInput}
          onChange={onChangeNickname}
          value={inputCollectionName}
          maxLength={100}
          placeholder="강릉 주민 맛집"
        />
        <p className={styles.lengthCounter}>{inputCollectionName.length}/100</p>
      </section>
      <p className={styles.message}>
        <EditIcon style={{ width: "23px", height: "23px" }} />
        태그 추가
      </p>
      <section className={styles.tagContainer}>
        <TagListRenderer />
        <div className={styles.tagInputContainer}>
          <input
            className={styles.tagInput}
            onChange={onChangeTag}
            onKeyDown={enterAtTag}
            value={inputTag}
            maxLength={10}
            placeholder="태그를 입력하세요: 맛집, 휴식, 데이트 ..."
          />
        </div>
        <p className={styles.lengthCounter}>{inputTag.length}/10</p>
      </section>
      <p className={styles.message}>
        <EditIcon style={{ width: "23px", height: "23px" }} />
        설명 수정
      </p>
      <section className={styles.inputContainer}>
        <textarea
          className={styles.descriptionInput}
          onChange={onChangeDescription}
          value={inputDescription}
          maxLength={250}
          placeholder=""
        />
        <p className={styles.lengthCounter}>{inputDescription.length}/250</p>
      </section>
      <section className={styles.buttonContainer}>
      {id && <button className={styles.confirmButton}>수정 완료</button>}
      {!id && <button className={styles.confirmButton}>생성 완료</button>}
      </section>
    </section>
  );
}
