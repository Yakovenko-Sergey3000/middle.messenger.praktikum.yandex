import EventBus from "@utils/event-bus.ts";
import { YA_ENDPOINTS } from "../enums.ts";

export const WSEvents = {
  CONNECTED: "connected",
  CLOSE: "close",
  ERROR: "error",
  MESSAGE: "message",
};
class WS<Message> extends EventBus<Message> {
  #socket?: WebSocket;

  #pingInterval?: ReturnType<typeof setInterval>;

  #pingIntervalTime: number = 30000;

  #url: string;

  constructor(url: string) {
    super();
    this.#url = YA_ENDPOINTS.ws + url;
  }

  connect(): Promise<void> {
    if (this.#socket) {
      throw new Error("Сокет уже установлен");
    }

    this.#socket = new WebSocket(this.#url);
    this.subscribe(this.#socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSEvents.ERROR, reject);
      this.on(WSEvents.CONNECTED, () => {
        this.off(WSEvents.ERROR, reject);
        resolve();
      });
    });
  }

  close() {
    this.#socket?.close();
    clearInterval(this.#pingInterval);
  }

  send(data: string | number | object) {
    if (!this.#socket) {
      throw new Error("Сокет не установлен");
    }

    this.#socket.send(JSON.stringify(data));
  }

  setupPing() {
    this.#pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, this.#pingIntervalTime);

    this.on(WSEvents.CLOSE, () => {
      clearInterval(this.#pingInterval);
      this.#pingInterval = undefined;
    });
  }

  subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSEvents.CONNECTED);
    });
    socket.addEventListener("close", () => {
      this.emit(WSEvents.CLOSE);
    });
    socket.addEventListener("error", () => {
      this.emit(WSEvents.ERROR);
    });
    socket.addEventListener("message", (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (["pong", "user connected"].includes(data?.type)) {
          return;
        }

        this.emit(WSEvents.MESSAGE, data);
      } catch (e) {
        /* empty */
      }
    });
  }
}

export default WS;
