import { Module } from "./Module";
import { Logger } from "./Logger";
import { LoggerContext } from "./types/LoggerContext";

export class ModuleLoader {

    private readonly modules: Module[] = [];

    public register(module: Module): void {

        const exists = this.modules.some(
            current => current.name === module.name
        );

        if (exists) {

            throw new Error(
                `O modulo "${module.name}" ja foi registrado.`
            );

        }

        this.modules.push(module);

        Logger.info(
            LoggerContext.MODULE,
            `Modulo "${module.name}" registrado.`
        );

    }

    public async initialize(): Promise<void> {

        for (const module of this.modules) {

            Logger.info(
                LoggerContext.MODULE,
                `Inicializando modulo "${module.name}".`
            );

            await module.initialize();

        }

    }

    public async shutdown(): Promise<void> {

        for (const module of [...this.modules].reverse()) {

            Logger.info(
                LoggerContext.MODULE,
                `Finalizando modulo "${module.name}".`
            );

            await module.shutdown();

        }

    }

    public getModules(): readonly Module[] {

        return this.modules;

    }

}