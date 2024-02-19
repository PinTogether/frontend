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

  const [isFirstCard, setIsFirstCard] = useState(true);
  const [isLastCard, setIsLastCard] = useState(false);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(
    Array(children.length)
      .fill(null)
      .map(() => useRef<HTMLDivElement>(null))
  );
  const firstCardRef = cardRefs.current[0];
  const lastCardRef = cardRefs.current[cardRefs.current.length - 1];

  const withStyle = {
    width: width ? width : "100%",
    height: height ? height : "100%",
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
    [cardContainerRef]
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
    [setIsFirstCard, setIsLastCard]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, option);
    return () => {
      observerRef?.current?.disconnect();
    };
  }, [callback, option]);

  useEffect(() => {
    const firstCard = firstCardRef.current;
    const lastCard = lastCardRef.current;
    if (firstCard) observerRef?.current?.observe(firstCard);
    if (lastCard) observerRef?.current?.observe(lastCard);

    return () => {
      if (firstCard) observerRef?.current?.unobserve(firstCard);
      if (lastCard) observerRef?.current?.unobserve(lastCard);
    };
  }, [observerRef, lastCardRef, firstCardRef]);

  return (
    <section style={withStyle} className={styles.cardSlider}>
      {/* Card Container */}
      <div className={styles.cardContainer} ref={cardContainerRef}>
        {children?.map((child, index) => {
          return (
            <article
              key={index}
              className={styles.card}
              ref={cardRefs.current[index]}
            >
              {child}
            </article>
          );
        })}
      </div>
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
