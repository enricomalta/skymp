import {
    Actor,
    destroyText,
    Game,
    NetImmerse,
    ObjectReference,
    setTextPos,
    setTextSize,
    setTextString,
    createText,
    worldPointToScreenPoint,
    printConsole
} from "skyrimPlatform";

import {
    ClientListener,
    CombinedController,
    Sp
} from "./clientListener";

import {
    FormModel
} from "../../view/model";



export enum NameplateColor {

    WHITE = "white",

    PURPLE = "purple",

    RED = "red"

}

export interface NameplateState {

    remoteRefrId: number;

    localRefrId: number;

    name: string;

    color: NameplateColor;

    textId: number | undefined;

}

interface NameplateRender {

    textId: number;

    name: string;

    color: NameplateColor;

}

export class NameplateService extends ClientListener {

    constructor(
        private readonly sp: Sp,
        private readonly controller: CombinedController
    ) {

        super();

    }

    public update(
        refrId: number,
        refr: ObjectReference,
        model: FormModel
    ): void {

        const actor = Actor.from(refr);

        if (!actor) {

            this.destroy(refrId);

            return;

        }

        const name =
            refr.getDisplayName();

        // printConsole(
        //     `[NAMEPLATE] name: ${String(name)}`
        // );

        if (
            typeof name !== "string" ||
            name.length === 0
        ) {

            this.destroy(refrId);

            return;

        }

        if (
            !refr.is3DLoaded()
        ) {

            this.destroy(refrId);

            return;

        }

        const player =
            Game.getPlayer();

        if (!player) {

            return;

        }

        const maxDistance = 1000;

        if (
            player.getDistance(refr) >
            maxDistance
        ) {

            this.destroy(refrId);

            return;

        }

        if (
            !player.hasLOS(refr)
        ) {

            this.destroy(refrId);

            return;

        }

        const headPosition = [

            NetImmerse.getNodeWorldPositionX(
                refr,
                "NPC Head [Head]",
                false
            ),

            NetImmerse.getNodeWorldPositionY(
                refr,
                "NPC Head [Head]",
                false
            ),

            NetImmerse.getNodeWorldPositionZ(
                refr,
                "NPC Head [Head]",
                false
            ) + 32

        ] as [number, number, number];

        
        // printConsole(
        //     `[NAMEPLATE] HEAD ` +
        //     `X=${headPosition[0]} ` +
        //     `Y=${headPosition[1]} ` +
        //     `Z=${headPosition[2]}`
        // );

        const [
            screenPosition
        ] =
            worldPointToScreenPoint(
                headPosition
            );

        if (
            screenPosition[2] <= 0
        ) {

            this.destroy(refrId);

            return;

        }

        const resolution = {

            width:
                this.sp.Utility.getINIInt(
                    "iSize W:Display"
                ),

            height:
                this.sp.Utility.getINIInt(
                    "iSize H:Display"
                )

        };

        const x =
            Math.round(
                screenPosition[0] *
                resolution.width
            );

        const y =
            Math.round(
                (1 - screenPosition[1]) *
                resolution.height
            );

        const color =
            NameplateColor.WHITE;

        const existing =
            this.nameplates.get(
                refrId
            );

        // printConsole(
        //     `[NAMEPLATE] existing: ${existing ? "YES" : "NO"}`
        // );


        if (!existing) {
            // printConsole(
            //     `[NAMEPLATE] createText: ${name} x=${x} y=${y}`
            // );
            const textId =
                createText(
                    x,
                    y,
                    name,
                    this.getColor(
                        color
                    )
                );

            setTextSize(
                textId,
                0.5
            );

            this.nameplates.set(
                refrId,
                {

                    textId,

                    name,

                    color

                }
            );

            return;

        }

        if (
            existing.name !== name
        ) {

            setTextString(
                existing.textId,
                name
            );

            existing.name =
                name;

        }

        if (
            existing.color !== color
        ) {

            this.updateColor(
                existing.textId,
                color
            );

            existing.color =
                color;

        }

        setTextPos(
            existing.textId,
            x,
            y
        );

    }

    public setColor(
        remoteRefrId: number,
        color: NameplateColor
    ): void {

        const nameplate =
            this.nameplates.get(
                remoteRefrId
            );

        if (!nameplate) {

            return;

        }

        if (
            nameplate.color === color
        ) {

            return;

        }

        this.updateColor(
            nameplate.textId,
            color
        );

        nameplate.color =
            color;

    }

    public destroy(
        refrId: number
    ): void {

        const nameplate =
            this.nameplates.get(
                refrId
            );

        if (!nameplate) {

            return;

        }

        destroyText(
            nameplate.textId
        );

        this.nameplates.delete(
            refrId
        );

    }

    public destroyAll(): void {

        this.nameplates.forEach((nameplate) => {
            destroyText(nameplate.textId);
        });

        this.nameplates.clear();

    }

    public getNameplate(
        refrId: number
    ): NameplateState | undefined {

        const nameplate =
            this.nameplates.get(
                refrId
            );

        if (!nameplate) {

            return undefined;

        }

        return {

            remoteRefrId: refrId,

            localRefrId: refrId,

            name:
                nameplate.name,

            color:
                nameplate.color,

            textId:
                nameplate.textId

        };

    }

    private updateColor(
        textId: number,
        color: NameplateColor
    ): void {

        setTextString(
            textId,
            this.getColoredName(
                textId,
                color
            )
        );

    }

    private getColoredName(
        _textId: number,
        color: NameplateColor
    ): string {

        return color;

    }

    private getColor(
        color: NameplateColor
    ): [number, number, number, number] {

        switch (color) {

            case NameplateColor.PURPLE:

                return [
                    0.75,
                    0.2,
                    0.9,
                    0.9
                ];

            case NameplateColor.RED:

                return [
                    1,
                    0.1,
                    0.1,
                    0.9
                ];

            case NameplateColor.WHITE:

            default:

                return [
                    1,
                    1,
                    1,
                    0.9
                ];

        }

    }

    private readonly nameplates =
        new Map<number, NameplateRender>();

}