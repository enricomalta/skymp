import { BridgeRequest } from "./BridgeRequest";
import { BridgeResponse } from "./BridgeResponse";

export interface BridgeHandler {

    readonly action: string;

    handle(
        request: BridgeRequest
    ): Promise<BridgeResponse>;

}