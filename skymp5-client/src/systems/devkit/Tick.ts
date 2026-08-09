import { on } from "skyrimPlatform";

export class Tick {
    private callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;

        on("update", () => {
            this.callback();
        });
    }
}