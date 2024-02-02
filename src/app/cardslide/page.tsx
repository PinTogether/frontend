"use client";

import styles from "@/styles/components/_cardslider.module.scss";
import { useRef, useEffect } from "react";
import Image from "next/image";
import CardSlider from "@/components/CardSlider";

export default function Page() {
  return (
    <div className={styles.page}>
      <CardSlider width={500} scrollCardNumber={3}>
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
        <Image src="https://picsum.photos/200/300" alt="image" />
      </CardSlider>
    </div>
  );
}

const Card = () => {
  return <div>hi</div>;
};
