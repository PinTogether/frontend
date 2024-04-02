"use client";

import styles from "@/styles/components/_cardslider.module.scss";
import {
  useEffect,
  useState,
  useRef,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { ExpandLeftIcon, ExpandRightIcon } from "./IconSvg";

export default function CardSlider({
  children,
  scrollSize,
  scrollCardNumber = 1,
  gap = 20,
  width,
  height,
}: {
  children: ReactNode[];
  scrollSize?: number;
  scrollCardNumber?: number;
  gap?: number;
  width?: number;
  height?: number;
}) {
  const defaultScrollSize = 500;

  const [isFirstCard, setIsFirstCard] = useState(true);
  const [isLastCard, setIsLastCard] = useState(false);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  // 동적으로 children에 맞춰 cardRefs를 생성합니다.
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const withStyle = {
    width: width ? width : "100%",
    // height: height ? height : "100%",
  };

  // cardRefs를 초기화하고, children 배열의 변화에 따라 업데이트합니다.
  useEffect(() => {
    cardRefs.current = children.map(
      (_, index) => cardRefs.current[index] || null
    );
  }, [children]);

  const handleLeftClick = useCallback(() => {
    // firstCardRef 및 lastCardRef의 사용을 제거하고 직접 cardRefs.current 배열을 참조합니다.
    const cardContainerScrollSize =
      (scrollSize || cardRefs.current[0]?.clientWidth || defaultScrollSize) +
      gap;
    const cardContainerScrollLeft = cardContainerRef.current?.scrollLeft || 0;
    const left =
      cardContainerScrollLeft -
      cardContainerScrollSize * scrollCardNumber +
      (isFirstCard ? gap / 2 : 0);

    cardContainerRef.current?.scrollTo({
      left: left,
      behavior: "smooth",
    });
  }, [scrollSize, scrollCardNumber, gap, isFirstCard]);

  const handleRightClick = useCallback(() => {
    const cardContainerScrollSize =
      (scrollSize || cardRefs.current[0]?.clientWidth || defaultScrollSize) +
      gap;
    const cardContainerScrollLeft = cardContainerRef.current?.scrollLeft || 0;
    const left =
      cardContainerScrollLeft +
      cardContainerScrollSize * scrollCardNumber -
      (isFirstCard ? gap / 2 : 0);

    cardContainerRef.current?.scrollTo({
      left: left,
      behavior: "smooth",
    });
  }, [scrollSize, scrollCardNumber, gap, isFirstCard]);

  const observerRef = useRef<IntersectionObserver>();
  const option = useMemo<IntersectionObserverInit>(
    () => ({
      root: cardContainerRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    }),
    []
  );

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
      if (entry.isIntersecting) {
        if (index === 0) {
          setIsFirstCard(true);
        } else if (index === cardRefs.current.length - 1) {
          setIsLastCard(true);
        }
      } else {
        if (index === 0) {
          setIsFirstCard(false);
        } else if (index === cardRefs.current.length - 1) {
          setIsLastCard(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    observerRef.current = observer;

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [callback, option, children]);

  return (
    <section style={withStyle} className={styles.cardSlider}>
      <div className={styles.cardContainer} ref={cardContainerRef}>
        {children.map((child, index) => (
          <article
            key={index}
            className={styles.card}
            // ref={(el) => (cardRefs.current[index] = el)}
            ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
          >
            {child}
          </article>
        ))}
      </div>
      {!isFirstCard && (
        <button className={styles.leftButton} onClick={handleLeftClick}>
          <ExpandLeftIcon />
        </button>
      )}
      {!isLastCard && (
        <button className={styles.rightButton} onClick={handleRightClick}>
          <ExpandRightIcon />
        </button>
      )}
    </section>
  );
}
