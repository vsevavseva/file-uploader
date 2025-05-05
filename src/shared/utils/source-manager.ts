export type SourceManagerHandler<T> = (event: CustomEvent<T>) => void;

export const SourceManager = <T>() => {
    const listeners = new Map<string, Set<SourceManagerHandler<T>>>();

    const emit = (eventName: string, meta: T) => {
        listeners.get(eventName)?.forEach((callback) => {
            const newEvent = new CustomEvent(eventName, {detail: {...meta}});
            callback(newEvent);
        })
    };

    const addListener = (eventName: string, callback: SourceManagerHandler<T>) => {
        if (!callback) return;

        if (listeners.has(eventName)) {
            listeners.get(eventName)?.add(callback);
            return;
        }
        listeners.set(eventName, new Set([callback]));

        return () => listeners.get(eventName)?.delete(callback);
    };

    return {emit, addListener};
};