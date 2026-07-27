type EventHandler = (...args: unknown[]) => void | Promise<void>;

export class EventBus {

    private static events = new Map<
        string,
        Set<EventHandler>
    >();

    public static on(
        event: string,
        listener: EventHandler
    ): void {

        if (!this.events.has(event)) {

            this.events.set(event, new Set());

        }

        this.events
            .get(event)!
            .add(listener);

    }

    public static once(
        event: string,
        listener: EventHandler
    ): void {

        const wrapper: EventHandler = async (...args) => {

            this.off(event, wrapper);

            await listener(...args);

        };

        this.on(event, wrapper);

    }

    public static async emit(
        event: string,
        ...args: unknown[]
    ): Promise<void> {

        const listeners = this.events.get(event);

        if (!listeners) {

            return;

        }

        for (const listener of listeners) {

            await listener(...args);

        }

    }

    public static off(
        event: string,
        listener: EventHandler
    ): void {

        this.events
            .get(event)
            ?.delete(listener);

    }

    public static removeAll(): void {

        this.events.clear();

    }

}