"use client"

import styles from "@/styles/components/_subtopper.module.scss"
import { useRouter } from "next/navigation";

const Topper = ({ msg }: { msg?: string }) => {
  const router = useRouter();
  return (
    <section className={styles.topper}>
      <button onClick={() => router.back()}>
        <img src="/icon/expand_left.svg" alt="backward" className={styles.icon} />
      </button>
      <b>{msg}</b>
    </section>
  );
  };

  export default Topper
