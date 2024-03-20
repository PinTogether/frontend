"use client";

import styles from "@/styles/components/_alertModal.module.scss";
import { useEffect, useState } from "react";

const AlertModal = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
}) => {
  const [isShow, setIsShow] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message === "") return;

    setIsShow(true);
    setTimer(
      setTimeout(() => {
        setIsShow(false);
        setMessage("");
      }, 2000)
    );

    return () => {
      setIsShow(false);
      timer && clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      {isShow && (
        <div className={styles.modal}>
          <p className={styles.message}>{message}</p>
        </div>
      )}
    </>
  );
};
export default AlertModal;
