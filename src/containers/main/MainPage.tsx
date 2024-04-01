"use client";

import { LogoHorizontal } from "../../components/LogoSvg";
import styles from "@/styles/containers/main/_mainPage.module.scss";
import { useEffect, useState } from "react";
import CardSlider2 from "@/components/CardSlider2";
import CardSlider from "@/components/CardSlider";
import GlobalAlertModal from "@/components/GlobalAlertModal";
import {
  DefaultCollectionCard,
  SimpleCollectionCard,
} from "@/components/CollectionCard";
import { CollectionDetail } from "@/types/Collection";
import { DefaultCollectionSkeleton } from "@/components/loading/SkeletonImage";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [isLoading3, setIsLoading3] = useState<boolean>(false);
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");
  const [topCollectionDatas, setTopCollectionDatas] = useState<
    CollectionDetail[]
  >([]);
  const [JWRecomendedCollectionDatas, setJWRecomendedCollectionDatas] =
    useState<CollectionDetail[]>([]);
  const [JYRecomendedCollectionDatas, setJYRecomendedCollectionDatas] =
    useState<CollectionDetail[]>([]);
  const [THRecomendedCollectionDatas, setTHRecomendedCollectionDatas] =
    useState<CollectionDetail[]>([]);
  const [EJRecomendedCollectionDatas, setEJRecomendedCollectionDatas] =
    useState<CollectionDetail[]>([]);

  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  };

  const SkeletonRenderer = () => {
    return (
      <CardSlider scrollCardNumber={1}>
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
        <DefaultCollectionSkeleton />
      </CardSlider>
    );
  };

  const getTopCollectionData = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/top?cnt=10`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Top10 컬렉션 정보 가져오기를 실패했습니다.`);
        }
        return res.json();
      })
      .then((res) => {
        setTopCollectionDatas(res.results);
        setIsLoading1(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getJWCollectionData = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${process.env.NEXT_PUBLIC_JW_ID}/collections?page=0&size=20`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `${process.env.NEXT_PUBLIC_JW_ID} 컬렉션 정보 가져오기를 실패했습니다.`
          );
        }
        return res.json();
      })
      .then((res) => {
        setJWRecomendedCollectionDatas(res.results);
        setIsLoading2(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getJYCollectionData = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${process.env.NEXT_PUBLIC_JY_ID}/collections?page=0&size=20`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `${process.env.NEXT_PUBLIC_JY_ID} 컬렉션 정보 가져오기를 실패했습니다.`
          );
        }
        return res.json();
      })
      .then((res) => {
        setJYRecomendedCollectionDatas(res.results);
        setIsLoading3(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getTopCollectionData();
    getJWCollectionData();
    getJYCollectionData();
  }, []);

  const enterKeyDown = (e: any) => {
    if (e.key === "Enter" && inputCollectionSearch != "") {
      const keyword = encodeURIComponent(inputCollectionSearch);
      router.push(`/search?keyword=${keyword}`);
    }
  };

  const searchButtonClick = () => {
    if (inputCollectionSearch != "") {
      const keyword = encodeURIComponent(inputCollectionSearch);
      router.push(`/search?keyword=${keyword}`);
    }
  };

  return (
    <section className={styles.alertModalSection}>
      <section className={styles.container}>
        <section className={styles.topper}>
          <LogoHorizontal />
          <div className={styles.inputContainer}>
            <button className={styles.inputButton}>
              <img
                src="/icon/search_plain.svg"
                alt="search icon"
                className={styles.icon}
                onClick={searchButtonClick}
              />
            </button>
            <input
              className={styles.input}
              onChange={onChangeCollection}
              value={inputCollectionSearch}
              placeholder="장소와 컬렉션을 검색해 보세요 ! 강릉, 맛집,  디저트 ... !"
              onKeyDown={enterKeyDown}
            />
          </div>
        </section>
        <section className={styles.gradationBox}>
          <div>
            <span>내가 좋아하는 </span>
            <span className={styles.bold}>장소</span>
            <span>에</span> <span className={styles.bold}>핀</span>
            <span>을 찍고</span>
            <br />
            <span className={styles.bold}>컬렉션</span>
            <span>을 만들고, 친구들과 공유해보세요!</span>
          </div>
        </section>
        <section className={styles.recommendCard}>
          <CardSlider scrollCardNumber={1}>
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
            <img src="https://picsum.photos/500/300" alt="image" />
          </CardSlider>
        </section>
        <section className={styles.recommendListContainer}>
          <section className={styles.popularTop}>
            <p className={styles.popularTopText}>인기 추천 컬렉션 TOP10</p>
            <div className={styles.cardSliderContainer}>
              {isLoading1 ? (
                <CardSlider scrollCardNumber={2}>
                  {topCollectionDatas.map((collection, index) => (
                    <DefaultCollectionCard
                      key={index}
                      collectionData={collection}
                      // linkDisabled={true}
                    />
                  ))}
                </CardSlider>
              ) : (
                <SkeletonRenderer />
              )}
            </div>
          </section>
          <section className={styles.popularTop}>
            <p className={styles.popularTopText}>JW의 컬렉션 추천</p>
            <div className={styles.cardSliderContainer}>
              {isLoading2 ? (
                <CardSlider scrollCardNumber={2}>
                  {JWRecomendedCollectionDatas.map((collection, index) => (
                    <DefaultCollectionCard
                      key={index}
                      collectionData={collection}
                      // linkDisabled={true}
                    />
                  ))}
                </CardSlider>
              ) : (
                <SkeletonRenderer />
              )}
            </div>
          </section>
          <section className={styles.popularTop}>
            <p className={styles.popularTopText}>JY의 컬렉션 추천</p>
            <div className={styles.cardSliderContainer}>
              {isLoading3 ? (
                <CardSlider scrollCardNumber={2}>
                  {JYRecomendedCollectionDatas.map((collection, index) => (
                    <DefaultCollectionCard
                      key={index}
                      collectionData={collection}
                      // linkDisabled={true}
                    />
                  ))}
                </CardSlider>
              ) : (
                <SkeletonRenderer />
              )}
            </div>
          </section>
        </section>
      </section>
      <GlobalAlertModal />
    </section>
  );
}
