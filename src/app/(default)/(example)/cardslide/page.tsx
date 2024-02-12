"use client";

import styles from "@/styles/components/_cardslider.module.scss";
import { useRef, useEffect } from "react";
import Image from "next/image";
import CardSlider from "@/components/CardSlider";

export default function Page() {
  return (
    <div className={styles.page}>
      <CardSlider scrollCardNumber={3}>
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
        <Image
          src="https://picsum.photos/200/300"
          alt="image"
          width={200}
          height={400}
        />
      </CardSlider>
    </div>
  );
}

const Card = () => {
  return <div>hi</div>;
};
