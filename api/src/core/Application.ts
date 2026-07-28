import app from "../app";
import { Config } from "../config/Config";
import { connectDatabase } from "../database/connection";
import { Logger } from '../core/Logger';
import { LoggerContext } from "./types/LoggerContext";

import { ModuleLoader } from "./ModuleLoader";

// Module 
import { AuthModule } from "../modules/auth/AuthModule";
import { CharacterModule } from "../modules/characters/CharacterModule";
import { InventoryModule } from "../modules/inventory/InventoryModule";
import { ItemModule } from "../modules/item/ItemModule";

/* 
Uma observação importante para nossa arquitetura

Percebi um ponto que devemos corrigir futuramente, antes de avançar para mais módulos.

Hoje a Application precisa conhecer todos os módulos:

new AuthModule();
new CharacterModule();
new InventoryModule();

Isso significa que, a cada novo módulo (Economy, Guild, Quest, House...), teremos que modificar a Application. 
Isso cria um acoplamento desnecessário.

A solução continua compatível com a arquitetura da Foundation: criar uma classe responsável apenas pelo 
registro dos módulos, por exemplo ModuleRegistry, deixando a Application sem conhecer nenhum módulo específico.

Mas eu não vou implementar isso agora, porque não mudaremos a arquitetura durante a sprint. 
Apenas estou registrando essa observação para fazermos uma pequena refatoração ao final da Sprint 
Core Gameplay, antes de começarmos os módulos mais avançados. 
Ela não muda nenhuma API pública e deixará a arquitetura mais limpa.
*/ 

export class Application {

    private readonly moduleLoader = new ModuleLoader();

    private async initializeModules(): Promise<void> {

        this.moduleLoader.register(
            new AuthModule()
        );

        this.moduleLoader.register(
            new CharacterModule()
        );

        this.moduleLoader.register(
            new InventoryModule()
        );

        this.moduleLoader.register(
            new ItemModule()
        );

        await this.moduleLoader.initialize();

    }

    public async start() {

        await this.initializeDatabase();

        await this.initializeModules();

        this.startHttp();

    }

    private async initializeDatabase() {

        await connectDatabase();

    }

    private startHttp() {

        const port = Number(Config.server.port) || 3000;

        app.listen(port, () => {

            Logger.info(
                LoggerContext.SYSTEM,
                `Terras Alem Core iniciado na porta ${port}`
            );
        });

    }
    
}