import { Overlay } from "./Overlay";
import { Hotkeys } from "./Hotkeys";
import { Tick } from "./Tick";
import { PlayerState } from "./PlayerState";

import { printConsole } from "skyrimPlatform";

export class DevKitManager {
    private enabled = false;

    private overlay!: Overlay;
    private hotkeys!: Hotkeys;
    private tick!: Tick;
    private playerState!: PlayerState;

    initialize(ctx: any) {
        printConsole("[DevKit] initialize() called");

        this.playerState = new PlayerState();

        this.overlay = new Overlay();

        this.hotkeys = new Hotkeys(() => {
            this.toggle();
        });

        this.tick = new Tick(() => {
            this.update();
        });

        this.hotkeys.initialize();

        printConsole("[DevKit] initialized");
    }

    connect(userId: number) {
        this.playerState.connect(userId);

        printConsole(
            `[DevKit] player connected: ${userId}`
        );
    }

    disconnect(userId: number) {
        this.playerState.disconnect(userId);

        printConsole(
            `[DevKit] player disconnected: ${userId}`
        );
    }

    toggle() {
        this.enabled = !this.enabled;

        printConsole(
            `[DevKit] ${
                this.enabled
                    ? "enabled"
                    : "disabled"
            }`
        );

        if (this.enabled) {
            this.overlay.show();
        } else {
            this.overlay.hide();
        }
    }

    private update() {
        if (!this.enabled) {
            return;
        }

        const players =
            this.playerState.getAll();

        for (const player of players) {
            this.playerState.update(
                player.userId
            );
        }

        this.overlay.update();
    }

    getPlayerState(userId: number) {
        return this.playerState.get(userId);
    }
}