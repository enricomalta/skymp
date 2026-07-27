export interface Module {

    readonly name: string;

    initialize(): Promise<void>;

    shutdown(): Promise<void>;

}