"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemController = void 0;
const express_1 = require("express");
class SystemController {
    router = (0, express_1.Router)();
    constructor() {
        this.router.get("/health", this.health.bind(this));
    }
    async health(request, response) {
        response.status(200).json({
            status: "ok"
        });
    }
}
exports.SystemController = SystemController;
