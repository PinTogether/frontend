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
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const [isFirstCard, setIsFirstCard] = useState(true);
  const [isLastCard, setIsLastCard] = useState(false);

  const withStyle = {
    width: width,
    height: height,
  };

  const handleLeftClick = () => {
    const cardContainerScrollSize =
      (scrollSize || firstCardRef.current?.clientWidth || defaultScrollSize) +
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
  };

  const handleRightClick = () => {
    const cardContainerScrollSize =
      (scrollSize || firstCardRef.current?.clientWidth || defaultScrollSize) +
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
  };

  const observerRef = useRef<IntersectionObserver>();
  const option = useMemo<IntersectionObserverInit>(
    () => ({
      root: cardContainerRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    }),
    [children]
  );
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === firstCardRef.current) {
            setIsFirstCard(true);
          } else if (entry.target === lastCardRef.current) {
            setIsLastCard(true);
          }
        } else {
          if (entry.target === firstCardRef.current) {
            setIsFirstCard(false);
          } else if (entry.target === lastCardRef.current) {
            setIsLastCard(false);
          }
        }
      });
    },
    [children]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, option);

    if (firstCardRef.current)
      observerRef?.current?.observe(firstCardRef.current);
    if (lastCardRef.current) observerRef?.current?.observe(lastCardRef.current);

    return () => {
      if (firstCardRef.current)
        observerRef?.current?.unobserve(firstCardRef.current);
      if (lastCardRef.current)
        observerRef?.current?.unobserve(lastCardRef.current);
      observerRef?.current?.disconnect();
    };
  }, []);

  return (
    <section style={withStyle} className={styles.cardSlider}>
      {/* Left Button */}
      {!isFirstCard && (
        <button className={styles.leftButton} onClick={handleLeftClick}>
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
      {/* Card Container */}
      <div className={styles.cardContainer} ref={cardContainerRef}>
        {children?.map((child, index) => {
          if (index === 0) {
            return (
              <article key={index} className={styles.card} ref={firstCardRef}>
                {child}
              </article>
            );
          } else if (index === children.length - 1) {
            return (
              <article key={index} className={styles.card} ref={lastCardRef}>
                {child}
              </article>
            );
          }
          return (
            <article key={index} className={styles.card}>
              {child}
            </article>
          );
        })}
      </div>
      {/* Right Button */}
      {!isLastCard && (
        <button className={styles.rightButton} onClick={handleRightClick}>
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
