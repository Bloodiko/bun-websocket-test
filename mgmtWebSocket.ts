import { ServerWebSocket } from "bun";

type WebSocketData = {
  type: string;
};

type mgmtWs = ServerWebSocket<WebSocketData>;

export function mgmtWebSocketOpen(ws: mgmtWs) {
  console.log("WebSocket Opened");
  ws.send("Hello, You are accessing this Server on Path /ws/mgmt");
}

export function mgmtWebSocketClose(ws: mgmtWs) {
  console.log("WebSocket Closed");
}

export function mgmtWebSocketMessage(ws: mgmtWs, msg: string) {
  console.log(`WebSocket Message: ${msg}`);
}
