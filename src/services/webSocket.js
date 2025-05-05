import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectWebSocket = (roomId, onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/chat");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("STOMP connected");

      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
  });

  stompClient.activate();
};

export const sendMessage = (roomId, content, sender) => {
  if (stompClient && stompClient.connected) {
    const messageRequest = {
      content,
      sender,
      roomId,
    };

    stompClient.publish({
      destination: `/app/sendMessage/${roomId}`,
      body: JSON.stringify(messageRequest),
    });
  } else {
    console.warn("STOMP is not connected.");
  }
};
