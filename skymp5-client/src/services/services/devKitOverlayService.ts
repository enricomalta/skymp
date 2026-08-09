import {
  DxScanCode,
  Game,
  Input,
  printConsole,
  createText,
  destroyText,
  setTextString,
  setTextSize,
  setTextDepth,
  setTextsVisibility,
} from "skyrimPlatform";

import {
  ClientListener,
  CombinedController,
  Sp,
} from "./clientListener";

export class DevKitOverlayService extends ClientListener {
  private enabled = false;

  private textId: number | undefined;

  private lastKeyState = false;

  private lastUpdate = 0;

  constructor(
    private sp: Sp,
    private controller: CombinedController,
  ) {
    super();

    try {
      printConsole(
        "[TerrasAlem DevKit] Overlay service initialized",
      );

      this.controller.on("update", () => {
        this.update();
      });

      printConsole(
        "[TerrasAlem DevKit] Update listener registered",
      );
    } catch (e) {
      printConsole(
        `[TerrasAlem DevKit] ERROR during initialization: ${e}`,
      );
    }
  }

  private update() {
    this.handleHotkey();

    if (!this.enabled) {
      return;
    }

    const now = Date.now();

    if (now - this.lastUpdate < 50) {
      return;
    }

    this.lastUpdate = now;

    this.updateOverlay();
  }

  private handleHotkey() {
    const pressed = Input.isKeyPressed(
      DxScanCode.F2,
    );

    if (pressed && !this.lastKeyState) {
      printConsole(
        "[TerrasAlem DevKit] F2 pressed",
      );
      this.toggle();
    }

    this.lastKeyState = pressed;
  }

  private toggle() {
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.createOverlay();

      printConsole(
        "[TerrasAlem DevKit] ENABLED",
      );
    } else {
      this.destroyOverlay();

      printConsole(
        "[TerrasAlem DevKit] DISABLED",
      );
    }
  }

  private createOverlay() {
    if (this.textId !== undefined) {
      return;
    }

    this.textId = createText(
      30,
      30,
      "TERRAS ALEM DEVKIT",
      [1, 1, 1, 1],
      "Tavern",
    );

    setTextSize(
      this.textId,
      1.0,
    );

    setTextDepth(
      this.textId,
      100,
    );

    setTextsVisibility("on");
  }

  private destroyOverlay() {
    if (this.textId === undefined) {
      return;
    }

    destroyText(this.textId);

    this.textId = undefined;

    setTextsVisibility(
      "inheritBrowser",
    );
  }

  private updateOverlay() {
    if (this.textId === undefined) {
      return;
    }

    try {
      const player = Game.getPlayer();

      if (player === null) {
        return;
      }

      const x = Number(
        player.getPositionX(),
      );

      const y = Number(
        player.getPositionY(),
      );

      const z = Number(
        player.getPositionZ(),
      );

      const rx = Number(
        player.getAngleX(),
      );

      const ry = Number(
        player.getAngleY(),
      );

      const rz = Number(
        player.getAngleZ(),
      );

      const text =
        "TERRAS ALEM DEVKIT\n\n" +
        `X: ${x.toFixed(2)}\n` +
        `Y: ${y.toFixed(2)}\n` +
        `Z: ${z.toFixed(2)}\n\n` +
        `RX: ${rx.toFixed(2)}\n` +
        `RY: ${ry.toFixed(2)}\n` +
        `RZ: ${rz.toFixed(2)}`;

      setTextString(
        this.textId,
        text,
      );
    } catch (error) {
      printConsole(
        `[TerrasAlem DevKit] Failed to update overlay: ${error}`,
      );
    }
  }
}