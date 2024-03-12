"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import styles from "@/styles/components/_cardslider2.module.scss";
import pxToRem from "@/utils/pxToRem";

export default function CardSlider2({
  children,
  width,
  height,
  selectedCardIndexList,
}: {
  children: ReactNode[];
  width?: number;
  height?: number;
  selectedCardIndexList?: number[];
}) {
  const [isFirstCard, setIsFirstCard] = useState(true);
  const [isLastCard, setIsLastCard] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [widthStyle, setWidthStyle] = useState({
    width: width ? width : "100%",
    height: height ? height : "100%",
  });
  const cardWidth = 4; // rem
  const defaultgap = 1;

  useEffect(() => {
    /* 세팅 */
    cardRefs.current = children.map(
      (_, index) => cardRefs.current[index] || null
    );
    setWidthStyle({
      width: width ? width : "100%",
      height: cardRefs.current[0]?.clientHeight
        ? cardRefs.current[0]?.clientHeight + "3"
        : "100%",
    });
    const newCardWidth = pxToRem(cardRefs.current[0]?.clientWidth || 0);
    setActivateCardList(selectedCardIndexList ? selectedCardIndexList : []);
  }, [selectedCardIndexList, children.length]);

  function smoothScrollTo(scrollTargetPx: number) {
    const startTime = performance.now();
    const start = cardContainerRef.current!.scrollLeft;
    const distance = scrollTargetPx - start; // 목표까지의 거리
    const duration = 2 * Math.abs(distance); // 애니메이션 지속 시간 (밀리초)

    function easeOutQuad(t: number) {
      return t * (2 - t);
    }
    function scrollStep(timestamp: number) {
      const elapsed = timestamp - startTime; // 경과 시간
      const fraction = Math.min(elapsed / duration, 1); // 진행률 (0에서 1 사이)

      cardContainerRef.current!.scrollLeft =
        start + distance * easeOutQuad(fraction); // 현재 스크롤 위치 계산

      if (fraction < 1) {
        // 진행률이 100%에 도달하지 않았다면, 다음 프레임을 위해 재귀적으로 함수 호출
        window.requestAnimationFrame(scrollStep);
      }
    }
    window.requestAnimationFrame(scrollStep);
  }

  const setActivateCardList = (indexList: number[]) => {
    cardRefs.current.forEach((cardRef, i) => {
      if (indexList.includes(i)) {
        cardRef?.classList.add(styles.activeCard);
        cardRef?.classList.remove(styles.deactiveCard);
      } else {
        cardRef?.classList.remove(styles.activeCard);
        cardRef?.classList.add(styles.deactiveCard);
      }
    });
  };

  const setButtonVisibility = (willScrolledWidth: number) => {
    if (!cardContainerRef.current) return;
    if (willScrolledWidth <= 0) setIsFirstCard(true);
    else setIsFirstCard(false);
    if (
      willScrolledWidth + cardContainerRef.current?.clientWidth >=
      cardContainerRef.current?.scrollWidth
    )
      setIsLastCard(true);
    else setIsLastCard(false);
  };

  const handleClickLeftButton = () => {
    if (isFirstCard) return;
    const willScrolledWidth =
      cardContainerRef.current!.scrollLeft -
      cardContainerRef.current!.clientWidth;
    smoothScrollTo(willScrolledWidth);
    setButtonVisibility(willScrolledWidth);
  };

  const handleClickRightButton = () => {
    if (isLastCard) return;
    const willScrolledWidth =
      cardContainerRef.current!.scrollLeft +
      cardContainerRef.current!.clientWidth;
    smoothScrollTo(willScrolledWidth);
    setButtonVisibility(willScrolledWidth);
  };

  return (
    <section style={widthStyle} className={styles.cardSlider}>
      {/* Card Container */}
      <div className={styles.cardContainer} ref={cardContainerRef}>
        {children?.map((child, index) => {
          return (
            <article
              key={index}
              className={styles.deactiveCard}
              ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
            >
              {child}
            </article>
          );
        })}
      </div>
      {/* Left Button */}
      {!isFirstCard && (
        <button className={styles.leftButton} onClick={handleClickLeftButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}
      {/* Right Button */}
      {!isLastCard && (
        <button className={styles.rightButton} onClick={handleClickRightButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </section>
  );
}
