import { Logger } from "./Logger";
import { LoggerContext } from "./types/LoggerContext";

export class Scheduler {

    private static readonly tasks = new Map<
        string,
        NodeJS.Timeout
    >();

    public static schedule(
        name: string,
        callback: () => void,
        interval: number
    ): void {

        if (this.tasks.has(name)) {

            throw new Error(
                `A tarefa "${name}" já está registrada.`
            );

        }

        const timer = setInterval(callback, interval);

        this.tasks.set(name, timer);

        Logger.info(
            LoggerContext.SYSTEM,
            `Tarefa "${name}" agendada (${interval} ms).`
        );

    }

    public static cancel(name: string): void {

        const timer = this.tasks.get(name);

        if (!timer) {

            return;

        }

        clearInterval(timer);

        this.tasks.delete(name);

        Logger.info(
            LoggerContext.SYSTEM,
            `Tarefa "${name}" cancelada.`
        );

    }

    public static cancelAll(): void {

        for (const timer of this.tasks.values()) {

            clearInterval(timer);

        }

        this.tasks.clear();

        Logger.info(
            LoggerContext.SYSTEM,
            "Todas as tarefas foram canceladas."
        );

    }

    public static exists(name: string): boolean {

        return this.tasks.has(name);

    }

}