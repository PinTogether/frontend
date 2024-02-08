"use client";

import { LogoHorizontal } from "./LogoSvg";
import styles from "@/styles/layout/_mainPage.module.scss";
import { useState } from "react";
import CardSlider from "@/components/CardSlider";

// 카드슬라이드 크기설정을 창 크기에따라 할 수 있게 변경해야함

export default function MainPage() {
  const [inputCollectionSearch, setInputCollectionSearch] = useState("");
  const onChangeCollection = (e: any) => {
    setInputCollectionSearch(e.target.value);
  };

  return (
    <section className={styles.container}>
      <section className={styles.topper}>
        <LogoHorizontal />
        <div className={styles.inputContainer}>
          <button className={styles.inputButton}>
            <img
              src="/icon/search_plain.svg"
              alt="search icon"
              className={styles.icon}
            />
          </button>
          <input
            className={styles.input}
            onChange={onChangeCollection}
            value={inputCollectionSearch}
            placeholder="다른 사람의 컬렉션을 검색해 보세요 !  추천 키워드  :  강릉, 맛집,  디저트 ... !"
          />
          <select>
            <option value="1">컬렉션 검색</option>
            <option value="2">핀 검색</option>
            <option value="3">장소 검색</option>
          </select>
        </div>
      </section>
      <section className={styles.gradationBox}>asd</section>
      <section className={styles.recommendCard}>
        <CardSlider width={1200} scrollCardNumber={2}>
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
          <CardSlider width={1200} scrollCardNumber={5}>
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
          </CardSlider>
        </section>
        <section className={styles.popularTop}>
          <p className={styles.popularTopText}>별로 안 추천 컬렉션 TOP10</p>
          <CardSlider width={1200} scrollCardNumber={5}>
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
          </CardSlider>
        </section>
        <section className={styles.popularTop}>
          <p className={styles.popularTopText}>적당히 추천 컬렉션 TOP10</p>
          <CardSlider width={1200} scrollCardNumber={5}>
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
            <img src="https://picsum.photos/170/200" alt="image" />
          </CardSlider>
        </section>
      </section>
    </section>
  );
}
