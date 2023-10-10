import { ServerWebSocket } from "bun";

type WebSocketData = {
  type: string;
};

type botWs = ServerWebSocket<WebSocketData>;

export function botWebSocketOpen(ws: botWs) {
  console.log("WebSocket Opened");
  ws.send("Hello, You are accessing this Server on Path /ws/bot");
}

export function botWebSocketClose(ws: botWs) {
  console.log("WebSocket Closed");
}

export function botWebSocketMessage(ws: botWs, msg: string) {
  console.log(`WebSocket Message: ${msg}`);
}
