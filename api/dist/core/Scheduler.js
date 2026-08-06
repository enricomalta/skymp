"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const Logger_1 = require("./Logger");
const LoggerContext_1 = require("./types/LoggerContext");
class Scheduler {
    static tasks = new Map();
    static schedule(name, callback, interval) {
        if (this.tasks.has(name)) {
            throw new Error(`A tarefa "${name}" já está registrada.`);
        }
        const timer = setInterval(callback, interval);
        this.tasks.set(name, timer);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, `Tarefa "${name}" agendada (${interval} ms).`);
    }
    static cancel(name) {
        const timer = this.tasks.get(name);
        if (!timer) {
            return;
        }
        clearInterval(timer);
        this.tasks.delete(name);
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, `Tarefa "${name}" cancelada.`);
    }
    static cancelAll() {
        for (const timer of this.tasks.values()) {
            clearInterval(timer);
        }
        this.tasks.clear();
        Logger_1.Logger.info(LoggerContext_1.LoggerContext.SYSTEM, "Todas as tarefas foram canceladas.");
    }
    static exists(name) {
        return this.tasks.has(name);
    }
}
exports.Scheduler = Scheduler;
