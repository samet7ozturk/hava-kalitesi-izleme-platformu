import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useAnomalySocket(onMessage: (data: any) => void) {
  const cbRef = useRef(onMessage);
  cbRef.current = onMessage;

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      reconnectDelay: 5000,
      // Bağlandığında log bas:
      onConnect: (frame) => {
        console.log("✅ [WS] Connected:", frame);
        client.subscribe("/topic/anomalies", (msg) => {
          cbRef.current(JSON.parse(msg.body));
        });
      },
      // Hata olursa log bas:
      onStompError: (frame) => {
        console.error("❌ [WS] STOMP Error:", frame);
      },
      onWebSocketError: (evt) => {
        console.error("❌ [WS] WebSocket Error:", evt);
      },
    });

    client.activate();
    return () => {
      client.deactivate();
    };
  }, []);
}
