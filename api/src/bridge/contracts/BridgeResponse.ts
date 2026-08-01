export interface BridgeResponse<T = unknown> {

    success: boolean;

    data?: T;

    error?: string;

}