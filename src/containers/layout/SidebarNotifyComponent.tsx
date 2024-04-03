import { useEffect, useState, useRef } from "react";
import styles from "@/styles/layout/_sidebar.module.scss";
import { useGetMyProfile } from "@/hooks/myProfileHooks";

const SidebarNotifyComponent = () => {
  const myProfile = useGetMyProfile();
  const [notifyCnt, setNotifyCnt] = useState(10);

  const wsRef = useRef<WebSocket | null>(null);
  // 엑스포넨셜 백오프(Exponential Backoff): 연결 재시도 간격을 점차 증가시키는 방법
  const maxRetries = 5; // Max retries to connect to WebSocket
  const retryCountRef = useRef(0);

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
    if (retryCountRef.current >= maxRetries) {
      console.error("Max retries reached. Could not connect to WebSocket");
      return;
    }

    wsRef.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL}/ws/notification`
    );
    wsRef.current.onopen = () => {
      console.log("Connected to WebSocket");
      retryCountRef.current = 0;
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      setNotifyCnt(message.alertCnt);
    };

    wsRef.current.onclose = () => {
      console.log("Disconnected from WebSocket");
      retryCountRef.current = retryCountRef.current + 1;
      setTimeout(
        () => {
          connectWebSocket();
        },
        Math.pow(2, retryCountRef.current || 0) * 1000
      );
    };
  };

  if (notifyCnt === 0) return null;
  else return <div className={styles.notifyCnt}>{`${notifyCnt}`}</div>;
};

export default SidebarNotifyComponent;
