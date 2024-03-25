"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/containers/overlay/_overlay.module.scss";
import CardSlider from "@/components/CardSlider";
import CardSlider2 from "@/components/CardSlider2";
import MarkerData from "@/types/Marker";
import Pin from "@/types/Pin";
import { useState, useEffect } from "react";
import { locationGetterByAmount } from "@/redux/locationSlice";
import { SimpleCollectionCard } from "@/components/CollectionCard";

import collectionDummyData from "@/../../public/dummy-data/dummy-collection.json";
import pinDummyData from "@/../../public/dummy-data/dummy-pin.json";
import {
  ArrowDropDownIcon,
  ExpendDownIcon,
  ExpendUpIcon,
} from "@/components/IconSvg";

import { markerDataByAmount } from "@/redux/locationSlice";

import getMyProfileFromLocalStorage from "@/utils/getMyProfileFromLocalStorage";
import { ProfileMine } from "@/types/Profile";

interface markerDataByCollection {
  collectionId: number;
  pinDatas: Pin[];
}

export default function Overlay() {
  const dispatch = useAppDispatch();

  const [collectionSelector, setCollectionSelector] = useState(0);
  const [isCardSliderOn, setIsCardSliderOn] = useState(1);
  const [showCardSlider, setShowCardSlider] = useState(false);
  const sidoName = useAppSelector((state) => state.location.sido);
  const sggName = useAppSelector((state) => state.location.sgg);
  const emdongName = useAppSelector((state) => state.location.emdong);
  const outerMarkerdata = useAppSelector((state) => state.location.markerData);
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );
  const [selectedCardId, setSelectedCardId] = useState<number[]>([]);
  const [markerDatas, setMarkerDatas] = useState<markerDataByCollection[]>([]);
  const [myProfile, setMyProfile] = useState<ProfileMine | null>(null);
  const [markerList, setMarkerList] = useState<MarkerData[]>([]);

  function getLocation() {
    dispatch(locationGetterByAmount(true));
  }

  const toggleCardSlider = () => {
    setIsCardSliderOn((prevState) => {
      if (prevState === 1) return 0;
      return 1;
    });
    setShowCardSlider((prevState) => !prevState);
  };

  const handleClickedCard = (index: number) => {
    setSelectedCardId((prev) => {
      if (prev.includes(index)) {
        removeMarkerData(collectionDummyData[index].id); //마커리스트 데이터에서 해당하는 컬렉션 제거
        return prev.filter((id) => id !== index);
      }
      addMarkerData(collectionDummyData[index].id); //마커리스트 데이터에 해당하는 컬렉션 추가
      return [...prev, index];
    });
  };

  const handleClickBottomButton = (num: number) => {
    setCollectionSelector(num);
    setSelectedCardId([]);
  };

  const removeMarkerData = (id:number) => {
    const newMarkerData:markerDataByCollection[] = [];
    markerDatas.forEach((data)=>{
      if(data.collectionId != id){
        newMarkerData.push(data);
      }
    })
    setMarkerDatas(newMarkerData);
  }

  const addMarkerData = async(id:number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${id}/pins`)
    .then((res) => {
      if (!res.ok){
        throw new Error(`컬렉션 '${id}'의 정보 가져오기를 실패했습니다.`);
      }
      return(res.json());
    })
    .then((res) => {
      const newMarkerData:markerDataByCollection = {
        collectionId: id,
        pinDatas: res.results,
      }
      setMarkerDatas((prev)=>{
        return [...prev, newMarkerData];
      })
    })
    .catch((e) => {
      console.error(e);
    });
  }

  function makeMarkerList() {
    let markerLists: MarkerData[] = [];
    setMarkerList([]);
    //최종 마커 리스트를 생성하고 Map에 전달

    function checkList(id:number){
      for(let i = 0 ; i < markerLists.length ; i++){
        if(markerLists[i].id == id){
          return false;
        }
      }
      return true;
    }
    if(markerDatas[0]){
      markerDatas.forEach((collectionData) => {
        collectionData.pinDatas.forEach((pinData) => {
          if(checkList(pinData.id)){
            let newData: MarkerData = {
              id:pinData.id,
              placeName:pinData.placeName,
              pinCount:pinData.saveCnt,
              xPos:pinData.longitude,
              yPos:pinData.latitude,
            };
            markerLists.push(newData);
          }
        });
      });
      //setMarkerList(markerLists);
    }
    dispatch(markerDataByAmount(markerLists));
  }

  function OverlayCollectionSelector(){
    return(
      <>
      {myProfile ? (
        <div className={styles.bottom}>
          <div
            className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
          >
            <>
              {collectionSelector == 0 && (
                <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                  {collectionDummyData.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index)}
                    />
                  ))}
                </CardSlider2>
              )}
              {collectionSelector == 1 && (
                <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                  {collectionDummyData.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index)}
                    />
                  ))}
                </CardSlider2>
              )}
              {collectionSelector == 2 && (
                <CardSlider2 height={160} selectedCardIndexList={selectedCardId}>
                  {collectionDummyData.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index)}
                    />
                  ))}
                </CardSlider2>
              )}
            </>
          </div>
          <div className={styles.buttonBox}>
            <button
              className={`${styles.bottomButton} ${collectionSelector == 0 ? styles.clickedButtons : ""}`}
              onClick={() => handleClickBottomButton(0)}
            >
              내 컬렉션
            </button>
            <button
              className={`${styles.bottomButton} ${collectionSelector == 1 ? styles.clickedButtons : ""}`}
              onClick={() => handleClickBottomButton(1)}
            >
              스크랩한 컬렉션
            </button>
            <button
              className={`${styles.bottomButton} ${collectionSelector == 2 ? styles.clickedButtons : ""}`}
              onClick={() => handleClickBottomButton(2)}
            >
              팔로우한 컬렉션
            </button>
            <button className={styles.bottomButton} onClick={toggleCardSlider}>
              {showCardSlider ? (
                <>
                  {"컬렉션 보기"}
                  <ExpendUpIcon />
                </>
              ) : (
                <>
                  {"컬렉션 숨기기"}
                  <ExpendDownIcon />
                </>
              )}
            </button>
          </div>
        </div>
        ):(
          <div className={styles.bottom} style={{minWidth:"800px"}}>
          <div
            className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
          >
            <>
              {collectionSelector == 0 && (
                <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                  {collectionDummyData.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index)}
                    />
                  ))}
                </CardSlider2>
              )}
            </>
          </div>
          <div className={styles.buttonBox}>
            <div></div>
            <button
              className={`${styles.disabledBottomButton}`}
            >
              내 컬렉션
            </button>
            <button
              className={`${styles.disabledBottomButton}`}
            >
              스크랩한 컬렉션
            </button>
            <button
              className={`${styles.disabledBottomButton}`}
            >
              팔로우한 컬렉션
            </button>
            <div></div>
            <button className={styles.bottomButton} onClick={toggleCardSlider}>
              {showCardSlider ? (
                <>
                  {"컬렉션 보기"}
                  <ExpendUpIcon />
                </>
              ) : (
                <>
                  {"컬렉션 숨기기"}
                  <ExpendDownIcon />
                </>
              )}
            </button>
          </div>
        </div>
        )}
        </>
    );
  }

  useEffect(() => {
      makeMarkerList();
  }, [markerDatas]);

  // useEffect(() => {
  //   if(outerMarkerdata != markerList)
  //   setSelectedCardId([])
  // }, [outerMarkerdata])

  useEffect(() => {
    setMyProfile(getMyProfileFromLocalStorage);
  }, []);

  return (
    <section className={styles.overlay}>
      <div className={styles.top}>
        <button className={styles.topButton} onClick={getLocation}>
          {locationGetter && (
            <div className={styles.loader}>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
            </div>
          )}
          {!locationGetter && (
            <img
              src="/icon/location_plain.svg"
              alt="location button"
              className={styles.icon}
            ></img>
          )}
        </button>
        <div className={styles.topLocation}>
          <div>{sidoName}</div>
          <div>{sggName}</div>
          <div>{emdongName}</div>
        </div>
      </div>
      <div></div>
      <OverlayCollectionSelector />
    </section>
  );
}
