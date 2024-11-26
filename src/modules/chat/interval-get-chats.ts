class IntervalGetChats {
  getChats: () => void;

  constructor(private intervalId?: number) {
    this.getChats = () => {};
  }

  init(getChatsFn: () => void) {
    if (!this.intervalId) {
      this.intervalId = this.start();
    }

    if (getChatsFn) {
      this.getChats = getChatsFn;
    }
  }

  start() {
    return setInterval(() => this.getList(), 20000);
  }

  getList() {
    this.getChats();
  }

  restart() {
    clearInterval(this.intervalId);
    this.intervalId = this.start();
  }
}

export default new IntervalGetChats();
