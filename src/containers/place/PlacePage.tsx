"use client";

import styles from "@/styles/containers/place/_placePage.module.scss";
import { PinForPlace } from "@/types/Pin";
import { PlaceDetail } from "@/types/Place";
import MarkerData from "@/types/Marker";
import ReviewCard from "@/components/ReviewCard";
import PlaceCard from "@/components/PlaceCard";

import { useEffect, useState, useRef } from "react";
import fetchGetPlacePins from "@/utils/fetchGetPlacePins";
import useIntersectionObserver from "@/hooks/useInteresectionObserver";
import fetchGetPlaceInfo from "@/utils/fetchGetPlaceInfo";
import { useAppDispatch } from "@/redux/hooks";
import { makeMarker } from "@/utils/makeMarker";

const PlacePage = ({ placeId }: { placeId: string }) => {
  /* fetch data */
  const size = 50;
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pinData, setPinData] = useState<PinForPlace[]>([]);
  const [placeData, setPlaceData] = useState<PlaceDetail | null>(null);
  const [placeErrorMessage, setPlaceErrorMessage] = useState<string>("");
  const [pinErrorMessage, setPinErrorMessage] = useState<string>("");
  const dispatchMarker = useAppDispatch();

  /* infinite scroll */
  const pageEndRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);
  const option = {
    root: null,
    rootMargin: "0px", // viewport 기준으로 얼마나 더 감지할 것인가
    threshold: 0.8, // 0.0 ~ 1.0, 1.0이면 완전히 보이는 상태
  };
  const isIntersecting = useIntersectionObserver(pageEndRef, option);

  useEffect(() => {
    const fetchData = async () => {
      if (!placeId) return;
      const { placeInfo, errorMessage } = await fetchGetPlaceInfo(
        Number(placeId)
      );
      if (placeErrorMessage || !placeInfo) {
        setPlaceErrorMessage(placeErrorMessage);
      } else setPlaceData(placeInfo);
    };
    if (placeId) fetchData();
  }, [placeId]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return;
      setIsLoading(true);
      const { placeInfo, errorMessage } = await fetchGetPlacePins(
        Number(placeId),
        page,
        size
      );
      if (placeErrorMessage || !placeInfo) {
        setPinErrorMessage(placeErrorMessage);
      } else {
        setPinData(placeInfo);
        setPage((prev) => prev + 1);
        if (placeInfo.length === 0) setIsEnd(true);
      }
      setIsLoading(false);
    };
    if (isIntersecting && !isEnd) fetchData();
  }, [placeId, isIntersecting]);

  useEffect(()=>{
    if (pinData[0]){
      makeMarker(pinData[0].id, pinData[0].placeName, pinData[0].saveCnt, pinData[0].longitude, pinData[0].latitude, dispatchMarker);
    }
  },[pinData])

  return (
    <>
      <div className={styles.pinCard}>
        {placeErrorMessage || !placeData ? (
          <span>{placeErrorMessage}</span>
        ) : (
          <PlaceCard place={placeData} />
        )}
      </div>
      <ul className={styles.commentList}>
        {pinErrorMessage ? (
          <span>{pinErrorMessage}</span>
        ) : (
          pinData.map((pin) => (
            <li key={pin.id}>
              <ReviewCard reviewData={pin} />
              {/* PinReviewCard */}
            </li>
          ))
        )}
        <br />
        {!isEnd && <div ref={pageEndRef} style={{ height: "5px" }}></div>}
      </ul>
    </>
  );
};

export default PlacePage;
