export default class EventBus<T> {
  events: Record<string, ((...payload: T[]) => void)[]>;

  constructor() {
    this.events = {};
  }

  on(eventKey: string, cb: (...payload: T[]) => void): void {
    if (!this.events[eventKey]) {
      this.events[eventKey] = [];
    }

    this.events[eventKey].push(cb);
  }

  off(eventKey: string, cb: () => void): void {
    this.checkEvent(eventKey);
    this.events[eventKey] = this.events[eventKey].filter((event) => event !== cb);
  }

  emit(eventKey: string, ...payload: T[]): void {
    this.checkEvent(eventKey);
    this.events[eventKey].forEach((cb) => cb(...payload));
  }

  private checkEvent(eventKey: string) {
    if (!this.events[eventKey]) {
      throw new Error(`Нет подписки на событие: ${eventKey}`);
    }
  }
}
