"use client";

import styles from "@/styles/containers/place/_placePage.module.scss";
import { PinForPlace } from "@/types/Pin";
import { PlaceDetail } from "@/types/Place";
import ReviewCard from "@/components/ReviewCard";
import PlaceCard from "@/components/PlaceCard";

import dummyPinList from "@/../../public/dummy-data/dummy-pin.json";
import dummyPlaceList from "@/../../public/dummy-data/dummy-place.json";
import { useEffect, useState } from "react";

const pinData: PinForPlace[] = dummyPinList as PinForPlace[];
const placeData = (dummyPlaceList as PlaceDetail[])[0];

const PlacePage = ({ placeId }: { placeId?: string }) => {
  const [pinData, setPinData] = useState<PinForPlace[]>([]);
  const [placeData, setPlaceData] = useState<PlaceDetail>();

  useEffect(() => {
    const offset = 0;
    const limit = 150;

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}/pins?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPinData(data);
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaceData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {/* {placeId} */}
      <div className={styles.pinCard}>
        {placeData && <PlaceCard place={placeData} />}
      </div>
      <ul className={styles.commentList}>
        {pinData.map((pin) => (
          <li key={pin.id}>
            <ReviewCard reviewData={pin} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlacePage;
