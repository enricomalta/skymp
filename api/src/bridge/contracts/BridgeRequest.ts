export interface BridgeRequest<T = unknown> {

    action: string;

    payload: T;

}