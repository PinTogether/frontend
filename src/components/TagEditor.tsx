import React, { useState } from "react";
import styles from "@/styles/components/_tagEditor.module.scss";
import { InputComponent } from "@/components/InputComponent";

import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

const TagEditor = ({
  tagList,
  setTagList,
  disabled,
}: {
  tagList: string[];
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
}) => {
  const dispatch = useAppDispatch();
  const regex = /^[a-zA-Z가-힣0-9_-ㅏ-ㅣㄱ-ㅎ]+$/;
  const [inputTag, setInputTag] = useState("");

  const deleteTag = (tag: string) => {
    const index = tagList.indexOf(tag);
    const newList = [...tagList];
    newList.splice(index, 1);
    setTagList(newList);
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

  const setTag = () => {
    if (inputTag === "") return;
    if (!regex.test(inputTag)) {
      dispatch(
        addAlertMessage("한글, 숫자, 영어, 언더바만 태그로 등록이 가능합니다")
      );
      return;
    }
    if (tagList.includes(inputTag) === false && tagList.length <= 4) {
      const newList = [...tagList];
      newList.push(inputTag);
      setTagList(newList);
      setInputTag("");
    } else if (tagList.includes(inputTag) === true) {
      const index = tagList.indexOf(inputTag);
      const newList = [...tagList];
      newList.splice(index, 1);
      setTagList(newList);
      setInputTag("");
    } else {
      dispatch(addAlertMessage("태그는 최대 5개까지 등록이 가능합니다"));
    }
  };

  return (
    <>
      {tagList.length > 0 ? (
        <section className={styles.tagEditorContainer}>
          {tagList.map((tag, index) => (
            <button
              key={index}
              className={styles.tagEditor}
              onClick={() => deleteTag(tag)}
              disabled={disabled}
            >
              {tag}
            </button>
          ))}
        </section>
      ) : null}
      <InputComponent
        onChange={onChangeTag}
        onKeyDown={enterAtTag}
        value={inputTag}
        maxLength={30}
        placeholder="내용을 입력 후 엔터를 누르면 태그가 생성됩니다."
        disabled={disabled}
      />
    </>
  );
};
export default TagEditor;
