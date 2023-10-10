import { Serve, ServerWebSocket, serve } from "bun";
import {
  botWebSocketOpen,
  botWebSocketClose,
  botWebSocketMessage,
} from "./botWebSocket";
import {
  mgmtWebSocketOpen,
  mgmtWebSocketClose,
  mgmtWebSocketMessage,
} from "./mgmtWebSocket";

type WebSocketData = {
  type: string;
};

type WebSocketHandler = {
  [key: string]: {
    open: (ws: ServerWebSocket<WebSocketData>) => void;
    close: (ws: ServerWebSocket<WebSocketData>) => void;
    message: (ws: ServerWebSocket<WebSocketData>, msg: string) => void;
  };
};

const webSocketHandler: WebSocketHandler = {
  bot: {
    open: botWebSocketOpen,
    close: botWebSocketClose,
    message: botWebSocketMessage,
  },
  mgmt: {
    open: mgmtWebSocketOpen,
    close: mgmtWebSocketClose,
    message: mgmtWebSocketMessage,
  },
};

const server = serve<WebSocketData>({
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/ws/")) {
      const wsType = url.pathname.slice(4);
      server.upgrade(req, {
        data: {
          type: wsType,
        },
      });
    }
    return new Response(
      `Hello, You are accessing this Server on Path ${url.pathname}`
    );
  },

  websocket: {
    open(ws) {
      const wsType = ws.data.type;

      if (wsType in webSocketHandler) {
        const wsHandler = webSocketHandler[wsType];
        wsHandler.open(ws);
      } else {
        console.log(`WebSocket Type ${wsType} Not Supported`);
        ws.send("WebSocket Type Not Supported");
        ws.close();
      }
    },
    close(ws) {
      console.log("WebSocket Closed");
    },
    message(ws, msg) {
      const wsType = ws.data.type;

      const wsHandler = webSocketHandler[wsType];
      if (typeof msg === "string") {
        wsHandler.message(ws, msg);
      }
    },
  },
});
