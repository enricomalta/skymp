"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Environment_1 = require("./Environment");
class Config {
    static server = {
        port: Environment_1.Environment.PORT,
        environment: Environment_1.Environment.NODE_ENV
    };
    static database = {
        uri: Environment_1.Environment.MONGO_URI
    };
    static jwt = {
        secret: Environment_1.Environment.JWT_SECRET
    };
}
exports.Config = Config;
