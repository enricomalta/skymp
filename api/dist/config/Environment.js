"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const schema_1 = require("./schema");
const parsed = schema_1.EnvironmentSchema.safeParse(process.env);
if (!parsed.success) {
    throw new Error(parsed.error.issues
        .map(issue => issue.path.join(".") + ": " + issue.message)
        .join("\n"));
}
exports.Environment = parsed.data;
