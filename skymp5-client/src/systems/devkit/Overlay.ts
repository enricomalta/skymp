import { printConsole } from "skyrimPlatform";

export class Overlay {
    private visible = false;

    show() {
        this.visible = true;

        printConsole(
            "[DevKit] Overlay enabled"
        );
    }

    hide() {
        this.visible = false;

        printConsole(
            "[DevKit] Overlay disabled"
        );
    }

    update() {
        if (!this.visible) {
            return;
        }
    }
}