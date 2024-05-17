"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addAlertMessage } from "@/redux/globalAlertSlice";

import styles from "@/styles/containers/collection/_collectionEditPage.module.scss";
import Pin from "@/types/Pin";
import { EditIcon, CloseRoundIcon, PinIcon } from "@/components/IconSvg";
import { SectionTitle, Section, Line } from "@/containers/layout/EditPageLayout";
import { SimplePinCard } from "@/components/PinCard";

import fetchGetCollectionAllPins from "@/utils/collections/fetchGetCollectionAllPins";
import fetchDeletePin from "@/utils/pins/fetchDeletePin";

export default function PinListRenderer({ collectionId }: { collectionId: number }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  /* 핀 리스트 */
  const [pinDataList, setPinDataList] = useState<Pin[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getAndSetPinList();
  }, []);

  /* 핀 리스트 불러오기 (초기화) */
  const getAndSetPinList = async () => {
    setIsUploading(true);
    const { pinList, errorMessage } = await fetchGetCollectionAllPins(collectionId);
    if (!pinList || errorMessage) {
      dispatch(addAlertMessage(errorMessage));
      setIsUploading(false);
      return;
    }
    setPinDataList(pinList);
    setIsUploading(false);
  };

  const routeToPinEditPage = async (pin: Pin) => {
    router.push(`/pin/edit/${pin.id}?collectionEditId=${collectionId}`);
  };

  const deletePin = async (pinId: number) => {
    if (isUploading) return;
    setIsUploading(true);
    const { success, errorMessage } = await fetchDeletePin(pinId);
    if (!success) {
      dispatch(addAlertMessage(errorMessage));
    } else {
      const newPinDataList = pinDataList.filter(pin => {
        return pin.id !== pinId;
      });
      setPinDataList(newPinDataList);
    }
    setIsUploading(false);
  };

  return (
    <Section>
      <SectionTitle className={styles.titleContainer}>
        <PinIcon />
        <span>핀 리스트</span>
        {/* <Link
					href={`/pin/select?collectionId=${collectionId}`}
					className={styles.pinAddButton}
				>
					{"핀 추가하기 >"}
				</Link> */}
      </SectionTitle>
      <ul className={styles.pinCardContainer}>
        {pinDataList.map(pin => (
          <li key={pin.id} className={styles.pinCard}>
            <SimplePinCard pinData={pin} activeShowDetail={true} />
            <div onClick={() => routeToPinEditPage(pin)}>
              <EditIcon className={styles.editButton} />
            </div>
            <CloseRoundIcon className={styles.closeButton} onClick={() => deletePin(pin.id)} />
          </li>
        ))}
      </ul>
      <Line />
    </Section>
  );
}
