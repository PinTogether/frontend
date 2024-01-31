"use client";

import styles from "@/styles/components/_cardslider.module.scss";
import { useRef, useEffect } from "react";
import CardSlider from "@/components/CardSlider";

export default function Page() {
  return (
    <div className={styles.page}>
      <CardSlider width={500} scrollCardNumber={3}>
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />
        <img src="https://picsum.photos/200/300" alt="image" />

      </CardSlider>
    </div>
  );
}

const Card = () => {
  return <div>hi</div>;
};
