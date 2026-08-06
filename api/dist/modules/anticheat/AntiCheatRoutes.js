"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AntiCheatController_1 = require("./AntiCheatController");
const router = (0, express_1.Router)();
const controller = new AntiCheatController_1.AntiCheatController();
router.post("/events", controller.create.bind(controller));
exports.default = router;
