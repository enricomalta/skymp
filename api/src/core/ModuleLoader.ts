import { Logger } from "./Logger";
import { LoggerContext } from "./types/LoggerContext";
import { Module } from "./Module";

export class ModuleLoader {

    private readonly modules: Module[] = [];

    public register(module: Module): void {

        const exists = this.modules.some(
            current => current.name === module.name
        );

        if (exists) {

            throw new Error(
                `O módulo "${module.name}" já foi registrado.`
            );

        }

        this.modules.push(module);

        Logger.info(
            LoggerContext.MODULE,
            `Módulo "${module.name}" registrado.`
        );

    }

    public async initialize(): Promise<void> {

        for (const module of this.modules) {

            Logger.info(
                LoggerContext.MODULE,
                `Inicializando módulo "${module.name}".`
            );

            await module.initialize();

        }

    }

    public async shutdown(): Promise<void> {

        for (const module of [...this.modules].reverse()) {

            Logger.info(
                LoggerContext.MODULE,
                `Finalizando módulo "${module.name}".`
            );

            await module.shutdown();

        }

    }

    public getModules(): readonly Module[] {

        return this.modules;

    }

}