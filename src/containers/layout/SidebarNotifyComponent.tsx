import { useEffect, useState, useRef } from "react";
import styles from "@/styles/layout/_sidebar.module.scss";
import useGetMyProfile from "@/hooks/useGetMyProfile";

const SidebarNotifyComponent = () => {
  const myProfile = useGetMyProfile();
  const [notifyCnt, setNotifyCnt] = useState(10);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!myProfile) return;

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        console.log("Closing WebSocket");
        wsRef.current.close();
      }
    };
  }, [myProfile]);

  const connectWebSocket = () => {
    const websocketURl = `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL}`;
    if (!websocketURl) {
      console.error("WebSocket URL is not defined in env");
      return;
    }

    wsRef.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL}/ws/notification`
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
      setTimeout(() => {
        connectWebSocket();
      }, 1000);
    };
  };

  if (notifyCnt === 0) return null;
  else return <div className={styles.notifyCnt}>{`${notifyCnt}`}</div>;
};

export default SidebarNotifyComponent;
