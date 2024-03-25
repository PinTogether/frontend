"use client";

import styles from "@/styles/components/_alertModal.module.scss";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  initialAlertMessage,
  clearAlertMessage,
  setTimer,
  addAlertMessage,
  deleteAlertMessage,
  AlertMessage,
} from "@/redux/globalAlertSlice";

const GlobalAlertModal = () => {
  // const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const messageList: AlertMessage[] = useAppSelector(
    (state) => state.globalAlert
  );

  useEffect(() => {
    if (messageList.length === 0) return;

    messageList.forEach((message) => {
      if (message.timer === null) {
        const timer = setTimeout(() => {
          dispatch(deleteAlertMessage(message.id));
        }, 2000);
        dispatch(setTimer({ id: message.id, timer }));
      }
    });
  }, [messageList]);

  return (
    <>
      {messageList.map((message) => (
        <div className={styles.modal} key={message.id}>
          <p className={styles.message}>{message.message}</p>
        </div>
      ))}
    </>
  );
};
export default GlobalAlertModal;
