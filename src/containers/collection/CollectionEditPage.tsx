"use client";

import Image from "next/image";
import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import { useState, useRef } from "react";
import {
  ImgLoadIcon,
  EditIcon,
  CloseRoundIcon,
  PinIcon,
  ExpendUpIcon,
} from "@/components/IconSvg";
import EditPageLayout, {
  SectionTitle,
  Section,
  Line,
} from "@/containers/layout/EditPageLayout";
import SubPageLayout from "@/containers/layout/SubPageLayout";
import { InputComponent, TextareaComponent } from "@/components/InputComponent";
import { SimplePinCard } from "@/components/PinCard";
import TagEditor from "@/components/TagEditor";
import pinDataList from "@/../../public/dummy-data/dummy-pin.json";
import Link from "next/link";

export default function CollectionEditPage({
  id,
  topperMsg,
}: {
  id?: number;
  topperMsg: string;
}) {
  const size = 300;
  const [inputCollectionName, setInputCollectionName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/id/326/300");
  const [tagList, setTagList] = useState<string[]>([]);

  const onChangeNickname = (e: any) => {
    setInputCollectionName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setInputDescription(e.target.value);
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

  const [selectedPin, setSelectedPin] = useState<number[]>([]);
  const onClickPin = (index: number) => {
    if (selectedPin.includes(index)) {
      const newSelectedPin = selectedPin.filter((i) => i !== index);
      setSelectedPin(newSelectedPin);
    } else {
      const newSelectedPin = [...selectedPin, index];
      setSelectedPin(newSelectedPin);
    }
  };

  const pageRef = useRef<HTMLDivElement>(null);
  const scrollTop = () => {
    console.log(pageRef.current);
    pageRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <SubPageLayout topperMsg={topperMsg} ref={pageRef}>
      <EditPageLayout>
        <Section>
          <SectionTitle>
            <ImgLoadIcon />
            프로필 사진 변경
          </SectionTitle>
          <section className={styles.collectionChangeContainer}>
            <div className={styles.mainImage}>
              <InputComponent
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
                  width={size}
                  height={size}
                />
              </label>
            </div>
            <div className={styles.cancelButtonBox}>
              <button className={styles.cancelButton} onClick={resetImgSrc}>
                <CloseRoundIcon />
              </button>
            </div>
          </section>
        </Section>
        <Line />

        <Section>
          <SectionTitle>
            <EditIcon />
            <p>컬렉션 제목</p>
          </SectionTitle>
          <InputComponent
            onChange={onChangeNickname}
            value={inputCollectionName}
            maxLength={15}
            placeholder="제목을 입력해주세요"
          />
          <Line />
          <SectionTitle>
            <EditIcon />
            <p>컬렉션 태그</p>
          </SectionTitle>

          <TagEditor tagList={tagList} setTagList={setTagList} />

          <Line />
          <SectionTitle>
            <EditIcon />
            컬렉션 설명
          </SectionTitle>
          <TextareaComponent
            rows={6}
            onChange={onChangeDescription}
            value={inputDescription}
            maxLength={250}
            placeholder="컬렉션 설명을 입력해주세요"
          />
          <Line />
        </Section>
        <Section>
          <SectionTitle className={styles.titleContainer}>
            <PinIcon />
            <span>핀 리스트</span>
            <Link href={`/pin/select`} className={styles.pinAddButton}>
              {"핀 추가하기 >"}
            </Link>
          </SectionTitle>
          {/* List */}
          <ul
            className={styles.pinCardContainer}
            onClick={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            {pinDataList.map((pin, index) => (
              <SimplePinCard
                key={index}
                pinData={pin}
                onClick={() => onClickPin(index)}
                showEditButton={true}
                activeShowDetail={true}
              />
            ))}
          </ul>
        </Section>
        <Section className={styles.buttonContainer}>
          {id && <button className={styles.confirmButton}>수정 완료</button>}
          {!id && <button className={styles.confirmButton}>생성 완료</button>}
          <button
            className={styles.scrollTopButton}
            onClick={() => {
              scrollTop();
            }}
          >
            <ExpendUpIcon />
          </button>
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}
