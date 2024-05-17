"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectDraftCollectionEdit,
  setDraftCollectionEdit,
  clearDraftCollectionEdit,
} from "@/redux/draftCollectionEditSlice";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import { CollectionDetail } from "@/types/Collection";
import EditPageLayout, { Section } from "@/containers/layout/EditPageLayout";
import SubPageLayout from "@/containers/layout/SubPageLayout";

import fetchPostCollection from "@/utils/collections/fetchPostCollection";
import fetchPostCollectionPresignedUrl from "@/utils/collections/fetchPostCollectionPresignedUrl";
import fetchPutCollection from "@/utils/collections/fetchPutCollection";
import fetchPutS3PresignedUrl from "@/utils/s3/fetchPutS3PresingedUrl";
import fetchGetCollectionInfo from "@/utils/collections/fetchGetCollectionInfo";
import fetchDeleteCollection from "@/utils/collections/fetchDeleteCollection";

import PinListRenderer from "./PinListRenderer";
import EditInputs from "./CollectionEditInputs";

export default function CollectionEditPage({ collectionId, topperMsg }: { collectionId?: number; topperMsg: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isUploading, setIsUploading] = useState(false);

  /* 컬렉션 변경전 정보 */
  const [collectionInfo, setCollectionInfo] = useState<CollectionDetail | undefined>(undefined);
  /* 컬렉션 수정중인 정보 */
  const { id, title, details, tagList, imgFile, imgSrc } = useAppSelector(selectDraftCollectionEdit) || {};

  /* 컬렉션 삭제 */
  const handleDeleteBtnClick = async () => {
    if (isUploading || !collectionId || !collectionInfo) return;
    if (!confirm(`"${collectionInfo.title}" 컬렉션을 삭제하시겠습니까?`)) return;
    setIsUploading(true);
    try {
      const { success, errorMessage } = await fetchDeleteCollection(collectionId);
      if (!success) dispatch(addAlertMessage(errorMessage));
      else router.replace(`/profile/${collectionInfo?.writerMembername}`);
    } catch {
      // error message
    } finally {
      setIsUploading(false);
    }
  };

  // useEffect(() => {
  //   if (!collectionId) return;
  //   const fetchData = async () => {
  //     setIsUploading(true);
  //     const { collectionInfo, errorMessage } = await fetchGetCollectionInfo(collectionId);
  //     if (!collectionInfo || errorMessage) {
  //       dispatch(addAlertMessage(errorMessage));
  //       return;
  //     } else setCollectionInfo(collectionInfo);
  //     setIsUploading(false);
  //   };
  //   fetchData();
  // }, [collectionId]);

  /* 초기화 */
  useEffect(() => {
    if (!collectionId) return;
    const fetchData = async () => {
      if (id !== collectionId) {
        setIsUploading(true);
        clearDraft();
        await getAndSetCollectionInfo(collectionId);
        setIsUploading(false);
      }
    };
    fetchData();
  }, [collectionId]);

  const clearDraft = async () => {
    dispatch(clearDraftCollectionEdit());
  };

  const getAndSetCollectionInfo = async (collectionId: number) => {
    setIsUploading(true);
    const { collectionInfo, errorMessage } = await fetchGetCollectionInfo(collectionId);
    if (!collectionInfo || errorMessage) {
      dispatch(addAlertMessage(errorMessage));
      setIsUploading(false);
      return;
    }
    setCollectionInfo(collectionInfo);
    dispatch(
      setDraftCollectionEdit({
        id: collectionInfo.id,
        title: collectionInfo.title,
        details: collectionInfo.details,
        tagList: collectionInfo.tags,
        imgFile: null,
        imgSrc: collectionInfo.thumbnail,
      }),
    );
    setIsUploading(false);
  };

  const submitForm = async () => {
    if (isUploading) dispatch(addAlertMessage("업로드 중입니다. 잠시만 기다려주세요."));
    else if (title === "") dispatch(addAlertMessage("컬렉션 제목을 입력해주세요."));
    else {
      setIsUploading(true);
      if (!collectionId) await createCollection();
      else await editCollection(collectionId);
      setIsUploading(false);
    }
  };

  const createCollection = async () => {
    try {
      if (!imgFile) {
        const newCollectionId = await postCollection();
        router.replace(`/collection/${newCollectionId}`);
      } else {
        const { presignedUrlData, newCollectionId } = await postCollectionAndGetPresignedUrl();
        await putImageToS3(presignedUrlData.presignedUrl, imgFile);
        await putCollection(newCollectionId, presignedUrlData.imageUrl);
        router.replace(`/collection/${newCollectionId}`);
      }
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(addAlertMessage(e.message));
      else console.error("Unknown error", e);
    }
  };

  const editCollection = async (collectionId: number) => {
    try {
      if (!imgFile) {
        await putCollection(collectionId, imgSrc || "");
      } else {
        const { presignedUrl, imageUrl } = await issuePresignedUrl(collectionId, imgFile);
        await putImageToS3(presignedUrl, imgFile);
        // dispatch(updateImgSrc(imageUrl));
        await putCollection(collectionId, imageUrl);
      }
      clearDraft();
      router.replace(`/collection/${collectionId}`);
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(addAlertMessage(e.message));
      else console.error("Unknown error", e);
    }
  };

  const postCollectionAndGetPresignedUrl = async () => {
    const { presignedUrlData, newCollectionId, errorMessage } = await fetchPostCollection(
      title || "",
      details || "",
      tagList || [],
      imgFile?.type || null,
    );
    if (errorMessage || !presignedUrlData || !newCollectionId) {
      throw Error(errorMessage);
    }
    return { presignedUrlData, newCollectionId };
  };

  const postCollection = async () => {
    if (!title) return;
    const { newCollectionId, errorMessage } = await fetchPostCollection(title, details || "", tagList || [], null);
    if (errorMessage || !newCollectionId) {
      throw Error(errorMessage);
    }
    return newCollectionId;
  };

  const putImageToS3 = async (presignedUrl: string, imgFile: File) => {
    const { success, errorMessage } = await fetchPutS3PresignedUrl(presignedUrl, imgFile);
    if (!success) {
      throw Error(errorMessage);
    }
  };

  const putCollection = async (newCollectionId: number, thumbnailUrl: string) => {
    const { success, errorMessage } = await fetchPutCollection(
      newCollectionId,
      title || "", // TODO : is it right ? is't it better check in advance ?
      thumbnailUrl,
      details || "",
      tagList || [],
    );
    if (!success) {
      throw Error(errorMessage);
    }
  };

  const issuePresignedUrl = async (collectionId: number, image: File) => {
    const { presignedUrlData, errorMessage } = await fetchPostCollectionPresignedUrl(collectionId, image.type);
    if (errorMessage || !presignedUrlData) {
      throw Error(errorMessage);
    } else return presignedUrlData;
  };

  return (
    <SubPageLayout
      topperMsg={topperMsg}
      completeButtonMsg={collectionId ? "수정" : "생성"}
      deleteButtonMsg={collectionId ? "삭제" : undefined}
      onClickCompleteButton={submitForm}
      onClickDeleteButton={collectionId ? handleDeleteBtnClick : undefined}
    >
      <EditPageLayout>
        <EditInputs collectionInfo={collectionInfo} isUploading={isUploading} />
        {collectionId && <PinListRenderer collectionId={collectionId} />}
        <Section className={styles.buttonContainer}>
          {collectionId ? (
            <>
              <button className={styles.confirmButton} disabled={isUploading} onClick={submitForm}>
                컬렉션 수정
              </button>
              <button className={styles.confirmButton} disabled={isUploading} onClick={handleDeleteBtnClick}>
                컬렉션 삭제
              </button>
            </>
          ) : (
            <button className={styles.confirmButton} disabled={isUploading} onClick={submitForm}>
              컬렉션 생성
            </button>
          )}
        </Section>
      </EditPageLayout>
    </SubPageLayout>
  );
}
