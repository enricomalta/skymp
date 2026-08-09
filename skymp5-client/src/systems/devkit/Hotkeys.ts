import { printConsole } from "skyrimPlatform";

export class Hotkeys {
    private callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;
    }

    initialize() {
        printConsole(
            "[DevKit] Hotkeys initialized"
        );
    }
}