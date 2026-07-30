import { CareerOSEvent, EventListener } from './types';

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Set<EventListener>> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Registers a listener to a specific event name
   */
  public subscribe(eventName: CareerOSEvent['name'], listener: EventListener): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(listener);

    // Return an unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(eventName);
      if (eventListeners) {
        eventListeners.delete(listener);
        if (eventListeners.size === 0) {
          this.listeners.delete(eventName);
        }
      }
    };
  }

  /**
   * Publishes an event asynchronously to all registered listeners (non-blocking)
   */
  public async publish(event: CareerOSEvent): Promise<void> {
    const eventListeners = this.listeners.get(event.name);
    if (!eventListeners || eventListeners.size === 0) {
      return;
    }

    // Execute all listeners in parallel, catch any errors locally to avoid breaking core flows
    const promises = Array.from(eventListeners).map(async (listener) => {
      try {
        await listener.onEvent(event);
      } catch (error) {
        console.error(
          `[EventBus] Error in listener of event '${event.name}' for user '${event.metadata.userId}':`,
          error
        );
        // In a production application, this would hook into Sentry or an external alerting service
      }
    });

    // Execute asynchronously (unawaited so that it's non-blocking for user actions)
    Promise.all(promises).catch((err) => {
      console.error('[EventBus] Uncaught exception in async listener pipeline:', err);
    });
  }
}
