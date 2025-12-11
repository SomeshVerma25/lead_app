type Listener = (data?: any) => void;

class EventEmitterService {
  private static instance: EventEmitterService;
  private events: { [key: string]: Listener[] } = {};

  private constructor() {}

  static getInstance(): EventEmitterService {
    if (!EventEmitterService.instance) {
      EventEmitterService.instance = new EventEmitterService();
    }
    return EventEmitterService.instance;
  }

  on(eventName: string, callback: Listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName: string, callback?: Listener) {
    if (!this.events[eventName]) return;

    if (callback) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    } else {
      delete this.events[eventName];
    }
  }

  emit(eventName: string, data?: any) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(cb => cb(data));
  }
}

export default EventEmitterService.getInstance();
