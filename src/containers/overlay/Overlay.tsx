"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/containers/overlay/_overlay.module.scss";
import CardSlider from "@/components/CardSlider";
import CardSlider2 from "@/components/CardSlider2";
import MarkerData from "@/types/Marker";
import { CollectionDetail } from "@/types/Collection";
import Collection from "@/types/Collection";
import Pin from "@/types/Pin";
import { useState, useEffect } from "react";
import { SimpleCollectionCard } from "@/components/CollectionCard";
import { cleanSelectedCollectionByAmount } from "@/redux/locationSlice";
import fetchGetProfileCollections from "@/utils/members/fetchGetProfileCollections";

import {
  ArrowDropDownIcon,
  ExpendDownIcon,
  ExpendUpIcon,
} from "@/components/IconSvg";

import { markerDataByAmount } from "@/redux/locationSlice";

import useGetMyProfile from "@/hooks/useGetMyProfile";
import { ProfileMine } from "@/types/Profile";
import OverlayTopper from "./OverlayTopper";

interface markerDataByCollection {
  collectionId: number;
  pinDatas: Pin[];
}

export default function Overlay() {
  const dispatch = useAppDispatch();

  const [collectionSelector, setCollectionSelector] = useState(0);
  const [isCardSliderOn, setIsCardSliderOn] = useState(1);
  const [showCardSlider, setShowCardSlider] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number[]>([]);
  const [markerDatas, setMarkerDatas] = useState<markerDataByCollection[]>([]);
  const [topCollectionDatas, setTopCollectionDatas] = useState<CollectionDetail[]>([]);
  const [myCollectionDatas, setMyCollectionDatas] = useState<Collection[]>([]);
  const [scrappedCollectionDatas, setScrappedCollectionDatas] = useState<Collection[]>([]);
  const cleanSelectedCollection = useAppSelector((state) => state.location.cleanSelectedCollection);
  const myProfile = useGetMyProfile();

  const getTopCollectionData = async() => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/top?cnt=10`,
    {
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok){
        throw new Error(`Top10 컬렉션 정보 가져오기를 실패했습니다.`);
      }
      return(res.json());
    })
    .then((res) => {
      setTopCollectionDatas(res.results);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  const getMyCollectionData = async() => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${myProfile?.id}/collections?page=0&size=20`,
    {
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok){
        throw new Error(`내 컬렉션 정보 가져오기를 실패했습니다.`);
      }
      return(res.json());
    })
    .then((res) => {
      setMyCollectionDatas(res.results);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  const getScrappedCollectionData = async() => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${myProfile?.id}/scraps?page=0&size=20`,
    {
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok){
        throw new Error(`스크랩한 컬렉션 정보 가져오기를 실패했습니다.`);
      }
      return(res.json());
    })
    .then((res) => {
      setScrappedCollectionDatas(res.results);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  const toggleCardSlider = () => {
    setIsCardSliderOn((prevState) => {
      if (prevState === 1) return 0;
      return 1;
    });
    setShowCardSlider((prevState) => !prevState);
  };

  const handleClickedCard = (index: number, collection:Collection) => {
    setSelectedCardId((prev) => {
      if (prev.includes(index)) {
        removeMarkerData(collection.id); //마커리스트 데이터에서 해당하는 컬렉션 제거
        return prev.filter((id) => id !== index);
      }
      addMarkerData(collection.id); //마커리스트 데이터에 해당하는 컬렉션 추가
      return [...prev, index];
    });
  };

  const handleClickBottomButton = (num: number) => {
    setCollectionSelector(num);
    setSelectedCardId([]);
  };

  const removeMarkerData = (id: number) => {
    const newMarkerData: markerDataByCollection[] = [];
    markerDatas.forEach((data) => {
      if (data.collectionId != id) {
        newMarkerData.push(data);
      }
    });
    setMarkerDatas(newMarkerData);
  };

  const addMarkerData = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/${id}/pins`,
    {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`컬렉션 '${id}'의 정보 가져오기를 실패했습니다.`);
        }
        return res.json();
      })
      .then((res) => {
        const newMarkerData: markerDataByCollection = {
          collectionId: id,
          pinDatas: res.results,
        };
        setMarkerDatas((prev) => {
          return [...prev, newMarkerData];
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  function makeMarkerList() {
    let markerLists: MarkerData[] = [];
    //최종 마커 리스트를 생성하고 Map에 전달

    function checkList(id:number){
      for(let i = 0 ; i < markerLists.length ; i++){
        if(markerLists[i].id == id){
          return false;
        }
      }
      return true;
    }
    if (markerDatas[0]) {
      markerDatas.forEach((collectionData) => {
        collectionData.pinDatas.forEach((pinData) => {
          if (checkList(pinData.id)) {
            let newData: MarkerData = {
              id:pinData.id,
              placeId:pinData.placeId,
              placeName:pinData.placeName,
              pinCount:pinData.saveCnt,
              latitude:pinData.latitude,
              longitude:pinData.longitude,
            };
            markerLists.push(newData);
          }
        });
      });
      //setMarkerList(markerLists);
    }
    dispatch(markerDataByAmount(markerLists));
  }

  function OverlayCollectionSelector() {
    return (
      <>
      {myProfile ? (
        <div className={styles.bottom}>
          <div
            className={`${styles.bottomContent} ${isCardSliderOn ? styles.visible : ""}`}
          >
            <>
              {collectionSelector == 0 && (
                <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                  {myCollectionDatas.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index, collection)}
                    />
                  ))}
                </CardSlider2>
              )}
              {collectionSelector == 1 && (
                <CardSlider2 height={150} selectedCardIndexList={selectedCardId}>
                  {scrappedCollectionDatas.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index, collection)}
                    />
                  ))}
                </CardSlider2>
              )}
            </>
          </div>
          <div className={styles.buttonBox}>
            <div style={{width:100}}/>
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
            <div style={{width:100}}/>
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
                  {topCollectionDatas.map((collection, index) => (
                    <SimpleCollectionCard
                      key={index}
                      collectionData={collection}
                      linkDisabled={true}
                      onClick={() => handleClickedCard(index, collection)}
                    />
                  ))}
                </CardSlider2>
              )}
            </>
          </div>
          <div className={styles.buttonBox}>
            <div></div>
            <div style={{width:150}}/>
            <button
              className={`${styles.bottomButton} ${collectionSelector == 0 ? styles.clickedButtons : ""}`}
            >
              추천 컬렉션
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
            <div style={{width:150}}/>
          </div>
        </div>
        )}
      </>
    );
  }

  useEffect(() => {
    if(cleanSelectedCollection)
      makeMarkerList();
    else
      dispatch(cleanSelectedCollectionByAmount(false));
  }, [markerDatas]);

  useEffect(() => {
    if(cleanSelectedCollection){
      setSelectedCardId([]);
      setMarkerDatas([]);
    }
  },[cleanSelectedCollection])

  // useEffect(() => {
  //   if(outerMarkerdata != markerList)
  //   setSelectedCardId([])
  // }, [outerMarkerdata])

  useEffect(() => {}, []); // 로그인 정보 변경 redux 추가

  useEffect(()=>{
    getTopCollectionData();
    if(myProfile){
      getMyCollectionData();
      getScrappedCollectionData();
    }
  },[myProfile])

  return (
    <section className={styles.overlay}>
      <OverlayTopper />
      <div></div>
      <OverlayCollectionSelector />
    </section>
  );
}
