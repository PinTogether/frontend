"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import styles from "@/styles/layout/_maincontent.module.scss";
import Overlay from "../overlay/Overlay";
import { mainContentWidthByAmount } from "@/redux/locationSlice";
import { Suspense } from "react";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const FlexbarWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );

  function toggleFlexBarWidth() {
    if (FlexbarWidth === "0px") {
      dispatch(mainContentWidthByAmount("500px"));
    } else if (FlexbarWidth === "500px") {
      dispatch(mainContentWidthByAmount("95%"));
    } else {
      dispatch(mainContentWidthByAmount("0px"));
    }
  }

  function ButtonImg() {
    if (FlexbarWidth == "95%") {
      return (
        <img
          src="/icon/expand_left.svg"
          alt="expand left"
          className={styles.icon}
        />
      );
    } else
      return (
        <img
          src="/icon/expand_right.svg"
          alt="expand right"
          className={styles.icon}
        />
      );
  }

  return (
    <section className={styles.container}>
      <div
        className={`${styles.maincontent} ${FlexbarWidth != "0px" ? styles.visible : ""}`}
        style={{ width: FlexbarWidth }}
      >
        {children}
      </div>
      <div>
        <button onClick={toggleFlexBarWidth} className={styles.mainButton}>
          {ButtonImg()}
        </button>
      </div>
      <div className={styles.overlay}>
        <Suspense>
          <Overlay />
        </Suspense>
      </div>
    </section>
  );
}
