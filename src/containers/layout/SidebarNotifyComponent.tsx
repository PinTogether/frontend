import { useEffect, useState, useRef } from "react";
import styles from "@/styles/layout/_sidebar.module.scss";
import useGetMyProfile from "@/hooks/useGetMyProfile";

const SidebarNotifyComponent = () => {
  const myProfile = useGetMyProfile();
  const [notifyCnt, setNotifyCnt] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!myProfile) return;

    wsRef.current = new WebSocket(
      `wss://${process.env.NEXT_PUBLIC_BACKEND_URL}/ws/notification`
    );
    wsRef.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      setNotifyCnt(message.alertCnt);
    };

    wsRef.current.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      if (wsRef.current) {
        console.log("Closing WebSocket");
        wsRef.current.close();
      }
    };
  }, [myProfile]);

  if (notifyCnt === 0) return null;
  else return <div className={styles.notifyCnt}>{`${notifyCnt}`}</div>;
};

export default SidebarNotifyComponent;
