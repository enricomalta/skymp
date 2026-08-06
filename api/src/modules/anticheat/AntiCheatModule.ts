import { Module } from "../../core/Module";


export class AntiCheatModule implements Module
{

    readonly name = "AntiCheatModule";


    async initialize(): Promise<void>
    {

        console.log(
            "[MODULE] AntiCheatModule inicializado"
        );

    }


    async shutdown(): Promise<void>
    {

        console.log(
            "[MODULE] AntiCheatModule finalizado"
        );

    }

}