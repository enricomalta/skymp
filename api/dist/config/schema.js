"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSchema = void 0;
const zod_1 = require("zod");
exports.EnvironmentSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().int().positive(),
    NODE_ENV: zod_1.z.enum([
        "development",
        "production",
        "test"
    ]),
    MONGO_URI: zod_1.z.string().min(1),
    JWT_SECRET: zod_1.z.string().min(32)
});
